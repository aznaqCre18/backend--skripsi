"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("mapel", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_honor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "honor",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      jam_mapel: {
        type: Sequelize.STRING,
      },
      jumlah_jam: {
        type: Sequelize.INTEGER,
      },
      kelas: {
        type: Sequelize.STRING,
      },
      jurusan: {
        type: Sequelize.STRING,
      },
      hari: {
        type: Sequelize.STRING,
      },
      thn_ajaran: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("mapel");
  },
};
