const express = require ('express');
const app = express();
var productsDB = [];
bodyParser = require('body-parser');

/* MIDDLEWARE */
app.use(bodyParser.urlencoded({ extended: true}));

/* ROUTES */

app.route('/products/')
  .post((req, res) => {
    if (req.body.hasOwnProperty('name') && req.body.hasOwnProperty('price') && req.body.hasOwnProperty('inventory')){
      var data = {
        id: productsDB.length,
        name: req.body.name,
        price: req.body.price,
        inventory: req.body.inventory
      };
      productsDB.push(data);
      res.send({ "success": true });
    } else {
    res.send({ "success": false });
    }
  console.log(productsDB);
  })

app.route('/products/:id')
  .put ((req, res) => {
    if (productsDB[req.params.id] !== undefined) {
      if (productsDB[req.params.id].name !== undefined) {
        productsDB[req.params.id].name = req.body.name;
      }
      if (productsDB[req.params.id].price !== undefined) {
        productsDB[req.params.id].price = req.body.price;
      }
      if (productsDB[req.params.id].inventory !== undefined) {
        productsDB[req.params.id].inventory = req.body.inventory;
      }
    }
    console.log(productsDB);
  })
  .put ((req, res) => {
    if (productsDB[req.params.id] !== undefined) {
      productsDB.slice(productsDB[req.params.id], 1);
    }
    console.log(productsDB);
  });

var server = app.listen(3000, () => {
  console.log('listening...');
});

/*function isDefined (any) {
  if (any !== undefined) {
    return true;
  }
}*/