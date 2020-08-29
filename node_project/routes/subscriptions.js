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
const Productcategory = require('../core/productcatergory');
const productcategory = new Productcategory();
app.use(express.json());
app.use(cookieParser());
//app.use(session({ secret: "Shh, its a secret!" }));
/* GET home page. */

router.get('/', function (req, res, next) {
    res.send('ok subscribations')
    // res.render('imageupload', { session_userid: 1 });
});
router.get('/getpackages', function (req, res, next) {
    var auth_token = req.headers['auth_token'];
    jwt.verify(auth_token, process.env.secret_key, function (err, decoded) {
        if (err) {
            res.status(403).send('[{"status":"authentication falied"}]');
        } else {
            productcategory.getallpachages(function (result) {
                res.status(200).send(result);
            })
        }
    });



});


module.exports = router;
