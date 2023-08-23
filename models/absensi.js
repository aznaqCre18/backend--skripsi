"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class absensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      absensi.belongsTo(models.mapel, {
        as: "mapel",
        foreignKey: {
          name: "id_mapel",
        },
      });

      absensi.belongsTo(models.guru, {
        as: "guru",
        foreignKey: {
          name: "id_guru",
        }
      });
    }
  }
  absensi.init(
    {
      id_mapel: DataTypes.INTEGER,
      id_guru: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      tanggal: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "absensi",
      tableName: "absensi",
    }
  );
  return absensi;
};
