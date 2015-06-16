export class BadRequestError extends Error {
  constructor ( msg ) {
    super( msg );
    this.msg = msg;
    this.statusCode = 400;
  }
}

export class NotFoundError extends Error {
  constructor ( msg ) {
    msg = msg || 'Not found';
    super( msg );
    this.msg = msg;
    this.statusCode = 404;
  }
}

