const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Enquete = sequelize.define("Enquete", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dataFim: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Enquete;
