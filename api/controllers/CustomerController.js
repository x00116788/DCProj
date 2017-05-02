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
        Customer.create(req.params.all(), function userCreated(err, user) {
            if (err) {
                console.log(err);
                return res.redirect('customer/new');
            }
            res.json(user);
            
            // // Log user in
            // req.session.authenticated = true;
            // req.session.User = user;
            
            // // After successfully creating the user
            // // redirect to the show action
            // return res.redirect('/user/show/' + user.id);
        });
    },

    'new': function(req,res){
        res.view();
    }
	
};

