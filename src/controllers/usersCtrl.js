const { request, response } = require("express");

const bcrypt = require("bcryptjs");

const User = require("../models/user");

const getUsers = (req = request, res = response) => {
  const { apiKey, limit } = req.query;

  res.json({ message: "Get Users!", apiKey, limit });
};
const getUser = (req = request, res = response) => {
  const { id } = req.params;
  res.json({ message: `Get User! id:${id}` });
};
const postUser = async (req = request, res = response) => {
  const { name, email, password, image, role } = req.body;
  const user = new User({ name, email, password, image, role });

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);

  await user.save();
  res.json({ message: "El usuario se ha creado correctamente", user });
};
const putUser = (req = request, res = response) => {
  const { id } = req.params;

  res.json({ message: `Put User! id:${id}` });
};
const deleteUser = (req = request, res = response) => {
  const { id } = req.params;

  res.json({ message: `Delete User! id:${id}` });
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
};
