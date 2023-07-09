const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
const port = 3001
const PointRouter = require("../routes/PointRouter")
const UserRouter = require("../routes/UserRouter")
const session = require("express-session");
const connectSqlite = require("connect-sqlite3")(session);
app.use(
    session({
      secret: process.env.SECRET,
      saveUninitialized: true,
      resave: true,
      name: "userSession",
      cookie: { maxAge: 86400000 }, //1 dia
      store: new connectSqlite(),
    })
  );

app.use(cors())
app.use("/pontos", PointRouter)
app.use("/user", UserRouter)

app.listen(port, () => console.log('App executando'))