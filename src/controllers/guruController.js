const { guru, jabatan } = require("../../models");
const defaultMessage = require("../../utils/defaultMessage");

// Show All
exports.showAllGuru = async (req, res) => {
  try {
    const allGuru = await guru.findAll({
      include: {
        model: jabatan,
        as: "jabatan",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["jabatanId"],
      },
    });

    const allGuruRemap = allGuru.map(data => ({
      ...data.toJSON(),
      nama_jabatan: data.jabatan.nama_jabatan
    }));

    res.status(200).send(defaultMessage(200, allGuruRemap, "Berhasil Tampil Guru"));
  } catch (error) {
    console.log(error);
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal Tampil Guru"));
  }
};

// Show Detail
exports.showDetailGuru = async (req, res) => {
  try {
    const { id } = req.params;

    const dataGuru = await guru.findOne({
      where: {
        id,
      },
      include: {
        model: jabatan,
        as: "jabatan",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["jabatanId"],
      },
    });

    res.status(200).send(defaultMessage(200, dataGuru, "Berhasil Tampil Guru"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Tampil Guru"));
  }
};

// Add New Data
exports.addNewGuru = async (req, res) => {
  try {
    const { body } = req;

    const newGuru = await guru.create({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(200).send(defaultMessage(200, newGuru, "Berhasil Nambah Guru"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Tambah Guru"));
  }
};

// Edit Data
exports.editGuru = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    // check id
    const dataGuru = await guru.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["jabatanId"],
      },
    });

    if (!dataGuru) {
      return res
        .status(500)
        .send(defaultMessage(404, null, "ID Guru tidak ditemukan"));
    }

    await guru.update(
      { ...body, updatedAt: new Date() },
      {
        where: {
          id,
        },
      }
    );

    const dataUpdated = await guru.findOne({
      where: {
        id,
      },
      include: {
        model: jabatan,
        as: "jabatan",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["jabatanId"],
      },
    });

    res
      .status(200)
      .send(defaultMessage(200, dataUpdated, "Berhasil Edit Guru"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Edit Guru"));
  }
};

// Delete Data
exports.deleteGuru = async (req, res) => {
  try {
    const { id } = req.params;

    // check id
    const dataGuru = await guru.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["jabatanId"],
      },
    });

    if (!dataGuru) {
      return res
        .status(500)
        .send(defaultMessage(404, null, "ID Guru tidak ditemukan"));
    }

    await guru.destroy({ where: { id } });

    res.status(200).send(defaultMessage(200, id, "Berhasil Hapus Guru"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal Hapus Guru"));
  }
};
