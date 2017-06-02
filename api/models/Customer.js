/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

//   schema: true,

  attributes: {
    // id: {type: 'INTEGER',
    //     primaryKey: true },
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
      collection: 'card',
      via: 'owner'
    },

    toJSON: function() {
      var obj = this.toObject();
<<<<<<< HEAD
    //   delete obj.id;
=======
      delete obj.id;
>>>>>>> ac470dbbe0e21b3dfb98d4d6602cfc7d4acc6a33
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      // delete obj._csrf;
      return obj;
    }

<<<<<<< HEAD
=======

  },
>>>>>>> ac470dbbe0e21b3dfb98d4d6602cfc7d4acc6a33

  }

//   beforeCreate: function(values,next){
      
//       if (!values.password || values.password !== values.confirmation){
//           return next({err:["password doesn't match confirmation."]})
//       }

//       require('bcrypt').hash(values.password,10, function passwordEncrypted(err, encryptedPassword){
//           if (err) return next(err);
//           values.encryptedPassword = encryptedPassword;
//           next();
//       });

<<<<<<< HEAD
//   },

//   password: function(value) {
//       // For all creates/updates of `User` records that specify a value for an attribute
//       // which declares itself `type: 'password'`, that value must:
//       // • be a string
//       // • be at least 6 characters long
//       // • contain at least one number
//       // • contain at least one letter
//       return _.isString(value) && value.length >= 6 && value.match(/[a-z]/i) && value.match(/[0-9]/);
//     }
=======
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
>>>>>>> ac470dbbe0e21b3dfb98d4d6602cfc7d4acc6a33
  
};

