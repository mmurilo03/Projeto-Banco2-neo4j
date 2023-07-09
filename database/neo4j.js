const neo4j = require("neo4j-driver");

const driver = () => {
  return neo4j.driver(
    process.env.NEO4J_DB,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
  );
};

module.exports = driver;
