var products = require("../database/product.json");
var path = require("path");
var fs = require("fs");

module.exports = async function createProduct(req,res){
    const body = req.body;
    let product = {
        "id": body.id,
        "name": body.name,
        "price": body.price,
        "description": body.description,
        "image_link": body.image_link,
        "restaurant_id": body.restaurant_id,
        "status": body.status
    }
    products.push(product)
    fs.writeFileSync(path.join(__dirname, "../database/product.json"),JSON.stringify(products), function(err){
        if(err) throw err;
    })
    return res.status(200).json({msg: 'sucesso!'})
}