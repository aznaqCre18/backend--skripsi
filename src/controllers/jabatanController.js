const { jabatan } = require("../../models");
const defaultMessage = require("../../utils/defaultMessage");

// Show All
exports.showAllJabatan = async (req, res) => {
  try {
    const allJabatan = await jabatan.findAll({
      attributes: ['id', 'nama_jabatan', 'tunjangan'],
    });

    res
      .status(200)
      .send(defaultMessage(200, allJabatan, "Berhasil Tampil Jabatan"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Tampil Jabatan"));
  }
};

// Show Detail
exports.showDetailJabatan = async (req, res) => {
  try {
    const { id } = req.params;

    const dataJabatan = await jabatan.findOne({
      where: {
        id,
      },
    });

    res
      .status(200)
      .send(defaultMessage(200, dataJabatan, "Berhasil Tampil Jabatan"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Tampil Jabatan"));
  }
};

// Add New Data
exports.addNewJabatan = async (req, res) => {
  try {
    const { body } = req;

    const newJabatan = await jabatan.create({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res
      .status(200)
      .send(defaultMessage(200, newJabatan, "Berhasil Nambah Jabatan"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Tambah Jabatan"));
  }
};

// Edit Data
exports.editJabatan = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    // check id
    const dataJabatan = await jabatan.findOne({
      where: {
        id,
      },
    });

    if (!dataJabatan) {
      return res
        .status(500)
        .send(defaultMessage(404, null, "ID Jabatan tidak ditemukan"));
    }

    await jabatan.update(
      { ...body, updatedAt: new Date() },
      {
        where: {
          id,
        },
      }
    );

    const dataUpdated = await jabatan.findOne({
      where: {
        id,
      },
    });

    res
      .status(200)
      .send(defaultMessage(200, dataUpdated, "Berhasil Edit Jabatan"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Edit Jabatan"));
  }
};

// Delete Data
exports.deleteJabatan = async (req, res) => {
  try {
    const { id } = req.params;

    // check id
    const dataJabatan = await jabatan.findOne({
      where: {
        id,
      },
    });

    if (!dataJabatan) {
      return res
        .status(500)
        .send(defaultMessage(404, null, "ID Jabatan tidak ditemukan"));
    }

    await jabatan.destroy({ where: { id } });

    res.status(200).send(defaultMessage(200, id, "Berhasil Hapus Jabatan"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Hapus Jabatan"));
  }
};
