/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */
var standardTimeout = 5000,
    maxTimeout      = 29000;

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'static/index'

  },

  "POST  /customers": {controller: "CustomerController", action: "create", locals: {myTimeOut: standardTimeout}},

  "PATCH  /customers": {controller: "CustomerController", action: "patch", locals: {myTimeOut: standardTimeout}},

  "POST  /topup": {controller: "TransactionController", action: "topup", locals: {myTimeOut: standardTimeout}},

  "POST  /quicktopup": {controller: "TransactionController", action: "quick_topup", locals: {myTimeOut: standardTimeout}},

  "POST /login":  {controller: "CustomerController", action: "login", locals: {myTimeOut: standardTimeout}},

  "GET /balance": {controller: "CardController", action: "balance", locals: {myTimeOut: standardTimeout}},

  "POST  /spend": {controller: "TransactionController", action: "spend", locals: {myTimeOut: standardTimeout}},


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};