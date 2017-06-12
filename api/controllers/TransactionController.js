/**
 * TransactionController
 *
 * @description :: Server-side logic for managing transactions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Auth = 'Jvcdega6729DJS'
module.exports = {
    topup: function(req,res){
        if (req.headers.auth === undefined || req.headers.auth != Auth){res.send(401, 'NOt Authenticated')}
        try{
            req.allParams().auth = undefined;
            Card.findOne(req.allParams().card_ID, (err, card) => {
                if (err){ return res.json(err)}
                else if (!card){ return res.json('invalid card')}
                else{
                    if (req.allParams().transaction_amount <= 5){
                        res.send(403, 'top up amount below minimum')}
                        console.log(card);
                    Transaction.create(req.params.all(), function (err, trans){
                        if (err){res.send(err)}
                        else if (!trans){ return res.json('error occured')}
                        else{
                            trans.transaction_ref = "Top-up " + card.id + ' ' + new Date().toString();
                            trans.description = 'top-up balance';
                            trans.direction = 'IN';
                            trans.status = 'Accepted';
                            card.balance += Number(req.allParams().transaction_amount);
                            card.save()
                            trans.save();
                            console.log(trans);
                            res.send(201, trans)
                        }
                        
                });
                    
                }                
            })
        }catch(e){res.send(e)}        
    },

    spend: function(req,res){
        if (req.headers.auth === undefined || req.headers.auth != Auth){res.send(401, 'NOt Authenticated')}
        try{
            var amount;
            Card.findOne({
                cardNumber:req.allParams().cardNumber
                }).exec(function (err, card){
                if (err) {
                    return res.serverError(err);
                }
                if (!card || card.cvv != req.allParams().cvv )//|| card.expiry_date != req.allParams.expiry_date )
                { return res.json('invalid card')}

                card.balance -= req.allParams().transaction_amount;
                card.save()
                res.send( 201, card);
            });
            // Card.findOne(cardnumber: req.allParams().cardNumber, (err, card) => {
            //     console.log(card);
            //     if (!card || card.cvv != req.allParams().cvv || card.expiry_date != req.allParams.expiry_date )
            //     { res.send(400, 'invalid card')}
            //     // if (req.allParams().transaction_amount > (card.balance - 1)){
            //     //     res.send(403, 'card rejected')}
            //         // console.log(card);
            //     else{
            //         card.balance = Number(card.balance) - 1 - Number(req.allParams().transaction_amount);
            //     // card.save()
            //     Transaction.create(req.allParams(), function (err, trans){
            //         if (!trans){res.send(403, err)};
            //         trans.transaction_ref = card.id + trans.card_ID+new Date().toJSON;
            //         trans.description = 'credit' + req.allParams().merchant;
            //         trans.direction = 'OUT';
            //         trans.status = Accepted
            //         res.send(201, trans)
            //         })
            //     }                
            // })
        }catch(e){res.send(e)}
    },

    exchange: function(req,res){
        TransactionService.exchange('Eur',req.allParams().currency).then((ret) =>{
            let dd = toString(ret)
            res.send(201, ret);
        })
    }
	
};

