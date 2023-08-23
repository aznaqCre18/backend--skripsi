"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mapel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      mapel.belongsTo(models.honor, {
        as: "honor",
        foreignKey: {
          name: "id_honor",
        },
      });

      mapel.belongsTo(models.guru, {
        as: "guru",
        foreignKey: {
          name: "id_guru",
        },
      });

      mapel.hasMany(models.absensi, {
        as: "absensi",
      });
    }
  }
  mapel.init(
    {
      id_honor: DataTypes.INTEGER,
      id_guru: DataTypes.INTEGER,
      jam_mapel: DataTypes.STRING,
      jumlah_jam: DataTypes.INTEGER,
      kelas: DataTypes.STRING,
      jurusan: DataTypes.STRING,
      hari: DataTypes.STRING,
      thn_ajaran: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "mapel",
      tableName: "mapel",
    }
  );
  return mapel;
};
