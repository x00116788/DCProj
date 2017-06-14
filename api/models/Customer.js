/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

//  schema: true,

    // autosubscribe: ['destroy'],

  attributes: {
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
      via: 'owner',
      max:4
    },

    toJSON: function() {
      var obj = this.toObject();
    //  delete obj.id;
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      // delete obj._csrf;
      return obj;
    }
  },

  beforeCreate: function(values,next){
      
      if (!values.password || values.password !== values.confirmation){
          return next({err:["password doesn't match confirmation."]})
      }
      
      if (!values.password.length >= 8 || !values.password.match(/[a-z]/i) || !values.password.match(/[0-9]/) || !_.isString(values.password)){
        return next("Password must contain letter/s, number/s and atleast 8 characters long")
      }

      require('bcrypt').hash(values.password,10, function passwordEncrypted(err, encryptedPassword){
          if (err) return next(err);
          values.encryptedPassword = encryptedPassword;
          next();
      });

  },

  customValidation: function (req, callback) {
        this.validate(req.params.all(), callback);
    }
  

    /**
   * Check validness of a login using the provided inputs.
   *
   * @param  {Object}   inputs
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  // attemptLogin: function (inputs, cb) {
  //   Customer.findOne({
  //     email: inputs.email,
  //     password: inputs.password
  //   })
  //   .exec(cb);
  // }

};

