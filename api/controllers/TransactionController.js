/**
 * TransactionController
 *
 * @description :: Server-side logic for managing transactions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    topup: function(req,res){
        try{            
            // console.log(req)
            transaction.create(req.allParams(), function (err, trans){
                if (!trans){res.send(403, 'transaction cancelled')};
                trans.transaction_ref = 'top-up11';
                // card.findOne(req.param.card_ID).then((cad) =>{
                //     console.log(cad);
                //     cad.balance += trans.transaction_amount;
                // })
                res.send(201, 'trans')
            })
        }catch(e){
            res.send(e);
        }
    }
	
};

