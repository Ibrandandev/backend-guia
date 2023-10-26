const { Schema, model } = require("mongoose");

const UserSchema = Schema({
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

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();

  return user;
};

module.exports = model("User", UserSchema);
