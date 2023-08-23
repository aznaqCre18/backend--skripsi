const { Op } = require("sequelize");
const { mapel, absensi, honor, guru, jabatan } = require("../../models");
const defaultMessage = require("../../utils/defaultMessage");

// Show All
exports.showAllAbsensi = async (req, res) => {
  const { search } = req.query;
  let allAbsensi = [];

  try {
    if (search) {
      allAbsensi = await absensi.findAll({
        include: {
          model: mapel,
          required: true,
          as: "mapel",
          include: [
            {
              model: honor,
              as: 'honor'
            },
            {
              model: guru,
              as: 'guru',
              where: {
                nama: {
                  [Op.like]: `%${search}%`
                }
              },
              attributes: {
                exclude: ["jabatanId"],
              }
            }
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "honorId", "guruId"],
          },
        },
        attributes: {
          exclude: ["mapelId"],
        },
      });
    } else {
      allAbsensi = await absensi.findAll({
        include: {
          model: mapel,
          as: "mapel",
          include: [
            {
              model: honor,
              as: 'honor'
            },
            {
              model: guru,
              as: 'guru',
              attributes: {
                exclude: ["jabatanId"],
              }
            }
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "honorId", "guruId"],
          },
        },
        attributes: {
          exclude: ["mapelId", "guruId"],
        },
      });
    }

    const allAbsensiRemap = allAbsensi.map(data => ({
      ...data.toJSON(),
      nama_guru: data.mapel.guru.nama,
      mata_pelajaran: data.mapel.honor.bidang_studi,
      thn_ajaran: data.mapel.thn_ajaran,
    }));

    res
      .status(200)
      .send(defaultMessage(200, allAbsensiRemap, "Berhasil Tampil Absensi"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal Tampil Absensi"));
  }
};

// GET DATA ABSENSI BY DATE RANGE
exports.searchAbsensiByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const allAbsensi = await absensi.findAll({
      where: {
        tanggal: {
          [Op.between]: [startDate, endDate]
        },
      },
      include: [
        {
          model: mapel,
          as: 'mapel',
          include: {
            model: honor,
            as: 'honor',
          },
          attributes: {
            exclude: ["guruId", "honorId", "jabatanId"],
          }
        },
        {
          model: guru,
          as: 'guru',
          include: {
            model: jabatan,
            as: 'jabatan',
          },
          attributes: {
            exclude: ["guruId", "honorId", "jabatanId"],
          }
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "honorId", "guruId", "mapelId"],
      },
    });

    console.log(allAbsensi);

    res
      .status(200)
      .send(defaultMessage(200, allAbsensi, "Berhasil Tampil Absensi"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal Tampil Absensi"));
  }
};

// GET DATA ABSENSI BERDASARKAN ID DAN DATE RANGE
exports.searchAbsensiByIdGuruAndDateRange = async (req, res) => {
  const { idGuru, startDate, endDate, status } = req.query;

  console.log(idGuru, startDate, endDate, status);
  try {
    const allAbsensi = await absensi.findAll({
      where: {
        tanggal: {
          [Op.between]: [startDate, endDate]
        },
        status: 1,
        id_guru: idGuru,
      },
      include: [
        {
          model: mapel,
          as: 'mapel',
          include: {
            model: honor,
            as: 'honor',
          },
          attributes: {
            exclude: ["guruId", "honorId", "jabatanId"],
          }
        },
        {
          model: guru,
          as: 'guru',
          include: {
            model: jabatan,
            as: 'jabatan',
          },
          attributes: {
            exclude: ["guruId", "honorId", "jabatanId"],
          }
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "honorId", "guruId", "mapelId"],
      },
    });

    console.log(allAbsensi);

    // const allAbsensiRemap = allAbsensi.map(data => ({
    //   ...data.toJSON(),
    //   nama_guru: data.mapel.guru.nama,
    //   mata_pelajaran: data.mapel.honor.bidang_studi,
    //   thn_ajaran: data.mapel.thn_ajaran,
    // }));

    res
      .status(200)
      .send(defaultMessage(200, allAbsensi, "Berhasil Tampil Absensi"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal Tampil Absensi"));
  }
};

// Show Detail
exports.showDetailAbsensi = async (req, res) => {
  try {
    const { id } = req.params;

    // check id
    const checkDataAbsensi = await absensi.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["mapelId"],
      },
    });

    if (!checkDataAbsensi) {
      return res
        .status(500)
        .send(defaultMessage(404, null, "ID Absensi tidak ditemukan"));
    }

    const dataAbsensi = await absensi.findOne({
      where: {
        id,
      },
      include: {
        model: mapel,
        as: "mapel",
        attributes: {
          exclude: ["createdAt", "updatedAt", "honorId", "guruId"],
        },
      },
      attributes: {
        exclude: ["mapelId"],
      },
    });

    res
      .status(200)
      .send(defaultMessage(200, dataAbsensi, "Berhasil Tampil Absensi"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Tampil Absensi"));
  }
};

// Add New Data
exports.addNewAbsensi = async (req, res) => {
  try {
    const { body } = req;

    const newAbsensi = await absensi.create({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res
      .status(200)
      .send(defaultMessage(200, newAbsensi, "Berhasil Nambah Absensi"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Tambah Absensi"));
  }
};

// Edit Data
exports.editAbsensi = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    // check id
    const dataAbsensi = await absensi.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["mapelId", "guruId"],
      },
    });

    if (!dataAbsensi) {
      return res
        .status(500)
        .send(defaultMessage(404, null, "ID Absensi tidak ditemukan"));
    }

    await absensi.update(
      { ...body, updatedAt: new Date() },
      {
        where: {
          id,
        },
      }
    );

    const dataUpdated = await absensi.findOne({
      where: {
        id,
      },
      include: {
        model: mapel,
        as: "mapel",
        attributes: {
          exclude: ["createdAt", "updatedAt", "honorId", "guruId"],
        },
      },
      attributes: {
        exclude: ["mapelId", "guruId"],
      },
    });

    res
      .status(200)
      .send(defaultMessage(200, dataUpdated, "Berhasil Edit Absensi"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal Edit Absensi"));
  }
};

// Delete Data
exports.deleteAbsensi = async (req, res) => {
  try {
    const { id } = req.params;

    // check id
    const dataAbsensi = await absensi.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["mapelId", "guruId"],
      },
    });

    if (!dataAbsensi) {
      return res
        .status(500)
        .send(defaultMessage(404, null, "ID Absensi tidak ditemukan"));
    }

    await absensi.destroy({ where: { id } });

    res.status(200).send(defaultMessage(200, id, "Berhasil Hapus Absensi"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal Hapus Absensi"));
  }
};
