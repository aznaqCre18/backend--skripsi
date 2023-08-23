"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert("guru", [
    //   {
    //     id_jabatan: 1,
    //     nip: 202043502338,
    //     nama: "ihsan",
    //     jenis_kelamin: "L",
    //     tempat_lahir: "Jakarta",
    //     tgl_lahir: "09 Maret 2000",
    //     agama: "Islam",
    //     no_telp: "08978764345",
    //     status: "on",
    //     tanggungan: 2,
    //     pend_akhir: "Sarjana",
    //     thn_lulus: "2024",
    //     gaji_pokok: 8500000,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("guru", null, {});
  },
};
