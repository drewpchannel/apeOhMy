const express = require ('express');
const app = express();
var products = [];
bodyParser = require('body-parser');

/* MIDDLEWARE */
app.use(bodyParser.urlencoded({ extended: true}));

/* ROUTES */

app.route('/products')
  .post( (req, res) => {
    if (req.body.hasOwnProperty('name') && req.body.hasOwnProperty('price') && req.body.hasOwnProperty('inventory')){
      var data = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        inventory: req.body.inventory
      };
    }
  });

var server = app.listen(3000, () => {
  console.log('listening...');
});