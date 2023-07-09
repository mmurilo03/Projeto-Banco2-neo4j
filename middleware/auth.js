const jwt = require("jsonwebtoken");

const apiAuth = async (req, res, next) => {
  let user;
  const token = req.get("authorization");
  if (token) {
    try {
      user = jwt.verify(token.split(" ")[1], process.env.SECRET);
    } catch (error) {
      res
        .status(401)
        .json({ error: `Cabeçalho de token vazio ou token inválido!` });
    }
    if (user.user.email == process.env.ADMIN) {
      next();
      return;
    }
  } else {
    res
      .status(401)
      .json({ error: `Cabeçalho de token vazio ou token inválido` });
    return;
  }
  res.status(401).json({ error: `Cabeçalho de token vazio ou token inválido` });
};

module.exports = { apiAuth };
