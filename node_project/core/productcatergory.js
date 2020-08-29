const con = require('../config/db.js');
var md5 = require('md5');
var microtime = require('microtime');
function Productcategory() { };
Productcategory.prototype = {
    getallcategory: function (callback) {
        let sql = `SELECT bs_categories.cat_id,bs_categories.cat_name,bs_categories.cat_ordering,core_images.img_id,core_images.img_parent_id,core_images.img_type,core_images.img_path FROM bs_categories INNER join core_images on bs_categories.cat_id=core_images.img_parent_id WHERE core_images.img_type='category-icon'`;
        //  console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err
            if (result.length > 0) {
                callback(result);
            } else {
                callback(null);
            }
        });
    },

//get deses category
getdesCategory: function (callback) {
    let sql = `SELECT * FROM category`;
    //  console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err
        if (result.length > 0) {
            callback(result);
        } else {
            callback(null);
        }
    });
},

//get Labotary Details
getLabotaryDetails: function (callback) {
    let sql = `SELECT * FROM labratory_owner`;
    //  console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err
        if (result.length > 0) {
            callback(result);
        } else {
            callback(null);
        }
    });
},
//get package Details
getAllPackage: function (callback) {
    let sql = `SELECT * FROM package`;
    //  console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err
        if (result.length > 0) {
            callback(result);
        } else {
            callback(null);
        }
    });
},


    getallpachages: function (callback) {
        let sql = `SELECT * FROM bs_packages`;
        //  console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err
            if (result.length > 0) {
                callback(result);
            } else {
                callback(null);
            }
        });

    },
    

    getsubcategory_byid: function (category_id, callback) {
        if (category_id) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(category_id) ? 'id' : 'cat_id';
        }
        // prepare the sql query
        let sql = `SELECT * FROM  bs_subcategories WHERE ${field} = ?`;
        con.query(sql, category_id, function (err, result) {
            console.log(result);
            if (err) throw err
            if (result.length) {
                callback(result);
            } else {
                callback(null);
            }
        });

    },

    //get product by category id

    getProductByCategoryId: function (cat_id, callback) {
           
let sql='SELECT category.cat_name, product.pro_id, product.name, product.description, product.product_amount, product.report_within FROM category INNER JOIN product on category.cat_id=product.cat_id WHERE category.cat_id = ?';
        
        con.query(sql, cat_id, function (err, result) {
          
            if (err) throw err
            if (result.length) {
                callback(result);
            } else {
                callback(null);
            }
        });

    },

    //create order in order table
    createOrder: function (body, callback) {
    
        //console.log(body.user_email);
        // this.findrgister(body.user_phone, body.user_email, function (user) {
        //     if (user) {
        //         // console.log(body.user_email);
        //         callback(null); return;
        //     }
        //     else {
                var bind = [];
                // loop in the attributes of the object and push the values into the bind array.
                for (prop in body) {
                    bind.push(body[prop]);
                }
                
                let sql = `INSERT INTO  order_item (fk_order_id, fkproduct_id,quntity,anount) VALUES (?, ?,?,?)`;
                con.query(sql, bind, function (err, result) {
                    if (err) throw err;
                     //console.log('sec',result);
                    // return the last inserted id. if there is no error
                    callback(result);
                });
           // }

       // });



    },


        //get product after order

        oderdetails: function (id,callback) {
            let sql = 'SELECT * FROM order_item where item_id =?';
              console.log(sql);
            con.query(sql, id,function (err, result) {
                console.log(result)
                if (err) throw err
                if (result.length > 0) {
                    callback(result);
                } else {
                    callback(null);
                }
            });
    
        },


         //getOrderDetailsAfterOrdered

    getOrderDetailsAfterOrdered: function (id, callback) {
           console.log('oderid',id)
        let sql='SELECT user.first_name, labratory_owner.lab_owner_name, labratory_owner.labratory_name, labratory_owner.labratory_address, labratory_owner.lab_phone, labratory_owner.lab_email, user.last_name, product.discount_per, product.name, product.description,product.vendor_id, product.city_id, product.report_within, user.phone_no, user.email_id, city.city_name, user.address, user.user_id ,order_item.date_time, order_item.item_id, order_item.fkproduct_id, order_item.quntity, order_item.anount FROM order_item JOIN user on order_item.fk_order_id=user.user_id JOIN product ON product.pro_id = order_item.fkproduct_id JOIN city ON city.city_id=product.city_id INNER JOIN labratory_owner ON labratory_owner.city_id = product.city_id WHERE order_item.item_id  = ?';
                console.log('sql',sql)
                con.query(sql, id, function (err, result) {
                  console.log('afte',result)

                    if (err) throw err
                    if (result.length) {
                        callback(result);
                    } else {
                        callback(null);
                    }
                });
        
            },

            //delete book order
            bookOrderDelete: function (id,callback) {
                let sql = 'DELETE FROM order_item where item_id =?';
                  console.log(sql);
                con.query(sql, id, function (err, result) {
                    console.log(result)
                    if (err) throw err
                    if (result.length > 0) {
                        callback(result);
                    } else {
                        callback(null);
                    }
                });
        
            },

          

             //create order in order table
    OrderInsertIntoOderTable: function (body, callback) {
    
      
                var bind = [];
                
                for (prop in body) {
                    bind.push(body[prop]);
                }
                console.log(bind)
                
                let sql = `INSERT INTO  order_tbl (order_id,user_id, status,total_amount,city_id, vendor_id, productt_id, date, created_at, order_type, discount_amount, assign) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?)`;
                con.query(sql, bind, function (err, result) {
                    if (err) throw err;
                     console.log('ord_tbl',result);
                    
                    callback(result);
                });
           

    },


}
module.exports = Productcategory;