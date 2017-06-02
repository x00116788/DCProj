/**
 * Card.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
    owner:      {model:'customer'},
    cvv:        {type: 'INTEGER',
                 minLength:3,
                 maxLength:3},
    issue_date: {type: 'date'},
    expiry_date:{type: 'date'},
    currency: {type:'string',
                 enum:['USD', 'EUR', 'GBP'],
                 defaultsTo: 'EUR',
                 required:true},
    balance:  {type: 'float',
                 max:400,
                 defaultsTo: 0,
                 required: true},
    status: {type: 'string',
              enum:['pending','Approved', 'suspended'],
              defaultsTo: 'pending'
                },
    transactions: {collection: 'Transaction',
            via: 'card_ID'},
                
  },

  toJSON: function() {
      var obj = this.toObject();
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    }


};

