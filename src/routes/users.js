const { Router } = require("express");

const { check } = require("express-validator");

const { checkFields } = require("../middlewares/checkFields");

const {
  isValidEmail,
  isValidRole,
  isValidId,
} = require("../helpers/db-validators");

const router = Router();

const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/usersCtrl");

router.get("/", getUsers);

router.get("/:id", [], getUser);

router.post(
  "/",
  [
    check("name", "El nombre es requerido").notEmpty(),
    check("email", "El correo es requerido").notEmpty(),
    check("email").custom(isValidEmail),
    check("password", "La contraseña es requerida").notEmpty(),
    check(
      "password",
      "La contraseña debe contener 8 caracteres o más"
    ).isLength({ min: 8 }),
    check("role", "El rol es requerido").notEmpty(),
    check("role").custom(isValidRole),
    checkFields,
  ],
  postUser
);

router.put(
  "/:id",
  [
    check("id", "El id es invalido").isMongoId(),
    check("id").custom(isValidId),
    check("name", "El nombre es requerido").notEmpty(),
    check("email", "El correo es requerido").notEmpty(),
    check("password", "La contraseña es requerida").notEmpty(),
    check(
      "password",
      "La contraseña debe contener 8 caracteres o más"
    ).isLength({ min: 8 }),
    check("role", "El rol es requerido").notEmpty(),
    check("role").custom(isValidRole),
    checkFields,
  ],
  putUser
);

router.delete(
  "/:id",
  [
    check("id", "El id es invalido").isMongoId(),
    check("id").custom(isValidId),
    checkFields,
  ],
  deleteUser
);

module.exports = router;
