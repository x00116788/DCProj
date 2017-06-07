/**
 * TransactionController
 *
 * @description :: Server-side logic for managing transactions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Auth = 'Jvcdega6729DJS'
module.exports = {
    topup: function(req,res){
        if (req.allParams().auth === undefined || req.allParams().auth != Auth){res.send(401, 'NOt Authenticated')}
        try{
            req.allParams().auth = undefined;
            Card.findOne(req.allParams().card_ID, (err, card) => {
                if (err){res.json(err)}
                else if (!card){ res.send(400, 'invalid card')}
                else{
                    if (req.allParams().transaction_amount <= 5){
                        res.send(403, 'top up amount below minimum')}
                        console.log(card);
                    card.balance +=  Number(req.allParams().transaction_amount);
                    Transaction.create(req.allParams(), function (err, trans){
                        console.log(trans)
                        if (!trans){res.send(403, err)}
                        trans.transaction_ref = 'top-up'+trans.card_ID+new Date().toDateString();
                        trans.description = 'top-up balance';
                        trans.direction = 'IN';
                        trans.status = 'Accepted';
                        console.log(trans);
                        // trans.card_ID.update({balance:balance += trans.transaction_amount});
                        res.send(201, (trans,card.balance))
                    })
                }                
            })
        }catch(e){res.send(e)}        
    },

    spend: function(req,res){
        if (req.allParams().auth === undefined || req.allParams().auth != Auth){res.send(401, 'NOt Authenticated')}
        try{
            Card.findOne(req.allParams().cardNumber, (err, card) => {
                if (!card || card.cvv != req.allParams().cvv || card.expiry_date != req.allParams.expiry_date )
                // { res.send(400, 'invalid card')}
                if (req.allParams().transaction_amount > (card.balance-1)){
                    res.send(403, 'card rejected')}
                    // console.log(card);
                else{
                    card.balance = Number(card.balance) - 1 - Number(req.allParams().transaction_amount);
                // card.save()
                Transaction.create(req.allParams(), function (err, trans){
                    if (!trans){res.send(403, err)};
                    trans.transaction_ref = card.id + trans.card_ID+new Date().toJSON;
                    trans.description = req.allParams().merchant;
                    trans.direction = 'OUT';
                    trans.status = Accepted
                    res.send(201, trans)
                    })

                }
                
            })
        }catch(e){res.send(e)}
    },

    exchange: function(req,res){
        TransactionService.exchange('Eur',req.allParams().currency).then((ret) =>{
            let dd = toString(ret)
                        console.log(dd);

            res.send(201, ret);
        })
    }
	
};

