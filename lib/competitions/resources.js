var offset = {
  name: 'offset',
  in: 'query',
  description: 'Index at which to start returning data from the search results (0-indexed).',
  required: false,
  type: 'integer',
  format: 'int32',
  default: 0,
  minimum: 0
};

var limit = {
  name: 'limit',
  in: 'query',
  description: 'Number of results to return',
  required: false,
  type: 'integer',
  format: 'int32',
  default: 0,
  minimum: 0,
  maximum: 25
};

var NotFoundError = {
  description: 'Not Found',
  schema: {
    $ref: 'Error'
  }
};

var BadRequestError = {
  description: 'Bad Request',
  schema: {
    $ref: 'Error'
  }
};

var ServerError = {
  description: 'Server Error',
  schema: {
    $ref: 'Error'
  }
};

export var collection = {
  get: {
    summary: 'Retrieve all competitions',
    operationId: 'competitions#get',
    description: 'Retrieve all competitions',
    parameters: [ offset, limit ],
    tags: [ 'Competitions' ],
    responses: {
      200: {
        description: 'An array of competitions',
        schema: { $ref: 'Competitions' }
      },
      400: BadRequestError,
      500: ServerError
    }
  },

  post: {
    summary: 'Create a new competition',
    operationId: 'competitions#create',
    description: 'Create a new competition',
    nickname: 'createCompetition',
    produces: [ 'application/json' ],
    parameters: [{
      name: 'body',
      in: 'body',
      description: 'Competition definition',
      required: true,
      schema: { $ref: 'NewCompetition' }
    }],
    tags: [ 'Competitions' ],
    responses: {
      200: {
        description: 'The newly-created competition',
        schema: { $ref: 'Competition' }
      },
      400: BadRequestError,
      500: ServerError
    }
  }
};

export var element = {
  get: {
    summary: 'Retrieve a single competition by its ID',
    operationId: 'competitions#getOne',
    description: 'Retrieve a single competition by its ID',
    parameters: [{
      name: 'competitionId',
      in: 'path',
      description: 'The competition ID',
      required: true,
      type: 'string'
    }],
    tags: [ 'Competitions' ],
    responses: {
      200: {
        description: 'The requested competition',
        schema: { $ref: 'Competition' }
      },
      404: NotFoundError,
      500: ServerError
    }
  },

  put: {
    summary: 'Update an existing competition',
    operationId: 'competitions#updateOne',
    description: 'Update an existing competition',
    parameters: [{
      name: 'competitionId',
      in: 'path',
      description: 'The competition ID',
      required: true,
      type: 'string'
    }],
    tags: [ 'Competitions' ],
    responses: {
      200: {
        description: 'The requested competition',
        schema: { $ref: 'Competition' }
      },
      400: BadRequestError,
      404: NotFoundError,
      500: ServerError
    }
  },

  delete: {
    summary: 'Delete a single competition by its ID',
    operationId: 'competitions#deleteOne',
    description: 'Delete a single competition by its ID',
    parameters: [{
      name: 'competitionId',
      in: 'path',
      description: 'The competition ID',
      required: true,
      type: 'string'
    }],
    tags: [ 'Competitions' ],
    responses: {
      200: {
        description: 'Empty response'
      },
      404: NotFoundError,
      500: ServerError
    }
  }
};

