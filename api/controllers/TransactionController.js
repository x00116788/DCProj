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

        try{
            req.allParams().auth = undefined;
            TransactionService.spend(req.allParams()).then((spendPromise) => {
                console.log(spendPromise);
                res.send(spendPromise)
            })
            .catch((non) => {
                console.log(non)
				res.send(403,{error: non})
				});
            
        }catch(e){res.send(e)}
    },

    exchange: function(req,res){
        TransactionService.exchange(req.allParams().currency).then((ret) =>{
            let dd = toString(ret)
            console.log('dd ' + dd)
            res.send(201, ret);
        })
    }
	
};

