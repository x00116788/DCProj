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
            CardService.validateId(params).then((card) => {
                console.log(card);
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
                            console.log(trans);
                        }                        
                    });                    
            })
            .catch((non) => {
				reject (non)
				});
        }) 
        return topupPromise;            

    },

    quick_topup: function(params){
        let topupPromise = new Promise( (fulfill, reject) => {
            CardService.validateOne(params).then((card) => {
                if (!card || card.cvv != params.cvv || card.status != 'Active')
                { console.log('invalid card');
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
                      console.log('error card');
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
                    console.log(trans);
                        fulfill (success); 
                    }                        
                });                    
            })
            .catch((non) => {
                console.log(non);
				reject (non)
				});
        })
        return topupPromise;            

    },

    spend: function(params, xrate){
        let spendPromise = new Promise( (fulfill, reject) => {
            CardService.validateOne(params).then((card) => {
                if (!card || card.cvv != params.cvv || card.status != 'Active')
                { 
                    reject ('invalid card')
                }
                if ((params.transaction_amount * xrate) > (card.balance-1)){
                    reject('card rejected')}
                let balance = card.balance,
                    new_card_balance = balance - Number(params.transaction_amount * xrate + fee);
                Transaction.create({
                    transaction_ref : "Debit " + card.id + ' ' + new Date().toISOString(),
                    description : params.merchant,
                    direction : 'OUT',
                    status : 'Approved',
                    transaction_amount : params.transaction_amount,
                    currency : params.currency,
                    rate : xrate,
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
                        console.log(trans)        
                        card.balance -= Number(params.transaction_amount * xrate) + fee;
                        card.save();
                        let success = {
                        'reference': trans.transaction_ref,
                        'message': 'success'
                    }
                        console.log(trans)                  
                        fulfill (success); 
                    }
                })
            }).catch((non) => {
				reject (non)
				});
        })
        return spendPromise
    }
}