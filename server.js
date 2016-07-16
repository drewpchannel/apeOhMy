const express = require ('express');
const methodOverride = require('method-override');
const app = express();
var productsDB = [];
var articlesDB = [];
bodyParser = require('body-parser');
app.set('view engine', 'jade');
app.set('views', './templates');

/* MIDDLEWARE */
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

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
  .get ((req, res) => {
    res.render('products/index.jade', {productsDB: productsDB});
  })

app.route('/products/new')
  .get ((req, res) => {
    res.render('products/new.jade')
  })

app.route('/products/:id')
  .put ((req, res) => {
    var idSelected = productsDB[req.body.id];
    if (idSelected !== undefined) {
      if (idSelected.name !== undefined) {
        idSelected.name = req.body.name;
      }
      if (idSelected.price !== undefined) {
        idSelected.price = req.body.price;
      }
      if (idSelected.inventory !== undefined) {
        idSelected.inventory = req.body.inventory;
      }
    res.send({ "success": true });
    } else {
      res.send({ "success": false });
    }
    console.log(productsDB);
  })
  .delete ((req, res) => {
    var idSelected = productsDB[req.params.id];
    if (idSelected !== undefined) {
      productsDB.splice(productsDB.indexOf(idSelected), 1);
      res.send({ "success": true });
    } else {
      res.send({ "success": false });
    }
    console.log(productsDB);
  })
  .get ((req, res) => {
    res.render('products/edit.jade', {productsDB: productsDB});
  })

var server = app.listen(3000, () => {
  console.log('listening...');
});

app.route('/articles')
  .post((req, res) => {
    if (req.body.hasOwnProperty('body') && req.body.hasOwnProperty('author')) {
      var article = {
        title: articlesDB.length,
        body: req.body.body,
        author: req.body.author,
        urlTitle: req.url + articlesDB.length
      };
      articlesDB.push(article);
      console.log(articlesDB);
      res.send({ "success": true });
    } else {
      res.send({ "success": false });
    }
  });

app.route('/articles/:title')
  .put ((req, res) => {
    var titleSelected = articlesDB[req.params.title];
    if (articlesDB[req.params.title] !== undefined) {
      if (req.body.hasOwnProperty('title')) {
        articlesDB[req.body.title] = {
          title: req.body.title,
          body: titleSelected.body,
          author: titleSelected.author,
          urlTitle: req.url + req.body.title.replace(" ", '%20')
        };
        res.send({ "success": true });
        console.log(articlesDB[req.body.title]);
      }
    }
  })
  .delete ((req, res) => {
    if (articlesDB[req.body.title] !== undefined) {
      for (var i = 0; i < articlesDB.length; i++){
        if (articlesDB[i].title.toString() === req.body.title) {
          articlesDB.splice(i, 1);
          res.send({'success': true});
          console.log(articlesDB);
        }
      }
    } else {
      res.send({'success': false});
    }
  })