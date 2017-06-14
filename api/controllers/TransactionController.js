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
            TransactionService.topup(req.allParams()).then((topupPromise) => {
                res.send(topupPromise)
            })
            .catch((non) => {
				res.send(403,{error: non})
				});
            
        }catch(e){res.send(e)}        
    },

    spend: function(req,res){
        if (req.headers.auth === undefined || req.headers.auth != Auth){res.send(401, 'NOt Authenticated')}
        TransactionService.exchange(req.allParams().currency).then((rate) => {
            var xrate = rate.toString().match(/([0-9]*[.])?[0-9]+/);
                console.log(xrate[0])
            if (isNaN(xrate[0]))
            {res.send(403, 'invalid currency')}
            else{
                try{
                    req.allParams().auth = undefined;
                    TransactionService.spend(req.allParams(), xrate[0]).then((spendPromise) => {
                        res.send(spendPromise)
                    })
                    .catch((non) => {
                        console.log(non)
                        res.send(403,{error: non})
                        });
                    
                }catch(e){res.send(e)}
            }
        })
        
    },

    quick_topup: function(req,res){
        if (req.headers.auth === undefined || req.headers.auth != Auth){res.send(401, 'NOt Authenticated')}
        try{
            req.allParams().auth = undefined;
            TransactionService.quick_topup(req.allParams()).then((topupPromise) => {
                res.send(topupPromise)
            })
            .catch((non) => {
				res.send(403,{error: non})
				});
            
        }catch(e){res.send(e)}    

    },

	
};

