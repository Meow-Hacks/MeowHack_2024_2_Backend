const express = require('express');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const branchRoutes = require('./routes/branchesRoutes');
const instituteRoutes = require('./routes/institutesRoutes');
const auditoriesRoutes = require('./routes/auditoriesRoutes');
const groupsRoutes = require('./routes/groupsRoutes');
const departmentsRoutes = require('./routes/departmentsRoutes');
const adminsRoutes = require('./routes/adminsRoutes');
const studentsRoutes = require('./routes/studentsRoutes');
const teachersRoutes = require('./routes/teachersRoutes');
const staffRoutes = require('./routes/staffRoutes');
const entranceHistoryRoutes = require('./routes/entranceHistoryRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const accessControlRoutes = require('./routes/accessControlRoutes');
const accessHistoryRoutes = require('./routes/accessHistoryRoutes');
const enterTokenRoutes = require('./routes/enterTokenRoutes');


const app = express();

app.use(express.json());

app.use('/api/admin/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/admin/branches', branchRoutes);
app.use('/api/admin/institutes', instituteRoutes);
app.use('/api/admin/auditories', auditoriesRoutes);
app.use('/api/admin/groups', groupsRoutes);
app.use('/api/admin/departments', departmentsRoutes);
app.use('/api/admin/admins', adminsRoutes);
app.use('/api/admin/students', studentsRoutes);
app.use('/api/admin/teachers', teachersRoutes);
app.use('/api/admin/staff', staffRoutes);

app.use('/api/admin/entrance-history', entranceHistoryRoutes);
app.use('/api/admin/attendance', attendanceRoutes);
app.use('/api/admin/access-control', accessControlRoutes);
app.use('/api/admin/access-history', accessHistoryRoutes);

app.use('/api/admin/enter-token', enterTokenRoutes);

const PORT = process.env.APP_PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
