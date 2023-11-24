const restaurant = require("../database/restaurant.json");
const jwt = require("jsonwebtoken");
const adminkey = "kofrfemfekf";
const restkey = "ffirejrfremfrmr";

module.exports = async function SigninAccess(req,res){
    const body = req.body
    let access = false
    let i;
    console.log(restaurant.length)
    try{
        for(i=0; i<restaurant.length;i++){
            console.log(i)
            if(body.login==restaurant[i].email && body.password == restaurant[i].password){
                access = true;
                console.log(restaurant[i].email)
                break;
            }
        }
        if(access){
            var token = jwt.sign({
                id: body.login
            }, restkey)
            return res.status(200).json({msg: 'sucesso!', token: `${token}`})
        }
        else return res.status(404).json({msg: 'senha ou usuário incorreto(s)'})
    }catch(err){
        console.log(err)
        return res.status(401).json({msg: `${err}`})             
    }
}

// module.exports = new SigninAccess();