var definitions = {
  Competition: {
    type: 'object',
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
  },

  NewCompetition: {
    type: 'object',
    required: [ 'name' ],
    properties: {
      id: {
        type: 'string',
        description: 'Unique identifier'
      },
      name: {
        type: 'string',
        description: 'Name of the competition'
      },
      cnt_rounds: {
        type: 'integer',
        format: 'int32',
        description: 'The number of rounds in this competition.',
        default: 1,
        minimum: 1,
        maximum: 10
      },
      cnt_placements: {
        type: 'integer',
        format: 'int32',
        description: 'The maximum number of competitors to place. If undefined, all will place.',
        default: 3,
        minimum: 0,
        maximum: 100
      }
    }
  },

  Competitions: {
    type: 'object',
    properties: {
      total_rows: {
        type: "integer",
        format: "int64"
      },
      offset: {
        type: "integer",
        format: "int64"
      },
      rows: {
        type: "array",
        items: {
          $ref: 'Competition',
        }
      }
    }
  }
};

export default definitions;

