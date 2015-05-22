import sw from 'swagger-node-express';

export var getOne = {
  spec: {
    description: 'Retrieve a single competition by its ID',
    path: '/competitions/{competitionId}',
    method: 'GET',
    summary: 'Retrieve a single competition by its ID',
    type: 'Competition',
    nickname: 'getOneCompetition',
    produces: [ 'application/json' ],
    parameters: [ sw.paramTypes.path( 'competitionId', 'Competition ID', 'string' ) ],
    responseMessages: [ sw.errors.invalid( 'id' ), sw.errors.notFound( 'Competition' ) ]
  },
  action: function ( req, res ) {
    throw sw.errors.notFound( 'Competition', res );
  }
};

