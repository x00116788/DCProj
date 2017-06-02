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

        Card.create(req.params.all(), function cardCreated(err, card) {
            if (err) {
                console.log(err);
                return res.send('error occured');
            }
            else{
                card.issue_date = new Date(CardService.issued());
                card.expiry_date = CardService.expires();
                card.status = 'pending';

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

