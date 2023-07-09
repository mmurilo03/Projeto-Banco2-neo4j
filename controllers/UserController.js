const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const criarUsuario = async (req, res) => {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  if (username && email && password){
    try {
      const hashSenha = await bcrypt.hash(password, Number(process.env.SALT));
      const obj = {
        username: username,
        email: email,
        password: hashSenha
      };
      const user = await User.create(obj)
        .then((result) => result)
        .catch((e) => res.status(400).send(e));
      if (user) {
        res.status(201).send(user);
      }
    } catch (e){
      console.log(e);
    }
  }
  res.send({error:"Campos inválidos"})
};

const login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  if (email && password){
    const user = await User.findOne({ email: email}).then((result) => result)
    if(user){
      try{
        if (await bcrypt.compare(password, user.password)){
          const token = jwt.sign({ user: user }, process.env.SECRET, { expiresIn: 86400 });
          req.session.user = user;
          res.set("auth", `Bearer ${token}`);
          res.cookie("token", `Bearer ${token}`);
          res.send({token:`Bearer ${token}`});
          return;
        }
        res.send({error:"Senha errada"})
        return;
      } catch (e){
        console.log(e);
      }
    }
  }
  res.send({error:"Campos inválidos"})
}

const logout = (req, res) => {
  req.session.destroy();
  res.clearCookie("token");
  res.send({ok:"ok"})
};

module.exports = {
  criarUsuario,
  login,
  logout
};
