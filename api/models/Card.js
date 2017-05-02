/**
 * Card.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    cardID:     {type: 'INTEGER',
                 primaryKey: true
                },
    owner:      {model:'Customer'},
    cvv:        {type: 'INTEGER',
                 minLength:3,
                 maxLength:3
                },
    issue_date: {type: 'date',
                },
    expiry_date:{type: 'date',
                },
      currency: {type:'string',
                 enum:['USD', 'EUR', 'GBP'],
                 required:true
                },
      balance:  {type: 'float',
                 max:400,
                 required: true
                },
        status: {type: 'string',
                 enum:['pending','Approved', 'suspended']
                }
                
  }
};

