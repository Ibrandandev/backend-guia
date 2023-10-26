const User = require("../models/user");
const Role = require("../models/role");

const isValidEmail = async (email) => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`El correo ${email} ya se encuentra registrado`);
  }
};

const isValidRole = async (role) => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`El rol ${role} no es valido`);
  }
};

const isValidId = async (id) => {
  const userExist = await User.findById(id);

  if (!userExist) {
    throw new Error(`El id ${ìd} no se encontró en la base de datos`);
  }
};

module.exports = {
  isValidEmail,
  isValidRole,
  isValidId,
};
