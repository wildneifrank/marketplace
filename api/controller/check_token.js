const jwt = require("jsonwebtoken");
const adminkey = "kofrfemfekf";
const restkey = "ffirejrfremfrmr";

module.exports = function checkToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(!token) return res.status(401).json({msg: 'acesso negado!'})
    try{
        jwt.verify(token, restkey)
        next()
    }catch(error){
        res.status(400).json({msg: 'erro inesperado!'})
    }
}