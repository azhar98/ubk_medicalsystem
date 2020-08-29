var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express()
const Productcategory = require('../core/productcatergory');
const productcategory = new Productcategory();
require('dotenv').config()
app.set('trust proxy', 1) // trust first proxy
router.get('/', function (req, res, next) {
    if (req.session.views) {
        req.session.views++
        res.send(req.session.views)
    } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
    }
});
router.get('/getcategories', function (req, res, next) {
    //res.send('getcategories');

    var auth_token = req.headers['auth_token'];
    jwt.verify(auth_token, process.env.secret_key, function (err, decoded) {
        if (err) {
            res.status(403).send('[{"status":"authentication falied"}]');
        } else {
            productcategory.getallcategory(function (result) {
                res.status(200).send(result);
            })
        }
    });

});
router.post('/getsubcategoriesByid', urlencodedParser, function (req, res, next) {

    var auth_token = req.headers['auth_token'];
    jwt.verify(auth_token, process.env.secret_key, function (err, decoded) {
        if (err) {
            res.status(403).send('[{"status":"authentication falied"}]');
        } else {
            productcategory.getsubcategory_byid(req.body.category_id, function (result) {
                //console.log(result);
                res.status(200).send(result);
            });
        }
    });

});

module.exports = router;