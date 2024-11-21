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


const app = express();

app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/branches', branchRoutes);
app.use('/api/institutes', instituteRoutes);
app.use('/api/auditories', auditoriesRoutes);
app.use('/api/groups', groupsRoutes);
app.use('/api/departments', departmentsRoutes);
app.use('/api/admins', adminsRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/staff', staffRoutes);

app.use('/api/entrance-history', entranceHistoryRoutes);

const PORT = process.env.APP_PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));