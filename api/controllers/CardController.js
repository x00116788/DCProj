/**
 * CardController
 *
 * @description :: Server-side logic for managing cards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function (req, res) {
        // Create a User with the params sent from
        // the sign-up form --> new.ejs
        Cards.create(req.params.all(), function cardCreated(err, card) {
            if (err) {
                console.log(err);
                return res.redirect('cards/new');
            }
            else{
                card.issue_date = new Date(new Date().getYear,new Date().getMonth);
                card.expiry_date = this.issue_date();
                card.expiry_date.setFullYear(card.expiry_date.getYear()+1);

            }
            res.json(card);
            
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

