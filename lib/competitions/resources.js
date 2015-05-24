import sw from 'swagger-node-express';

export var get = {
  spec: {
    summary: 'Retrieve all competitions',
    description: 'Retrieve all competitions',
    path: '/competitions',
    method: 'GET',
    type: 'array',
    items: {
      $ref: 'Competition',
    },
    nickname: 'getCompetitions',
    produces: [ 'application/json' ]
  },
  action: function ( req, res ) {
    res.send([]);
  }
};

export var getOne = {
  spec: {
    summary: 'Retrieve a single competition by its ID',
    description: 'Retrieve a single competition by its ID',
    path: '/competitions/{competitionId}',
    method: 'GET',
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

export var create = {
  spec: {
    summary: 'Create a new competition',
    description: 'Create a new competition',
    path: '/competitions',
    method: 'POST',
    nickname: 'createCompetition',
    produces: [ 'application/json' ],
    parameters: [ sw.paramTypes.body( 'body', 'Competition definition', 'Competition' ) ],
    responseMessages: [ sw.errors.invalid( 'input' ) ]
  },
  action: function ( req, res ) {
    throw sw.errors.invalid( 'Competition', res );
  }
};

export var updateOne = {
  spec: {
    summary: 'Update an existing competition',
    description: 'Update an existing competition',
    path: '/competitions/{competitionId}',
    method: 'PUT',
    nickname: 'updateCompetition',
    produces: [ 'application/json' ],
    parameters: [
      sw.paramTypes.path( 'competitionId', 'Competition ID', 'string' ),
      sw.paramTypes.body( 'body', 'Competition definition', 'Competition' )
    ],
    responseMessages: [
      sw.errors.invalid( 'id' ),
      sw.errors.invalid( 'input' ),
      sw.errors.notFound( 'Competition' )
    ]
  },
  action: function ( req, res ) {
    throw sw.errors.notFound( 'Competition', res );
  }
};

export var deleteOne = {
  spec: {
    summary: 'Delete a single competition by its ID',
    description: 'Delete a single competition by its ID',
    path: '/competitions/{competitionId}',
    method: 'DELETE',
    type: 'Competition',
    nickname: 'deleteOneCompetition',
    produces: [ 'application/json' ],
    parameters: [ sw.paramTypes.path( 'competitionId', 'Competition ID', 'string' ) ],
    responseMessages: [ sw.errors.invalid( 'id' ), sw.errors.notFound( 'Competition' ) ]
  },
  action: function ( req, res ) {
    throw sw.errors.notFound( 'Competition', res );
  }
};

