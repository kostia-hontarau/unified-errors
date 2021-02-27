class UnifiedError extends Error {
  constructor(errorCode, message, meta) {
    super(message);

    this.errorCode = errorCode;
    this.name = this.constructor.name;
    this.meta = meta;
  }
}

module.exports = UnifiedError;
