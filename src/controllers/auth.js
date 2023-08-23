require("dotenv").config();
const { users_login } = require("../../models");
const joi = require("joi");
// const bcrypt = require("bcrypt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const defaultMessage = require("../../utils/defaultMessage");

// Register Admin
exports.RegisterUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const schema = joi.object({
      name: joi.string().max(100).required(),
      username: joi.string().max(20).required(),
      password: joi.string().required(),
      role: joi.string(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "Validation failed",
        message: error.details[0].message,
      });

    const checkUsernmae = await users_login.findOne({
      where: {
        username,
      },
    });

    if (checkUsernmae)
      return res.status(400).send({
        status: "Register Failed",
        message: "Username already registered",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const users = await users_login.create({
      ...req.body,
      password: hashedPassword,
    });

    const secretKey = process.env.SECRET_KEY || "ahfkg7khsHGkjhs82jksdfk";
    const token = jwt.sign(
      {
        id: users.id,
        username,
      },
      secretKey
    );

    await users_login.update(
      { token },
      {
        where: {
          id: users.id,
        },
      }
    );

    res.send({
      status: "Success",
      message: "Success Register",
      data: {
        id: users.id,
        username: users.username,
        name: users.name,
        token,
      },
    });
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal Registrasi User"));
  }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const schema = joi.object({
      username: joi.string().max(20).required(),
      password: joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "Validation failed",
        message: error.details[0].message,
      });

    const checkUsername = await users_login.findOne({
      where: {
        username,
      },
    });

    if (!checkUsername)
      return res.status(401).send({
        status: "Login failed",
        message: "Yout Credentials is not valid",
      });

    const validPassword = await bcrypt.compare(
      password,
      checkUsername.password
    );

    if (!validPassword)
      return res.status(401).send({
        status: "Login failed",
        message: "Yout Credentials is not valid",
      });

    const secretKey = process.env.SECRET_KEY || "ahfkg7khsHGkjhs82jksdfk";
    const token = jwt.sign(
      {
        id: checkUsername.id,
        name: checkUsername.name,
        username: checkUsername.username,
      },
      secretKey
    );

    res.send({
      status: "Success",
      message: "Login Success",
      data: {
        user: {
          id: checkUsername.id,
          username: checkUsername.username,
          name: checkUsername.name,
          token,
        },
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: "Server Error",
    });
  }
};

// Get data user
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await users_login.findAll({
      attributes: ['id', 'name', 'username'],
    });

    res
      .status(200)
      .send(defaultMessage(200, allUsers, "Berhasil tampil semua data user"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal tampil data user"));
  }
};

// get data user by username
exports.getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await users_login.findOne({
      where: {
        username: username
      },
      attributes: ['id', 'name', 'username'],
    });

    res
      .status(200)
      .send(defaultMessage(200, user, "Berhasil tampil data user"));
  } catch (error) {
    res.status(500).send(defaultMessage(500, null, "Gagal tampil data user"));
  }
};

exports.editUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    // check id
    const dataUsers = await users_login.findOne({
      where: {
        id,
      },
    });

    if (!dataUsers) {
      return res
        .status(500)
        .send(defaultMessage(404, null, "id tidak ditemukan"));
    }

    await users_login.update(
      { ...body, updatedAt: new Date() },
      {
        where: {
          id,
        },
      }
    );

    const dataUpdated = await users_login.findOne({
      where: {
        id,
      },
      attributes: ['id', 'username', 'name']
    });

    res
      .status(200)
      .send(defaultMessage(200, dataUpdated, "Berhasil Edit User"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal Edit User"));
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // check id
    const dataUser = await users_login.findOne({
      where: {
        id,
      },
    });

    if (!dataUser) {
      return res
        .status(500)
        .send(defaultMessage(404, null, "ID User tidak ditemukan"));
    }

    await users_login.destroy({ where: { id } });

    res.status(200).send(defaultMessage(200, id, "Berhasil Hapus User"));
  } catch (error) {
    console.log(error);
    res.status(500).send(defaultMessage(500, null, "Gagal Hapus User"));
  }
};