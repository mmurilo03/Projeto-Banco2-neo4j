const express = require('express');
const router = express.Router();

const UserController = require("../controllers/UserController")

router.post("/", UserController.criarUsuario)
router.post("/login", UserController.login)

module.exports = router;