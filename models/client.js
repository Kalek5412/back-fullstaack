const { DataTypes } = require("sequelize");
const db = require("../database/config");
const DOC_TYPE = {
    DNI: 1,
    RUC: 2,
    CARNET_EXTRANJERIA: 3
};

const Client = db.define(
  "Client",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    doc_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [Object.values(DOC_TYPE)] 
        }
      },
    doc_number: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
    },
    phone: {
      type: DataTypes.STRING(20),
    },
  },
  {
    tableName: "clients", // Define el nombre de la tabla en MySQL
    timestamps: false, // Si no usas timestamps en tu base de datos
  }
);

module.exports = Client;
