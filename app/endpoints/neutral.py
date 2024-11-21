from typing import Annotated
from fastapi import APIRouter, Header, HTTPException, Depends
from fastapi.security import APIKeyHeader

from app.db.entryexit_db import db_post_person_entrances, db_get_person_entrances
from app.db.lessons import get_lesson_from_lesson_id_db
from app.models.entry_exit import AddEnterExit, EnExHistory
from app.models.lesson import Lesson
from app.tokens.decode import decode_token
from app.tokens.descriptions import enter_token

neutral = APIRouter()


api_key_header = APIKeyHeader(name="Authorization")

@neutral.get("/lesson/{lesson_id}", response_model=Lesson)
async def get_lesson(lesson_id: int, authorization: Annotated[str | None, Depends(api_key_header)] = None):
    decode_token(authorization)
    if authorization is None:
        raise HTTPException(status_code=403, detail="Authorization header missing")
    return await get_lesson_from_lesson_id_db(lesson_id)


@neutral.post("/enter/exit", description=enter_token)
async def enter_exit(enter_exit_data: AddEnterExit, authorization: Annotated[str | None, Depends(api_key_header)] = None):
    token = decode_token(authorization)
    if token is None:
        raise HTTPException(status_code=403, detail="You no rights to enter or exit")
    funcs = {"admin": db_post_person_entrances("entryexithistory_admin", token, enter_exit_data),
             "student": db_post_person_entrances("entryexithistory_student", token, enter_exit_data),
             "teacher": db_post_person_entrances("entryexithistory_teacher", token, enter_exit_data),
             "staff": db_post_person_entrances("entryexithistory_staff", token, enter_exit_data)}
    await funcs[token['role']]


@neutral.get("/entrances", response_model=EnExHistory)
async def get_entrances(authorization: Annotated[str | None, Depends(api_key_header)] = None):
    token = decode_token(authorization)
    if token is None:
        raise HTTPException(status_code=403, detail='Not enough permissions')
    funcs = {"admin": db_get_person_entrances(token["id"],"admin_id","entryexithistory_admin"),
             "student": db_get_person_entrances(int(token['id']), "student_id", "entryexithistory_student"),
             "teacher": db_get_person_entrances(token['id'], "teacher_id", "entryexithistory_teacher"),
             "staff": db_get_person_entrances(token['id'], "staff_id", "entryexithistory_staff")}
    return await funcs[token['role']]
