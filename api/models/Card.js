/**
 * Card.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    cardID: {type: 'INTEGER',
            primaryKey: true },
    owner: {model:'Customer'},
    cvv: {type: 'INTEGER',
          required: true},
    last_name: {type:'STRING',
              required: true},
    issue_date: {type: 'INTEGER',
                type: 'date',
                required: true},
    expiry_date: {type: 'INTEGER',
                type: 'date',
                required: true}

  }
};

