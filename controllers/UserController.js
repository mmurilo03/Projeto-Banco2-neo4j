const User = require("../models/User");
const UserNeo4j = require("../models/UserNeo4j");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const criarUsuario = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (await User.findOne({ email: email })) {
    res.send({ error: "Email cadastrado" });
    return;
  }
  if (email && password) {
    try {
      const hashSenha = await bcrypt.hash(password, Number(process.env.SALT));
      const obj = {
        email: email,
        password: hashSenha,
      };
      const user = await User.create(obj)
        .then((result) => result)
        .catch((e) => res.status(400).send(e));
      const userNeo4j = await UserNeo4j.salvar({
        email: email,
        mongoId: user._id.toHexString(),
      });
      if (user) {
        res.status(201).send(user);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  }
  res.send({ error: "Campos inválidos" });
  return;
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email && password) {
    const user = await User.findOne({ email: email })
      .then((result) => result)
      .catch((e) => console.log("erro"));
    if (user) {
      try {
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign({ user: user }, process.env.SECRET, {
            expiresIn: 86400,
          });
          const admin = email == process.env.ADMIN;
          res.send({ token: `Bearer ${token}`, admin: admin, id: user._id.toHexString() });
          return;
        }
        res.send({ error: "Senha errada" });
        return;
      } catch (e) {
        console.log("erro");
      }
    }
  }
  res.send({ error: "Campos inválidos" });
  return;
};

const curtir = async (req, res) => {
  await UserNeo4j.curtir(req.params.id, req.params.user);
  res.send("ok");
};

module.exports = {
  criarUsuario,
  login,
  curtir,
};
