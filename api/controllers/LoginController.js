/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	login: function (inputs, cb) {
    Customer.findOne({
      email: inputs.email,
      password: inputs.password
    })
    .exec(cb);
  }
};

