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
  driver().close()
}

module.exports = { salvar };
