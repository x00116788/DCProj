
'use srict';

module.exports = {

validateOne: function(params){
        let validPromise = new Promise((fulfill, reject) => {
            Customer.findOne({email: params.email})
            .exec(function (err,customer){
                if (err) {
                    reject (err);
                    }
                if (!customer || customer.password != params.password )
                    { 
                    reject ('Not a valid customer! ')
                }
                else{ 
                    fulfill(Customer) } 
            })
        })
        return validPromise;
    },

    
};