const express = require('express');
const router = express.Router();

const PointController = require("../controllers/PointController")
const auth = require("../middleware/auth")

router.get("/", PointController.listarPontos)
router.get("/recomendados", PointController.recomendados)
router.get("/:id", PointController.pesquisaPorId)
router.post("/", auth.apiAuthAdmin, PointController.salvarPonto)
router.delete("/:id", auth.apiAuthAdmin, PointController.deletarPonto)
router.patch("/:id", auth.apiAuthAdmin, PointController.atualizarPonto)
router.post("/pesquisa", PointController.pesquisaPorTexto)

module.exports = router;