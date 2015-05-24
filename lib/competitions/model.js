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
    },
    created_at: {
      type: 'string',
      format: 'dateTime',
      description: 'The date and time the competition was created.'
    },
    updated_at: {
      type: 'string',
      format: 'dateTime',
      description: 'The date and time the competition was last updated.'
    },
    competitors: {
      type: 'array',
      description: 'The IDs of the competitors participating in this competition.',
      items: {
        type: 'string'
      }
    },
    cnt_placements: {
      type: 'integer',
      format: 'int32',
      description: 'The maximum number of competitors to place. If undefined, all will place.'
    },
    rounds: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The friendly name assigned to this round. Defaults to "Round <#>".'
          },
          challenges: {
            type: 'array',
            description: 'The IDs of the challenges associated with this round.',
            items: {
              type: 'string'
            }
          },
          is_complete: {
            type: 'boolean',
            description: 'An indicator of whether this round is completed or not.'
          }
        }
      }
    }
  }
};

export default Competition;

