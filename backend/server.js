const express = require ('express')
const app = express()
const dotenv = require ('dotenv').config()
const connectDb = require('./config/connectionDb')
const cors = require ('cors')
const PORT = process.env.PORT || 3000
connectDb()
app.use(express.json())
app.use(cors())
app.use(express.static("public"))
app.use("/", require("./routes/user"))
app.use("/recipe", require('./routes/recipe'))
app.use(cors({
  origin: "https://food-recipe-5-ltf8.onrender.com/" // L'URL de ton frontend Render
}));
app.listen(PORT,(err)=>{
if (err) console.log("Erreur au démarrage:", err);
console.log(`app is listening on PORT ${PORT}`)
})
