"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("gaji", [
      {
        id_guru: 3,
        bulan_tahun: "Maret 2024",
        tahun: "2024",
        gaji_pokok: "2000000",
        total_honor: "500000",
        potongan: "200000",
        alasan_potongan: "Terlambat",
        total_gaji_kotor: "6000000",
        total_gaji_nett: "4500000",
        total_gaji_nett_perbulan: "4500000",
        ptkp_kategori: "A",
        ptkp: "50000",
        pkp: "48000000",
        pph21: "123000",
        pph21_perbulan: "120000",
        thp: 7350000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("gaji", null, {});
  },
};
