/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {type: 'INTEGER',
        primaryKey: true },
    first_name: {type:'STRING',
                required: true},
    last_name: {type:'STRING',
              required: true},
    email: {type: 'STRING',
            email: true,
            required: true,
            unique: true},
    address: {type: 'STRING',
            required: true},
    birth_date: {type: 'INTEGER',
                type: 'date',
                required: true},
    encryptedPassword: {type: 'STRING'},
    cards: {
      collection: 'Card',
      via: 'owner'
    }

  },

  beforeCreate: function(values,next){
      
      if (!values.password || values.password != values.confirmation){
          return next({err:["password doesn't match confirmation."]})
      }

      require('bcrypt').hash(values.password,10, function passwordEncrypted(err, encryptedPassword){
          if (err) return next(err);
          values.encryptedPassword = encryptedPassword;
          next();
      });

  }
  
};

