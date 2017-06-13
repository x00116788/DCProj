/**
 * Transaction.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    transaction_ref:{type: 'string',
                      defaultsTo: ' ' },
    transaction_amount:{type:'FLOAT',
                    required:true
                  },
    rate: {type: 'FLOAT'},
    currency:{type:'string',
              required:true    
            },
    card_ID:{model:'Card'},
    description:{type:'string',
                  defaultsTo: ' '},
    date: {type: 'date'},
    status:{type:'string',
            enum:['approved','rejected', 'unknown'],
            defaultsTo: 'unknown'
            },
    direction:{type:'string',
                enum:['IN', 'OUT', 'unknown'],
                defaultsTo: 'unknown'}
  },
  toJSON: function() {
      var obj = this.toObject();
      delete obj.auth;
      // delete obj.updatedAt;
      return obj;
    },
};

