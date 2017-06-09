/**
 * Card.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
    owner:      {model:'customer',
                 required:true},
    cvv:        {type: 'INTEGER'
                  
                 },
    cardNumber: {type: 'INTEGER',
                  
                  unique: true},
    issue_date: {type: 'date'},
    expiry_date:{type: 'date'},
    currency: {type:'string',
                 enum:['USD', 'EUR', 'GBP'],
                 defaultsTo: 'EUR',},
    balance:  {type: 'FLOAT',
                 max:1500,
                 defaultsTo: 0,
                 required: true},
    status: {type: 'string',
              enum:['Cancelled','Active', 'Suspended'],
              defaultsTo: 'Active'
                },
    transactions: {collection: 'Transaction',
            via: 'card_ID'}
                
  },

  toJSON: function() {
      var obj = this.toObject();
      delete obj.cvv;
      delete obj.updatedAt;
      return obj;
    },

    balanceUpdate: function(amount){
      amount = Number(amount);
      this.balance += amount;
      
    }


};

