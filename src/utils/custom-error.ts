export class CustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly code?: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'CustomError';
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}