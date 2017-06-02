/**
 * Transaction.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    transaction_ref:{type: 'string',
                     primaryKey: true},
    transaction_amount:{type:'float',
                    required:true},
    card_ID:{model:'Card'},
    description:{type:'string'},
    status:{type:'string',
            enum:['approved','rejected']
            }

  }
};

