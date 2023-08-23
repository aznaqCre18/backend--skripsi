"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("guru", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_jabatan: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "jabatan",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      nip: {
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING,
      },
      jenis_kelamin: {
        type: Sequelize.STRING,
      },
      tempat_lahir: {
        type: Sequelize.STRING,
      },
      tgl_lahir: {
        type: Sequelize.STRING,
      },
      agama: {
        type: Sequelize.STRING,
      },
      no_telp: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      tanggungan: {
        type: Sequelize.INTEGER,
      },
      pend_akhir: {
        type: Sequelize.STRING,
      },
      thn_lulus: {
        type: Sequelize.STRING,
      },
      gaji_pokok: {
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
    await queryInterface.dropTable("guru");
  },
};
