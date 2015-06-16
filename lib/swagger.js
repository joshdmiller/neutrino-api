import * as competitionResources from './competitions/resources';
import * as competitionModels from './competitions/models';

var spec = {
  swagger: 2.0,
  info: {
    title: 'Trivia App',
    description: 'An as-yet-unnamed party trivia application.',
    contact: {
      name: 'Josh David Miller',
      email: 'josh@joshdavidmiller.com'
    },
    license: {
      name: 'MIT',
      url: ''
    },
    version: '0.0.1'
  },
  host: '',
  schemes: [],
  basePath: '/v1',
  consumes: [ 'application/json' ],
  produces: [ 'application/json' ],
  responses: {},

  paths: {
    '/competitions': competitionResources.collection,
    '/competitions/{competitionId}': competitionResources.element
  },

  definitions: {
    Error: {
      type: 'object',
      properties: {
        code: {
          type: 'integer',
          format: 'int32'
        },
        message: {
          type: 'string'
        },
        fields: {
          type: 'object'
        }
      },
      required: ['code', 'message']
    }
  },

  parameters: {
    offset: {
      name: 'offset',
      in: 'query',
      description: 'Index at which to start returning data from the search results (0 based)',
      required: false,
      type: 'integer',
      format: 'int32',
      default: 0,
      minimum: 0
    },

    limit: {
      name: 'limit',
      in: 'query',
      description: 'Number of results to return',
      required: false,
      type: 'integer',
      format: 'int32',
      default: 100,
      minimum: 0,
      maximum: 50
    }
  }
};

/**
 * Add in all the externally-defined models.
 */
[ competitionModels ].forEach( function ( models ) {
  Object.keys( models ).forEach( function ( model ) {
    spec.definitions[ model ] = models[ model ];
  });
});

export default spec;
