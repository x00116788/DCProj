/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        // Create a User with the params sent from
        // the sign-up form --> new.ejs

        try{
            Customer.create(req.allParams(), function(err, user) {
            if (err) {
                // console.log(err);
                res.send(404, 'invalid input/s');
            }
            res.json(201,user);
            });

        }catch(error){
            res.end(error);

        }
   
    }
	
};

