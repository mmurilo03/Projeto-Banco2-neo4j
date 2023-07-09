const express = require('express');
const router = express.Router();

const PointController = require("../controllers/PointController")
const auth = require("../middleware/auth")

router.get("/", PointController.listarPontos)
router.get("/:id", PointController.pesquisaPorId)
router.post("/", auth.apiAuth, PointController.salvarPonto)
router.delete("/:id", auth.apiAuth, PointController.deletarPonto)
router.patch("/:id", auth.apiAuth, PointController.atualizarPonto)
router.post("/pesquisa", PointController.pesquisaPorTexto)

module.exports = router;