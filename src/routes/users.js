const { Router } = require("express");

const router = Router();

const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/usersCtrl");

router.get("/", [], getUsers);

router.get("/:id", [], getUser);

router.post("/", [], postUser);

router.put("/:id", [], putUser);

router.delete("/:id", [], deleteUser);

module.exports = router;
