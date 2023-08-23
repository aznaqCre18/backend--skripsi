"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert("mapel", [
    //   {
    //     id_honor: 1,
    //     id_guru: 3,
    //     jam_mapel: "08:00",
    //     jumlah_jam: 7,
    //     kelas: "1A",
    //     jurusan: "IPA",
    //     hari: "Selasa",
    //     thn_ajaran: "2024",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("mapel", null, {});
  },
};
