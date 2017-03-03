module.exports = {

  attributes: {
    id: {type: 'INTEGER',
        primaryKey: true },
    first_name: {type:'STRING',
                required: true},
    last_name: {type:'STRING',
              required: true},
    email: {type: 'STRING',
                required: true},
    address: {type: 'STRING',
            required: true},
    birth_date: {type: 'INTEGER',
                type: 'date',
                required: true},
    cards: {
      collection: 'Card',
      via: 'owner'
    }

  }
};
