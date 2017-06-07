'use srict';
let http = require('http'),
    fee = 1;// 1europer transaction out

module.exports = {
    
    exchange: function(from, to){

        let promise = new Promise( (fulfill, reject) => {
            try{
                http.get('http://free.currencyconverterapi.com/api/v3/convert?q='+ from + '_' + to + '&compact=ultra', (chunk) =>{
                chunk.on('data', (returnedRate) =>{

                    fulfill(JSON.parse(returnedRate));
                })
            })
            }catch(err){reject(err, 'endpoint error')}            
        })
        return promise;
    },

    topup: function(){
        let topupPromise = new Promise( (fulfill, reject) => {
            try {
                this.getOne(id).then((one) =>{
                    if (one === '404, No Card Found'){
                        reject(one);
                    }
                    one.balance += amount;
                    one.save(function(err) {
                        if (err){reject(err)}
                        else fulfill('top-up sucessful')
                    })
                })
                return topupPromise;
            }catch(err) {console.log(err)}
        })

    },

    getOne: function(id){
        let onePromise = new Promise((res,rej) => {
            Card.findOne(id, (err, card) => {
                if(card){
                    res(card);
                    }
                 else{
                    rej('404, No Card Found');
                };
            });
        });
        return onePromise;
    }
}