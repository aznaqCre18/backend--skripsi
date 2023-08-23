"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class honor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      honor.hasMany(models.mapel, {
        as: "mapel",
      });
    }
  }
  honor.init(
    {
      bidang_studi: DataTypes.INTEGER,
      honor: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "honor",
      tableName: "honor",
    }
  );
  return honor;
};
