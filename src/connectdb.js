const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
const port = 3000
const PointRouter = require("../routes/PointRouter")
const UserRouter = require("../routes/UserRouter")


app.use(cors())
app.use("/pontos", PointRouter)
app.use("/user", UserRouter)

app.listen(port, () => console.log('App executando'))