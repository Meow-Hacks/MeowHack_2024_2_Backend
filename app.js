const express = require('express');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const branchRoutes = require('./routes/branchesRoutes');
const instituteRoutes = require('./routes/institutesRoutes');
const auditoriesRoutes = require('./routes/auditoriesRoutes');
const groupsRoutes = require('./routes/groupsRoutes');
const departmentsRoutes = require('./routes/departmentsRoutes');


const app = express();

app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/branches', branchRoutes);
app.use('/api/institutes', instituteRoutes);
app.use('/api/auditories', auditoriesRoutes);
app.use('/api/groups', groupsRoutes);
app.use('/api/departments', departmentsRoutes);

const PORT = process.env.APP_PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));