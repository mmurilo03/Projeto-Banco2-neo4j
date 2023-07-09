const driver = require("../database/neo4j");

async function salvar(point) {
  const session = driver().session();
  await session
    .run("CREATE (:Point{titulo:$titulo, mongoId:$mongoId})", {
      titulo: point.titulo,
      mongoId: point.mongoId,
    })
    .then((result) => console.log(result.summary.query.parameters))
    .catch((e) => console.log(e));

  session.close();
  driver().close()
}

async function atualizar(point) {
  const session = driver().session();
  await session
    .run("MATCH (p:Point) WHERE (p.mongoId=$mongoId) SET p.titulo=$titulo", {
      titulo: point.titulo,
      mongoId: point.mongoId,
    })
    .then((result) => console.log(result.summary.query.parameters))
    .catch((e) => console.log(e));

  session.close();
  driver().close()
}

async function deletar(point) {
  const session = driver().session();
  await session
    .run("MATCH (p:Point{mongoId:$mongoId})  DETACH DELETE p", {
      mongoId: point.mongoId,
    })
    .then((result) => console.log(result.summary.query.parameters))
    .catch((e) => console.log(e));

  session.close();
  driver().close()
}

module.exports = { salvar, atualizar, deletar };
