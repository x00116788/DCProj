/**
 * CardController
 *
 * @description :: Server-side logic for managing cards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function (req, res) {
        if (req.params.all().amount < 10){
            res.send(400,'initial top up must be 10EUR and above')
        };
        Customer.findOne(req.params.all().owner, (err, customer) =>{
            if (!customer){ res.send(400, 'invalid Customer')}
            else{
                Card.create({
                    issue_date : new Date(),
                    expiry_date : CardService.expires(),
                    status : 'Active',
                    cvv : CardService.makeCVV(),
                    cardNumber : CardService.cardNumber(req.params.all().owner),
                    balance : req.params.all().amount,
                    owner : customer
                }).exec(function(err, card) {
                    if (err){res.send(400, err)}
                    res.json(201,card);
                });
            }
            
        })        
    },

    balance: function (req, res){
        CardService.validateOne(req.allParams()).then((valid) =>{
            res.send(200, {"balance" : valid.balance})
            })
            .catch((non) => {
				res.send(403,{errors: non})
			});
    }
    
};

