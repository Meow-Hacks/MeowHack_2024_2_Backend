from datetime import datetime
from typing import List
from pydantic import BaseModel


class LessonTeacher(BaseModel):
    id: int
    subject: str
    group: str
    auditory_name: str
    auditory_capacity: int
    branch_name: str
    branch_address: str
    start_time: datetime
    end_time: datetime
    task: str
    deadline: datetime


class LessonsTeacher(BaseModel):
    lessons: List[LessonTeacher]
