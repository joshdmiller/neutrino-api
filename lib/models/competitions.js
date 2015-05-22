var Competition = {
  id: 'Competition',
  required: [ 'id', 'name' ],
  properties: {
    id: {
      type: 'string',
      description: 'Unique identifier'
    },
    name: {
      type: 'string',
      description: 'Name of the competition'
    }
  }
};

export default Competition;

