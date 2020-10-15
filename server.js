const express = require('express');
const routes = require('./routes');
const userRoutes = require('./routes/user');
const { logger } = require('./middlewares');

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(logger);
app.use('/auth/', userRoutes);
app.use('/api', routes);

app.listen(PORT, () => `Server is running on ${PORT}....`);