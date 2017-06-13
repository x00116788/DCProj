'use srict';
let http = require('http'),
    fee = 1;// 1europer transaction out
module.exports = {
    
    exchange: function(from){

        let promise = new Promise( (fulfill, reject) => {
            try{
                http.get('http://free.currencyconverterapi.com/api/v3/convert?q='+ from + '_EUR&compact=ultra', (chunk) =>{
                chunk.on('data', (returnedRate) =>{
                    let rr = returnedRate.toString().match(/([0-9]*[.])?[0-9]+/)
                    fulfill(JSON.parse(rr[0]));
                })
            })
            }catch(err){reject(err, 'endpoint error')}            
        })
        return promise;
    },

    topup: function(params){
        let topupPromise = new Promise( (fulfill, reject) => {
            Card.findOne(params.card_ID, (err, card) => {
                if (err){ reject (err)}
                else if (!card){ 
                    reject ('invalid card')
                }
                else{
                    if (params.transaction_amount <= 5){
                        reject ('top up amount below minimum')
                    }
                        // console.log(card);
                    Transaction.create(params, function (err, trans){
                        if (err){reject(err)}
                        else if (!trans){ 
                            reject ('error occured')
                        }
                        else{
                            trans.transaction_ref = "Top-up " + card.id + ' ' + new Date().toString();
                            trans.description = 'top-up balance';
                            trans.direction = 'IN';
                            trans.status = 'Accepted';
                            card.balance += Number(params.transaction_amount);
                            card.save();
                            trans.save();
                            // console.log(trans);
                            fulfill (trans);
                        }                        
                    });                    
                } 
            });  
        }) 
        return topupPromise;            

    },

    spend: function(params){
        let spendPromise = new Promise( (fulfill, reject) => {
        var balance;
            Card.findOne({
                cardNumber:params.cardNumber
                }).exec(function (err, card){
                if (err) {
                    reject (err);
                }
                if (!card || card.cvv !=params.cvv )//|| card.expiry_date != req.allParams.expiry_date )
                { 
                    reject ('invalid card')
                }
                balance = card.balance
                Transaction.create(params, function (err, trans){
                   if (err){
                       reject(err)
                    }
                    else if (!trans){ 
                        reject ('error occured')
                    }
                    else{
                        trans.transaction_ref = "Debit " + card.id + ' ' + new Date().toString();
                        trans.description = 'params.merchant';
                        trans.direction = 'OUT';
                        trans.status = 'Accepted';
                        card.balance -= Number(params.transaction_amount) + fee;
                        card.save()
                        trans.save();
                        console.log(trans);
                        let success = {
                            'reference': trans.transaction_ref,
                            'message': 'success',
                            'previous balance': balance,
                            'new balance': card.balance
                        }
                        fulfill (success); 
                    }

                })
            })
        })
        return spendPromise
    }
}