var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var session = require('express-session');
var app = express();
var md5 = require('md5');
var jwt = require('jsonwebtoken');
require('dotenv').config()
//var env_verival = require('dotenv/env');
const Productcategory = require('../core/productcatergory');
const productcategory = new Productcategory();
app.use(express.json());
app.use(cookieParser());
//app.use(session({ secret: "Shh, its a secret!" }));
/* GET home page. */

router.get('/', function (req, res, next) {
  console.log(process.env.secret_key);
  productcategory.getallcategory(function (result) {
    res.send(result);
  })

});
//get profile page's desig category
router.get('/getcategories', function (req, res, next) {
  console.log(process.env.secret_key);
  productcategory.getdesCategory(function (result) {
    res.send(result);
  })

});

//get LaboratoryDetails
router.get('/getlaboratoy', function (req, res, next) {
  console.log(process.env.secret_key);
  productcategory.getLabotaryDetails(function (result) {
    res.send(result);
  })

});

//get packageDetails
router.get('/getpackage', function (req, res, next) {
  console.log(process.env.secret_key);
  productcategory.getAllPackage(function (result) {
    res.send(result);
  })

});

//get product by category Id
router.get('/:cat_id', function (req, res, next) {
  console.log(process.env.secret_key);
  console.log(req.params.cat_id)
  productcategory.getProductByCategoryId(req.params.cat_id, function ( result) {
    res.send(result);
  })

});

//Delete Book Product
router.delete('/delete/:id', function (req, res, next) {
  console.log(process.env.secret_key);
  console.log('ddd',req.params.id)
  productcategory.bookOrderDelete(req.params.id, function ( result) {
    res.send(result);
  })

});

//get order product by user_Id
router.get('/sam/:id', function (req, res, next) {
  // console.log(process.env.secret_key);
  console.log('kk',req.params.id)
   productcategory.oderdetails(req.params.id,function(result) {
     console.log(result)
     res.send(result);
   })
 
 });


//get order detail after order
router.get('/order/:id', function (req, res, next) {
  console.log(process.env.secret_key);
  console.log('order_id',req.params.id)
  productcategory.getOrderDetailsAfterOrdered(req.params.id, function ( result) {
    res.send(result);
  })

});

//get product by category Id
router.post('/order', function (req, res, next) {
  console.log(process.env.secret_key);
  
  let reqData = {
    fk_order_id: 6,   //userid
    fkproduct_id: req.body.product_id,
    quntity: 1,
    anount: req.body.product_amount
  }
  productcategory.createOrder(reqData, function ( result) {
    console.log('create',result)
    res.send({ "create": "success", "user_id": result });
  })

});

//insert order detail in ordertable
router.post('/orderdetail', function (req, res, next) {
  console.log(req.body);
  
  // let reqData = {
  //   fk_order_id: 6,   //userid
  //   fkproduct_id: req.body.product_id,
  //   quntity: 1,
  //   anount: req.body.product_amount
  // }
  productcategory.OrderInsertIntoOderTable(req.body, function ( result) {
    console.log('create',result)
    res.send({ "create": "success", "user_id": result });
  })

});


router.get('/verify', function (req, res, next) {
  jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1Nzg5MDcxNDN9.2xbJSistG1qhYE9RVB_Zi6NP71-NW0Dn7qfM0F_MXKg', 'shhhhh', function (err, decoded) {
    if (err) {
      res.send('invalid token');
    } else {
      res.send(decoded.foo);
    }
  });

});
router.get('/getpackages', function (req, res, next) {
  productcategory.getallpachages(function (result) {
    res.send(result);
  })

});


module.exports = router;
