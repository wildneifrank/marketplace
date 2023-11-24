var products = require("../database/product.json");
var path = require("path");
var fs = require("fs");

module.exports = async function editProduct(req,res){
    const body = req.body;
    let i=0;
    let product = {
        "id": body.id,
        "name": body.name,
        "price": body.price,
        "description": body.description,
        "image_link": body.image_link,
        "restaurant_id": body.restaurant_id,
        "status": body.status
    }
    for(i;i<products.length;i++){
        if(products[i].id==product.id){
            products[i].name = product.name;
            products[i].price = product.price;
            products[i].description = product.description;
            products[i].image_link = product.image_link;
            products[i].restaurant_id = product.restaurant_id;
            products[i].status = product.status;
        }
    }
    fs.writeFileSync(path.join(__dirname, "../database/product.json"),JSON.stringify(products), function(err){
        if(err) throw err;
    })
    return res.status(200).json({msg: 'sucesso!'})
}