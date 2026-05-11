const express = require ('express')
const path = require ('path')
const app = express()
const dotenv = require ('dotenv').config()
const connectDb = require('./config/connectionDb')
const cors = require ('cors')
const PORT = process.env.PORT || 3000
connectDb()
const _dirname= path.resolve()
app.use(express.json())
app.use(cors())
app.use(express.static("public"))
app.use("/", require("./routes/user"))
app.use("/recipe", require('./routes/recipe'))
app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})
app.listen(PORT,(err)=>{
if (err) console.log("Erreur au démarrage:", err);
console.log(`app is listening on PORT ${PORT}`)
})
