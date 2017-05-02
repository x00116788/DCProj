/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

//   schema: true,

  attributes: {
    id: {type: 'INTEGER',
        primaryKey: true },
    first_name: {type:'STRING',
                alphanumeric: true,
                required: true},
    last_name: {type:'STRING',
                alphanumeric: true,
                required: true},
    email: {type: 'STRING',
            email: true,
            required: true,
            unique: true},
    address: {type: 'STRING',
            required: true},
    birth_date: {type: 'date',
                required: true},
    encryptedPassword: {type: 'STRING',
                        password:true},
    cards: {
      collection: 'Card',
      via: 'owner'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.id;
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      // delete obj._csrf;
      return obj;
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

  },

  password: function(value) {
      // For all creates/updates of `User` records that specify a value for an attribute
      // which declares itself `type: 'password'`, that value must:
      // • be a string
      // • be at least 6 characters long
      // • contain at least one number
      // • contain at least one letter
      return _.isString(value) && value.length >= 6 && value.match(/[a-z]/i) && value.match(/[0-9]/);
    }
  
};

