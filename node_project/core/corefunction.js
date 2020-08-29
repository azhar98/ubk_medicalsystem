const con = require('../config/db.js');
var md5 = require('md5');
var microtime = require('microtime');


function Corefunction() { };

Corefunction.prototype = {
    generate_key: function (uniquid, callback) {

        let uniuqe_key = md5(microtime.now() + uniquid + 'teamps');
        callback(uniuqe_key); return;
    }

}
module.exports = Corefunction;