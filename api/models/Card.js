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
