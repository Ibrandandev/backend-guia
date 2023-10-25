const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  name: { type: String, required: [true, "El nombre es requerido"] },
  email: {
    type: String,
    required: [true, "El correo es requerido"],
    unique: true,
  },
  password: { type: String, required: [true, "La contraseña es requerida"] },
  image: { type: String },
  role: {
    type: String,
    required: true,
    // enum: ["USER_ROLE", "ADMIN_ROLE"],
    // default: "USER_ROLE",
  },
  state: { type: Boolean, default: true },
});

module.exports = model("User", UsuarioSchema);
