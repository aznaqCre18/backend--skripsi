const { honor } = require("../../models");
const defaultMessage = require("../../utils/defaultMessage");

// Show All
exports.showAllHonor = async (req, res) => {
  try {
    const allHonor = await honor.findAll();

    res
      .status(200)
      .send(defaultMessage(200, allHonor, "Berhasil Tampil Honor"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Tampil Honor"));
  }
};

// Show Detail
exports.showDetailHonor = async (req, res) => {
  try {
    const { id } = req.params;

    const dataHonor = await honor.findOne({
      where: {
        id,
      },
    });

    res
      .status(200)
      .send(defaultMessage(200, dataHonor, "Berhasil Tampil Honor"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Tampil Honor"));
  }
};

// Add New Data
exports.addNewHonor = async (req, res) => {
  try {
    const { body } = req;

    const newHonor = await honor.create({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res
      .status(200)
      .send(defaultMessage(200, newHonor, "Berhasil Nambah Honor"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Tambah Honor"));
  }
};

// Edit Data
exports.editHonor = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    // check id
    const dataHonor = await honor.findOne({
      where: {
        id,
      },
    });

    if (!dataHonor) {
      return res
        .status(500)
        .send(defaultMessage(404, null, "ID Honor tidak ditemukan"));
    }

    await honor.update(
      { ...body, updatedAt: new Date() },
      {
        where: {
          id,
        },
      }
    );

    const dataUpdated = await honor.findOne({
      where: {
        id,
      },
    });

    res
      .status(200)
      .send(defaultMessage(200, dataUpdated, "Berhasil Edit Honor"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Edit Honor"));
  }
};

// Delete Data
exports.deleteHonor = async (req, res) => {
  try {
    const { id } = req.params;

    // check id
    const dataHonor = await honor.findOne({
      where: {
        id,
      },
    });

    if (!dataHonor) {
      return res
        .status(500)
        .send(defaultMessage(404, null, "ID Honor tidak ditemukan"));
    }

    await honor.destroy({ where: { id } });

    res.status(200).send(defaultMessage(200, id, "Berhasil Hapus Honor"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal Hapus Honor"));
  }
};
