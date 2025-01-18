const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Enquete = require("./enquete");

const Opt = sequelize.define("Opt", {
  descricao: { type: DataTypes.STRING, allowNull: false },
  votos: { type: DataTypes.INTEGER, defaultValue: 0 },
});

Opt.belongsTo(Enquete, { onDelete: "CASCADE" });
Enquete.hasMany(Opt);

module.exports = Opt;
