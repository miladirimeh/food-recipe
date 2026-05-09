const jwt= require("jsonwebtoken")
const verifyToken= (req,res,next)=>{
    let token = req.headers ["authorization"]
    if (token) {
    const tokenArray = token.split(" "); 
    const pureToken = tokenArray[1]; // On prend uniquement la partie après "Bearer"
    jwt.verify(pureToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err){
            return res.status(401).json({message:"invalid token"})
        }
        else{
            console.log(decoded)
            req.user=decoded
            next()
        }
    })
    
    }
    else{
     return res.status(403).json({message:"invalid token"})
      
    }
}
module.exports=verifyToken