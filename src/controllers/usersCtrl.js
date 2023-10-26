const { request, response } = require("express");

const bcrypt = require("bcryptjs");

const User = require("../models/user");

const getUsers = async (req = request, res = response) => {
  const { from = 0, limit = 0 } = req.query;

  const query = { state: true };

  // const users = await User.find().skip(from).limit(limit);
  // const total = await User.countDocuments();

  const [users, total] = await Promise.all([
    User.find(query).skip(from).limit(limit),
    User.countDocuments(query),
  ]);

  res.json({
    users,
    total,
  });
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
const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, ...userToUpdate } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    userToUpdate.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, userToUpdate, { new: true });

  res.json({ message: `El usuario ha sido actualizado`, user });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  const userToDelete = await User.findByIdAndDelete(id);

  res.json({ message: `El usuario ha sido eliminado`, userToDelete });
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
};
