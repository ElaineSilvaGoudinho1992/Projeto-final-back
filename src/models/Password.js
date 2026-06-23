const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Password = sequelize.define('Password', {
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  length: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Password;