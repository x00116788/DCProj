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
<<<<<<< HEAD
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
        
=======
        Customer.create(req.params.all(), function userCreated(err, user) {
            if (err) {
                console.log(err);
                return res.redirect('customer/new');
            }
            res.json(user);
>>>>>>> ac470dbbe0e21b3dfb98d4d6602cfc7d4acc6a33
            
            // // Log user in
            // req.session.authenticated = true;
            // req.session.User = user;
            
            // // After successfully creating the user
            // // redirect to the show action
            // return res.redirect('/user/show/' + user.id);
<<<<<<< HEAD
=======
        });
>>>>>>> ac470dbbe0e21b3dfb98d4d6602cfc7d4acc6a33
    },

    'new': function(req,res){
        res.view();
    }
	
};

