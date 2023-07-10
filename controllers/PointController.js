const Point = require("../models/Point");
const UserNeo4j = require("../models/UserNeo4j");
const PointNeo4j = require("../models/PointNeo4j");
const jwt = require("jsonwebtoken");

const listarPontos = async (req, res) => {
  let points = await Point.find()
    .then((result) => result)
    .catch((e) => res.status(400).send(e));
  res.status(200).send(points);
};

const salvarPonto = async (req, res) => {
  const obj = {
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    dataInicio: req.body.dataInicio,
    dataTermino: req.body.dataTermino,
    localizacao: `${req.body.lng} ${req.body.lat}`,
  };
  const point = await Point.create(obj)
    .then((result) => result)
    .catch((e) => res.status(400).send(e));
  const pointNeo4j = await PointNeo4j.salvar({
    titulo: point.titulo,
    mongoId: point._id.toHexString(),
  });
  if (point) {
    res.status(201).send(point);
  } else {
    res.send("Erro");
  }
};

const deletarPonto = async (req, res) => {
  Point.deleteOne({ _id: req.params.id })
    .then(async (result) => {
      if (result.deletedCount > 0) {
        await PointNeo4j.deletar({ mongoId: req.params.id });
        res.status(200).send("Ponto removido");
      } else res.status(404).send("Ponto não encontrado");
    })
    .catch((e) => res.status(400).send(e));
};

const atualizarPonto = async (req, res) => {
  const obj = {
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    dataInicio: req.body.dataInicio,
    dataTermino: req.body.dataTermino,
    localizacao: `${req.body.lng} ${req.body.lat}`,
  };
  const point = await Point.findById(req.params.id)
    .then((result) => {
      if (result) {
        result.set(obj);
        result.save();
        return result;
      }
    })
    .catch((e) => res.status(404).send("Ponto não encontrado"));
  const pointNeo4j = await PointNeo4j.atualizar({
    titulo: point.titulo,
    mongoId: point._id.toHexString(),
  });
  if (point) {
    res.status(201).send(point);
  } else {
    res.send("Erro");
  }
};

const pesquisaPorTexto = async (req, res) => {
  const points = await Point.find(
    { $text: { $search: req.body.pesquisa } },
    { __v: false }
  )
    .then((result) => result)
    .catch((e) => res.status(400).send(e));
  res.status(200).send(points);
};

const pesquisaPorId = async (req, res) => {
  let user;
  const token = req.get("authorization");

  const point = await Point.findById(req.params.id)
    .then((result) => result)
    .catch((e) => res.status(404).send("Ponto não encontrado"));

  if (token) {
    try {
      user = jwt.verify(token.split(" ")[1], process.env.SECRET);
      const eventosCurtidos = await UserNeo4j.eventosCurtidos(user.user._id);
      if (eventosCurtidos.find((userPoint) => userPoint == `${point._id}`)) {
        point._doc.curtiu = true;
      }
    } catch (e) {}
  }
  res.status(200).send(point);
  return;
};

const recomendados = async (req, res) => {
  let user;
  const token = req.get("authorization");
  if (token) {
    try {
      user = jwt.verify(token.split(" ")[1], process.env.SECRET);
      const eventosRecomendados = await UserNeo4j.recomendados(user.user._id);
      const pontosRecomendados = []
      for (let evento of eventosRecomendados){
          let ponto = await Point.findById(evento.mongoId)
          pontosRecomendados.push(ponto)
      }
      res.send(pontosRecomendados)
      return;
    } catch (e) {}
  }
  res.send({error: "Sem recomendações"});
};

module.exports = {
  listarPontos,
  salvarPonto,
  deletarPonto,
  atualizarPonto,
  pesquisaPorTexto,
  pesquisaPorId,
  recomendados,
};
