const { guru, honor, mapel } = require("../../models");
const defaultMessage = require("../../utils/defaultMessage");

// Show All
exports.showAllMapel = async (req, res) => {
  try {
    const allMapel = await mapel.findAll({
      include: [
        {
          model: honor,
          as: "honor",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: guru,
          as: "guru",
          attributes: {
            exclude: ["createdAt", "updatedAt", "jabatanId"],
          },
        },
      ],
      attributes: {
        exclude: ["guruId", "honorId"],
      },
    });

    const allMapelRemapRes = allMapel.map(mapelRes => ({
      ...mapelRes.toJSON(),
      nama_mapel: mapelRes.honor.bidang_studi,
      nameCombine: `${mapelRes.honor.bidang_studi} - Kelas ${mapelRes.kelas} - ${mapelRes.jurusan} - ${mapelRes.hari}`
    }))

    res
      .status(200)
      .send(defaultMessage(200, allMapelRemapRes, "Berhasil Tampil Mapel"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal Tampil Mapel"));
  }
};

// Show Detail
exports.showDetailMapel = async (req, res) => {
  try {
    const { id } = req.params;

    const dataMapel = await mapel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: honor,
          as: "honor",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: guru,
          as: "guru",
          attributes: {
            exclude: ["createdAt", "updatedAt", "jabatanId"],
          },
        },
      ],
      attributes: {
        exclude: ["guruId", "honorId"],
      },
    });

    res
      .status(200)
      .send(defaultMessage(200, dataMapel, "Berhasil Tampil Mapel"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Tampil Mapel"));
  }
};

// Add New Data
exports.addNewMapel = async (req, res) => {
  try {
    const { body } = req;

    const newMapel = await mapel.create({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res
      .status(200)
      .send(defaultMessage(200, newMapel, "Berhasil Nambah Mapel"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Tambah Mapel"));
  }
};

// Edit Data
exports.editMapel = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    // check id
    const dataMapel = await mapel.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["guruId", "honorId"],
      },
    });

    if (!dataMapel) {
      return res
        .status(500)
        .send(defaultMessage(404, null, "ID Mapel tidak ditemukan"));
    }

    await mapel.update(
      { ...body, updatedAt: new Date() },
      {
        where: {
          id,
        },
      }
    );

    const dataUpdated = await mapel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: honor,
          as: "honor",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: guru,
          as: "guru",
          attributes: {
            exclude: ["createdAt", "updatedAt", "jabatanId"],
          },
        },
      ],
      attributes: {
        exclude: ["guruId", "honorId"],
      },
    });

    res
      .status(200)
      .send(defaultMessage(200, dataUpdated, "Berhasil Edit Mapel"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Edit Mapel"));
  }
};

// Delete Data
exports.deleteMapel = async (req, res) => {
  try {
    const { id } = req.params;

    // check id
    const dataMapel = await mapel.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["guruId", "honorId"],
      },
    });

    if (!dataMapel) {
      return res
        .status(500)
        .send(defaultMessage(404, null, "ID Mapel tidak ditemukan"));
    }

    await mapel.destroy({ where: { id } });

    res.status(200).send(defaultMessage(200, id, "Berhasil Hapus Mapel"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal Hapus Guru"));
  }
};
