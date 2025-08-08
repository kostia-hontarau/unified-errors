export class BaseError extends Error {
  errorCode: string;
  meta?: Record<string, unknown>;

  constructor(
    errorCode: string,
    message: string,
    meta?: Record<string, unknown>
  ) {
    super(message);

    this.errorCode = errorCode;
    this.name = this.constructor.name;

    delete meta?._errorCodeOverride;
    this.meta = meta;
  }
}
