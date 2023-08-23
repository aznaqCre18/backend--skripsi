const { guru, gaji, jabatan } = require("../../models");
const defaultMessage = require("../../utils/defaultMessage");

// Show All
exports.showAllGaji = async (req, res) => {
  try {
    const allGaji = await gaji.findAll({
      include: {
        model: guru,
        as: "guru",
        attributes: {
          exclude: ["createdAt", "updatedAt", "jabatanId"],
        },
      },
      attributes: {
        exclude: ["gajiId"],
      },
    });

    res.status(200).send(defaultMessage(200, allGaji, "Berhasil Tampil Gaji"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal Tampil Gaji"));
  }
};

// GET DATA GAJII BY ID GURU
exports.showAllGajiByIdGuru = async (req, res) => {
  const { idGuru } = req.params;
  try {
    const allGaji = await gaji.findAll({
      where: {
        id_guru: idGuru
      },
      include: {
        model: guru,
        as: "guru",
        include: {
          model: jabatan,
          as: 'jabatan',
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "jabatanId"],
        },
      },
      attributes: {
        exclude: ["gajiId"],
      },
    });

    res.status(200).send(defaultMessage(200, allGaji, "Berhasil Tampil Gaji"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal Tampil Gaji"));
  }
};

// GET DATA GAJII BY BULAN
exports.showAllGajiByBulan = async (req, res) => {
  const { bulan } = req.query;
  try {
    const allGaji = await gaji.findAll({
      where: {
        bulan_tahun: bulan
      },
      include: {
        model: guru,
        as: "guru",
        include: {
          model: jabatan,
          as: 'jabatan',
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "jabatanId"],
        },
      },
      attributes: {
        exclude: ["gajiId"],
      },
    });

    res.status(200).send(defaultMessage(200, allGaji, "Berhasil Tampil Gaji"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal Tampil Gaji"));
  }
};


// Show Detail
exports.showDetailGaji = async (req, res) => {
  try {
    const { id } = req.params;

    // check id
    const checkDataGaji = await gaji.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["gajiId"],
      },
    });

    if (!checkDataGaji) {
      return res
        .status(500)
        .send(defaultMessage(404, null, "ID Gaji tidak ditemukan"));
    }

    const dataGaji = await gaji.findOne({
      where: {
        id,
      },
      include: {
        model: guru,
        as: "guru",
        attributes: {
          exclude: ["createdAt", "updatedAt", "jabatanId"],
        },
      },
      attributes: {
        exclude: ["gajiId"],
      },
    });

    res.status(200).send(defaultMessage(200, dataGaji, "Berhasil Tampil Gaji"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Tampil Gaji"));
  }
};

// Add New Data
exports.addNewGaji = async (req, res) => {
  try {
    const { body } = req;

    const newGaji = await gaji.create({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(200).send(defaultMessage(200, newGaji, "Berhasil Nambah Gaji"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Tambah Gaji"));
  }
};

// Edit Data
exports.editGaji = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    // check id
    const dataGaji = await gaji.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["gajiId"],
      },
    });

    if (!dataGaji) {
      return res
        .status(500)
        .send(defaultMessage(404, null, "ID Gaji tidak ditemukan"));
    }

    await gaji.update(
      { ...body, updatedAt: new Date() },
      {
        where: {
          id,
        },
      }
    );

    const dataUpdated = await gaji.findOne({
      where: {
        id,
      },
      include: {
        model: guru,
        as: "guru",
        attributes: {
          exclude: ["createdAt", "updatedAt", "jabatanId"],
        },
      },
      attributes: {
        exclude: ["gajiId"],
      },
    });

    res
      .status(200)
      .send(defaultMessage(200, dataUpdated, "Berhasil Edit Gaji"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Edit Gaji"));
  }
};

// Delete Data
exports.deleteGaji = async (req, res) => {
  try {
    const { id } = req.params;

    // check id
    const dataGaji = await gaji.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["gajiId"],
      },
    });

    if (!dataGaji) {
      return res
        .status(500)
        .send(defaultMessage(404, null, "ID Gaji tidak ditemukan"));
    }

    await gaji.destroy({ where: { id } });

    res.status(200).send(defaultMessage(200, id, "Berhasil Hapus Gaji"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal Hapus Gaji"));
  }
};
