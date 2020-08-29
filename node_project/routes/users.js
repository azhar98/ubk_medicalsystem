var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var md5 = require('md5');
const User = require('../core/main');
const Corefunction = require('../core/corefunction');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var session = require('express-session');
var app = express();
var rn = require('random-number');
app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!", cookie: { maxAge: 600000 } }));
var multer = require('multer')
const user = new User();
const corefunction = new Corefunction();
router.get('/', function (req, res, next) {
  res.send('user response');
});
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname)
  }
})
// const fileFilter = (req, file, cb) => {
//   if ((file.mimetype === 'image/jpeg') || (file.minetype === 'image/png')) {
//     cb(null, true);
//   } else {

//     //cb(null, false);
//     cb(new Error('Only images are allowed'), false);
//   }
// }
var upload = multer({ storage: storage });
router.post('/loginnow', upload.array('avatar', 12), function (req, res, next) {
  console.log(req.body.user_name);
  console.log(req.body.user_password);
  user.login(req.body.user_name, md5(req.body.user_password), function (result) {
    if (result) {
      res.send(result);
    }
    else {
      res.send('{"Status":"invalid"}');
    }
  });

});
router.post('/logintest', upload.array('avatar', 12), function (req, res, next) {

  var auth_token = req.headers['auth_token'];
  console.log(auth_token);
  // corefunction.generate_key(function (result) {
  //   res.send(req.body.username);
  // });
  // console.log(req.body.username);
});
router.post('/create', urlencodedParser, function (req, res, next) {
  //  md5(  . microtime() . uniqid() . 'teamps' );
  console.log("register.....");
  var options = {
    min: 20255
    , max: 500000
  }
  corefunction.generate_key(rn(options), function (result) {
    //res.send(result);
    let userInput = {
      user_id: result,
      user_name: req.body.user_name,
      user_phone: req.body.user_phone,
      user_email: req.body.user_email,
      user_password: md5(req.body.user_password)
    };
    user.create(userInput, function (lastId) {
      // if the creation of the user goes well we should get an integer (id of the inserted user)
      if (lastId) {
        res.send({ "create": "success", "user_id": result });
      } else {
        res.send({ "create": "Already Exist" });
        console.log('Already Exist');
      }
    });
  });
});

router.post('/profile', upload.array('avatar', 12), function (req, res, next) {

  res.send(req.files);
  // console.log(req.body.username);
  //console.log(req.body.username);
});
// app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
//   const files = req.files
//   if (!files) {
//     const error = new Error('Please choose files')
//     error.httpStatusCode = 400
//     return next(error)
//   }

//   res.send(files)

// })


module.exports = router;
