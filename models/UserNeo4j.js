const driver = require("../database/neo4j");

async function salvar(user) {
  const session = driver().session();
  await session
    .run("CREATE (:User{email:$email, mongoId:$mongoId})", {
      email: user.email,
      mongoId: user.mongoId,
    })
    .then((result) => console.log(result.summary.query.parameters))
    .catch((e) => console.log(e));

  session.close();
  driver().close();
}

async function curtir(pointId, userId) {
  const session = driver().session();

  const curtiu = await eventosCurtidos(userId);
  const curtiuEvento = curtiu.find((point) => point == pointId);
  if (!curtiuEvento) {
    await session
      .run(
        "MATCH (u:User{mongoId:$userMongoId}) OPTIONAL MATCH (p:Point{mongoId:$pointMongoId}) CREATE (u)-[:CURTIU]->(p)",
        {
          userMongoId: userId,
          pointMongoId: pointId,
        }
      )
      .then((result) =>
        console.log(result.summary.counters._stats.relationshipsCreated)
      );
  } else {
    await session
      .run(
        "MATCH (u:User{mongoId:$userMongoId})-[r:CURTIU]->(p:Point{mongoId:$pointMongoId}) delete r",
        {
          userMongoId: userId,
          pointMongoId: pointId,
        }
      )
      .then((result) =>
        console.log(result.summary.counters._stats.relationshipsCreated)
      );
  }

  session.close();
  driver().close();
}

async function eventosCurtidos(userId) {
  const session = driver().session();
  const curtiu = await session
    .run(
      "MATCH (u:User{mongoId:$mongoId})-[c:CURTIU]->(p:Point) RETURN p.mongoId as pontos",
      {
        mongoId: userId,
      }
    )
    .then((result) => {
      if (result.records.length > 0) {
        const eventos = []
        result.records.forEach((record) => {
          eventos.push(record._fields[0])
        })
        console.log(eventos);

        return eventos;
      } else {
        return [];
      }
    });

  session.close();
  driver().close();
  return curtiu;
}

async function recomendados(userId) {
  const session = driver().session();
  const curtiu = await session
    .run(
      "MATCH (u1:User)-[c1:CURTIU]->(p1:Point)<-[c2:CURTIU]-(u2:User)-[c3:CURTIU]->(p2:Point) RETURN p2",
      {
        mongoId: userId,
      }
    )
    .then((result) => {
      if (result.records.length > 0) {
        const eventos = []
        result.records.forEach((record) => {
          eventos.push(record._fields[0].properties)
        })
        console.log(eventos);

        return eventos;
      } else {
        return [];
      }
    });

  session.close();
  driver().close();
  return curtiu;
}

module.exports = { salvar, curtir, eventosCurtidos, recomendados };
