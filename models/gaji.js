"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class gaji extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      gaji.belongsTo(models.guru, {
        as: "guru",
        foreignKey: {
          name: "id_guru",
        },
      });
    }
  }
  gaji.init(
    {
      id_guru: DataTypes.INTEGER,
      bulan_tahun: DataTypes.STRING,
      tahun: DataTypes.STRING,
      gaji_pokok: DataTypes.STRING,
      total_honor: DataTypes.STRING,
      potongan: DataTypes.STRING,
      alasan_potongan: DataTypes.TEXT,
      total_gaji_kotor: DataTypes.STRING,
      total_gaji_nett: DataTypes.STRING,
      total_gaji_nett_perbulan: DataTypes.STRING,
      ptkp_kategori: DataTypes.STRING,
      ptkp: DataTypes.STRING,
      pkp: DataTypes.STRING,
      pph21: DataTypes.STRING,
      pph21_perbulan: DataTypes.STRING,
      thp: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "gaji",
      tableName: "gaji",
    }
  );
  return gaji;
};
