import debug from 'debug';

class Logger {
  constructor ( name ) {
    this._name = name;
    this._log = debug( `${name}->log` );
    this._warn = debug( `${name}->warn` );
    this._err = debug( `${name}->error` );
  }

  log ( ...args ) {
    this._log( ...args );
  }

  warn ( ...args ) {
    this._warn( ...args );
  }

  error ( ...args ) {
    this._err( ...args );
  }
}

export default Logger;

