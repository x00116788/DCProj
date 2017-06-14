'use srict';
let http = require('http'),
    fee = 1;// 1europer transaction out
module.exports = {
    
    exchange: function(from){

        let promise = new Promise( (fulfill, reject) => {
            http.get('http://free.currencyconverterapi.com/api/v3/convert?q='+ from + '_EUR&compact=ultra', (chunk) =>{
                chunk.on('data', (returnedRate) =>{
                    fulfill(returnedRate)
                })
            })         
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
                    let balance = card.balance,
                        new_card_balance = balance + Number(params.transaction_amount);
                    Transaction.create({
                        transaction_ref : "Top-up " + card.id + ' ' + new Date().toISOString(),
                        description : 'top-up balance',
                        direction : 'IN',
                        status : 'Approved',
                        transaction_amount : params.transaction_amount,
                        currency : card.currency,
                        card_ID : card,
                        date: new Date().toISOString(),
                        old_balance : balance,
                        new_balance : new_card_balance 
                    }).exec( function (err, trans){
                        if (err){reject(err)}
                        else if (!trans){ 
                            reject ('error occured')
                        }
                        else{                            
                            card.balance += Number(params.transaction_amount);
                            card.save();
                            let success = {
                            'reference': trans.transaction_ref,
                            'message': 'success',
                            'topup amount': params.transaction_amount + ' ' + card.currency,
                            'previous balance': balance,
                            'new balance': card.balance
                            }
                            fulfill (success); 
                            // console.log(trans);
                        }                        
                    });                    
                } 
            });  
        }) 
        return topupPromise;            

    },

    quick_topup: function(params){
        let topupPromise = new Promise( (fulfill, reject) => {
            Card.findOne({
                cardNumber:params.cardNumber
                }).exec(function (err, card){
                if (err) {
                    reject (err);
                }
                if (!card || card.cvv !=params.cvv || card.status != 'Active')//|| card.expiry_date != req.allParams.expiry_date )
                { 
                    reject ('invalid card')
                }
                let balance = card.balance,
                    new_card_balance = balance + Number(params.transaction_amount);
                Transaction.create({
                    transaction_ref : "Top-up " + card.id + ' ' + new Date().toISOString(),
                    description : 'top-up balance',
                    direction : 'IN',
                    status : 'Approved',
                    transaction_amount : params.transaction_amount,
                    currency : card.currency,
                    card_ID : card,
                    date: new Date().toISOString(),
                    old_balance : balance,
                    new_balance : new_card_balance 
                }).exec( function (err, trans){
                    if (err){reject(err)}
                    else if (!trans){ 
                        reject ('error occured')
                    }
                    else{                            
                        card.balance += Number(params.transaction_amount);
                        card.save();
                        let success = {
                        'reference': trans.transaction_ref,
                        'message': 'success',
                        'topup amount': params.transaction_amount + ' ' + card.currency,
                        'previous balance': balance,
                        'new balance': card.balance
                        }
                        fulfill (success); 
                    }                        
                });                    
                })
            });  
        return topupPromise;            

    },

    spend: function(params, xrate){
        let spendPromise = new Promise( (fulfill, reject) => {
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
                Transaction.create(params, function (err, trans){
                   if (err){
                       reject(err)
                    }
                    if (!trans){ 
                        reject ('error occured')
                    }
                    else{
                        console.log(card.balance);
                        trans.transaction_ref = "Debit " + card.id + ' ' + new Date().toISOString();
                        trans.description = params.merchant;
                        trans.rate = xrate;
                        trans.direction = 'OUT';
                        trans.status = 'Accepted';
                        trans.date = new Date();
                        card.balance -= Number(params.transaction_amount * xrate) + fee;
                        card.save();
                        trans.balance = card.balance;
                        trans.save();
                        console.log(card.balance);                        
                        fulfill (trans); 
                    }

                })
            })
        })
        return spendPromise
    }
}