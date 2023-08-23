"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class guru extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      guru.belongsTo(models.jabatan, {
        as: "jabatan",
        foreignKey: {
          name: "id_jabatan",
        },
      });

      guru.hasMany(models.mapel, {
        as: "mapel",
      });

      guru.hasOne(models.gaji, {
        as: "gaji",
      });

      guru.hasMany(models.absensi, {
        as: "absensi",
      });
    }
  }
  guru.init(
    {
      id_jabatan: DataTypes.INTEGER,
      nip: DataTypes.STRING,
      nama: DataTypes.STRING,
      jenis_kelamin: DataTypes.STRING,
      tempat_lahir: DataTypes.STRING,
      tgl_lahir: DataTypes.STRING,
      agama: DataTypes.STRING,
      no_telp: DataTypes.STRING,
      status: DataTypes.STRING,
      tanggungan: DataTypes.INTEGER,
      pend_akhir: DataTypes.STRING,
      thn_lulus: DataTypes.STRING,
      gaji_pokok: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "guru",
      tableName: "guru",
    }
  );
  return guru;
};
