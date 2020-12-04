export class ApplicationError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ApplicationError.prototype);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
