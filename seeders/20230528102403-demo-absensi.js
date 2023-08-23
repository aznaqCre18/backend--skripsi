"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert("absensi", [
    //   {
    //     id_mapel: 1,
    //     status: 10,
    //     tanggal: new Date(),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("absensi", null, {});
  },
};
