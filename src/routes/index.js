const express = require("express");
const router = express.Router();

const Auth = require("../controllers/auth");
const Jabatan = require("../controllers/jabatanController");
const Honor = require("../controllers/honorController");
const Guru = require("../controllers/guruController");
const Mapel = require("../controllers/mapelController");
const Absensi = require("../controllers/absensiController");
const Gaji = require("../controllers/gajiController");
const { authenticated } = require("../middlewares/auth");

// Auth
router.post("/register", Auth.RegisterUser);
router.post("/login", Auth.loginAdmin);
router.get("/users", authenticated, Auth.getAllUsers);
router.get("/users/:username", authenticated, Auth.getUserByUsername);
router.patch("/users/:id", authenticated, Auth.editUsers);
router.delete("/users/:id", authenticated, Auth.deleteUser);

// Router Jabatan
router.get("/jabatan", authenticated, Jabatan.showAllJabatan);
router.get("/jabatan/:id", Jabatan.showDetailJabatan);
router.post("/jabatan", Jabatan.addNewJabatan);
router.patch("/jabatan/:id", Jabatan.editJabatan);
router.delete("/jabatan/:id", Jabatan.deleteJabatan);

// Router Honor
router.get("/honor", authenticated, Honor.showAllHonor);
router.get("/honor/:id", Honor.showDetailHonor);
router.post("/honor", Honor.addNewHonor);
router.put("/honor/:id", Honor.editHonor);
router.delete("/honor/:id", Honor.deleteHonor);

// Router Guru
router.get("/guru", authenticated, Guru.showAllGuru);
router.get("/guru/:id", Guru.showDetailGuru);
router.post("/guru", Guru.addNewGuru);
router.put("/guru/:id", Guru.editGuru);
router.delete("/guru/:id", Guru.deleteGuru);

// Router Mapel
router.get("/mapel", authenticated, Mapel.showAllMapel);
router.get("/mapel/:id", Mapel.showDetailMapel);
router.post("/mapel", Mapel.addNewMapel);
router.put("/mapel/:id", Mapel.editMapel);
router.delete("/mapel/:id", Mapel.deleteMapel);

// Router Absensi
router.get("/absensi", authenticated, Absensi.showAllAbsensi);
router.get("/absensi/:id", authenticated, Absensi.showDetailAbsensi);
router.post("/absensi", authenticated, Absensi.addNewAbsensi);
router.put("/absensi/:id", authenticated, Absensi.editAbsensi);
router.delete("/absensi/:id", authenticated, Absensi.deleteAbsensi);
router.get("/absensi-filter/", authenticated, Absensi.searchAbsensiByIdGuruAndDateRange);
router.get("/absensi-report", authenticated, Absensi.searchAbsensiByDateRange);

// Router Gaji
router.get("/gaji", authenticated, Gaji.showAllGaji);
router.get("/gaji/:id", authenticated, Gaji.showDetailGaji);
router.get("/gaji-bulan", authenticated, Gaji.showAllGajiByBulan);
router.get("/gaji-guru/:idGuru", authenticated, Gaji.showAllGajiByIdGuru);
router.post("/gaji", authenticated, Gaji.addNewGaji);
router.put("/gaji/:id", authenticated, Gaji.editGaji);
router.delete("/gaji/:id", authenticated, Gaji.deleteGaji);

module.exports = router;
