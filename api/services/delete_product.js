var products = require("../database/product.json");
var path = require("path");
var fs = require("fs");

module.exports = async function deleteProduct(req,res){
    const body = req.body;
    let i=0;
    let product = {
        "id": body.id
    }
    var newProducts = []
    for(i;i<products.length;i++){
        if(products[i].id!=product.id){
            newProducts.push(products[i])
        }
    }
    
    fs.writeFileSync(path.join(__dirname, "../database/product.json"),JSON.stringify(newProducts), function(err){
        if(err) throw err;
    })
    return res.status(200).json({msg: 'sucesso!'})
}