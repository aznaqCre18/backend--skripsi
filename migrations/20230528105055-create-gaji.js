"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("gaji", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_guru: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "guru",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      bulan_tahun: {
        type: Sequelize.STRING,
      },
      tahun: {
        type: Sequelize.STRING,
      },
      gaji_pokok: {
        type: Sequelize.STRING,
      },
      total_honor: {
        type: Sequelize.STRING,
      },
      potongan: {
        type: Sequelize.STRING,
      },
      alasan_potongan: {
        type: Sequelize.TEXT,
      },
      total_gaji_kotor: {
        type: Sequelize.STRING,
      },
      total_gaji_nett: {
        type: Sequelize.STRING,
      },
      total_gaji_nett_perbulan: {
        type: Sequelize.STRING,
      },
      ptkp_kategori: {
        type: Sequelize.STRING,
      },
      ptkp: {
        type: Sequelize.STRING,
      },
      pkp: {
        type: Sequelize.STRING,
      },
      pph21: {
        type: Sequelize.STRING,
      },
      pph21_perbulan: {
        type: Sequelize.STRING,
      },
      thp: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("gaji");
  },
};
