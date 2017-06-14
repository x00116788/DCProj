/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {        
        try{
            Customer.create(req.allParams(), function(err, user) {
            if (err) {
                console.log(err);
                res.send(400, err);
            }
            res.send(201,user);
            });

        }catch(error){
            res.end(error);
        }
   
    },

    patch: function (req, res){

    },

    login: function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password || email === undefined || password === undefined) {
      res.send(400, "Missing params");
    }
    else{
        Customer.findOne({email: email, password: password})
        .exec(function(err, customer) {
            if (err) {res.send(err)}
            if (!customer) {res.send(400,"Invalid Credentials")}
            console.log(customer)
            res.send(200, customer);
      })
    }
    
  }

	
};

