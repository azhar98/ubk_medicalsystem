const con = require('../config/db.js');
var jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
function User() { };

User.prototype = {
    // Find the user data by id or username.
    findrgister: function (user = null, user2 = null, callback) {
        // if the user variable is defind
        var bind = [];
        if (user) {
            // if user = number return field = id, if user = string return field = username.

            var field = Number.isInteger(user) ? 'user_id' : 'user_phone';
            // bind.push(user);
        }
        if (user2) {
            var field1 = Number.isInteger(user) ? 'user_id' : 'user_email';
            //bind.push(user2);
        }
        var bind = [user, user2];
        // prepare the sql query
        let sql = `SELECT * FROM   core_users WHERE ${field} = ? OR ${field1} = ?`;
        console.log(sql);
        con.query(sql, bind, function (err, result) {
            if (err) throw err

            if (result.length) {


                callback(result[0]);
            } else {
                callback(null);
            }
        });
    },

    find: function (user = null, callback) {
        // if the user variable is defind
        if (user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'user_id' : 'user_phone';
        }
        // prepare the sql query
        let sql = `SELECT * FROM  core_users WHERE ${field} = ?`;


        con.query(sql, user, function (err, result) {
            //console.log(result);
            if (err) throw err
            if (result.length) {
                callback(result[0]);
            } else {
                callback(null);
            }
        });
    },
    // This function will insert data into the database. (create a new user)
    // body is an object 
    create: function (body, callback) {

        //console.log(body.user_email);
        this.findrgister(body.user_phone, body.user_email, function (user) {
            if (user) {
                // console.log(body.user_email);
                callback(null); return;
            }
            else {
                var bind = [];
                // loop in the attributes of the object and push the values into the bind array.
                for (prop in body) {
                    bind.push(body[prop]);
                }
                let sql = `INSERT INTO  core_users (user_id, user_name, user_phone,user_email,user_password) VALUES (?, ?, ?,?,?)`;
                con.query(sql, bind, function (err, result) {
                    if (err) throw err;
                    // console.log(result);
                    // return the last inserted id. if there is no error
                    callback(result.affectedRows);
                });
            }

        });



    },
    login: function (username, password, callback) {
        this.find(username, function (user) {
            if (user) {
                //console.log(user);

                if ((password === user.user_password)) {
                    var token = jwt.sign({ developedby: 'ubkinfotech' }, '32564564544045604sxadsdsadsa6d54sadreqwer4r6wq4rsad54d56sa4d35sa4dsa564');
                    let userdata = {
                        'user_id': user.user_id,
                        'user_name': user.user_name,
                        'user_phone': user.user_phone,
                        'user_email': user.user_email,
                        'user_is_sys_admin': user.user_is_sys_admin,
                        'facebook_id': user.facebook_id,
                        'google_id': user.google_id,
                        'phone_id': user.phone_id,
                        'user_address': user.user_address,
                        'city': user.city,
                        'user_about_me': user.user_about_me,
                        'user_cover_photo': user.user_cover_photo,
                        'user_profile_photo': user.user_profile_photo,
                        'role_id': user.role_id,
                        'pack_id': user.pack_id,
                        'user_type': user.user_type,
                        'status': user.status,
                        'is_banned': user.is_banned,
                        'device_token': user.device_token,
                        'auth_token': token

                    };
                    console.log(userdata);
                    // user.push({ 'auth_token': '32564564544045604sxadsdsadsa6d54sadreqwer4r6wq4rsad54d56sa4d35sa4dsa564' });
                    callback(userdata); return;

                }
                else { callback(null); return; }
            }


        });

    }




}

module.exports = User;