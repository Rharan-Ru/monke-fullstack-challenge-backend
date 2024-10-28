export class CustomError extends Error {
  status: number;
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'CustomError';
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}