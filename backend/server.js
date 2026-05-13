const express = require ('express')
const cors = require ('cors')
const app = express()
app.use(cors())
const dotenv = require ('dotenv').config()
const connectDb = require('./config/connectionDb')

const PORT = process.env.PORT || 3000
connectDb()

app.use(express.json())
app.use(express.static("public"))
app.use("/", require("./routes/user"))
app.use("/recipe", require('./routes/recipe'))

app.listen(PORT,(err)=>{
if (err) console.log("Erreur au démarrage:", err);
console.log(`app is listening on PORT ${PORT}`)
})
