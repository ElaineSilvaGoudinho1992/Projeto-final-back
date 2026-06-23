const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const passwordRoutes = require('./routes/passwordRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/passwords', passwordRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Banco de dados sincronizado.');
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});