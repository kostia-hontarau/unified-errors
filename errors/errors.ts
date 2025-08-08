
// Auto-generated file - DO NOT EDIT
// Generated from .errors.js on 2025-08-08T14:36:13.261Z

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

export class ApplicationError extends BaseError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super('application', message, meta);
  }
  
}

export class ValidationError extends ApplicationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: [meta?._errorCodeOverride, 'validation'].join('.')
    });
  }
  
}

export class InvalidEmail extends ValidationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: [meta?._errorCodeOverride, 'invalid_email'].join('.')
    });
  }
  
  static converters = [
  {
    "type": "http",
    "payload": {
      "status": 400,
      "exposeMessage": true
    }
  }
];
}

export class InvalidPassword extends ValidationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: [meta?._errorCodeOverride, 'invalid_password'].join('.')
    });
  }
  
  static converters = [
  {
    "type": "http",
    "payload": {
      "status": 400,
      "exposeMessage": false
    }
  }
];
}

export class InvalidInput extends ValidationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: [meta?._errorCodeOverride, 'invalid_input'].join('.')
    });
  }
  
  static converters = [
  {
    "type": "http",
    "payload": {
      "status": 400,
      "exposeMessage": true
    }
  }
];
}

export class AuthenticationError extends ApplicationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: [meta?._errorCodeOverride, 'authentication'].join('.')
    });
  }
  
}

export class InvalidCredentials extends AuthenticationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: [meta?._errorCodeOverride, 'invalid_credentials'].join('.')
    });
  }
  
  static converters = [
  {
    "type": "http",
    "payload": {
      "status": 401,
      "exposeMessage": false
    }
  }
];
}

export class TokenExpired extends AuthenticationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: [meta?._errorCodeOverride, 'token_expired'].join('.')
    });
  }
  
  static converters = [
  {
    "type": "http",
    "payload": {
      "status": 401,
      "exposeMessage": true
    }
  }
];
}

export class AuthorizationError extends ApplicationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: [meta?._errorCodeOverride, 'authorization'].join('.')
    });
  }
  
}

export class InsufficientPermissions extends AuthorizationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: [meta?._errorCodeOverride, 'insufficient_permissions'].join('.')
    });
  }
  
  static converters = [
  {
    "type": "http",
    "payload": {
      "status": 403,
      "exposeMessage": false
    }
  }
];
}

export class DatabaseError extends BaseError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super('database', message, meta);
  }
  
}

export class ConnectionFailed extends DatabaseError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: [meta?._errorCodeOverride, 'connection_failed'].join('.')
    });
  }
  
  static converters = [
  {
    "type": "http",
    "payload": {
      "status": 503,
      "exposeMessage": false
    }
  }
];
}

export class QueryFailed extends DatabaseError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: [meta?._errorCodeOverride, 'query_failed'].join('.')
    });
  }
  
  static converters = [
  {
    "type": "http",
    "payload": {
      "status": 500,
      "exposeMessage": false
    }
  }
];
}


// Main export object
export const errors = {
  ApplicationError,
  ValidationError,
  InvalidEmail,
  InvalidPassword,
  InvalidInput,
  AuthenticationError,
  InvalidCredentials,
  TokenExpired,
  AuthorizationError,
  InsufficientPermissions,
  DatabaseError,
  ConnectionFailed,
  QueryFailed,
};

// Export declarations for runtime use
export const errorDeclarations = {
  "ApplicationError": {
    "code": "application",
    "children": {
      "ValidationError": {
        "code": "validation",
        "children": {
          "InvalidEmail": {
            "code": "invalid_email",
            "converters": [
              {
                "type": "http",
                "payload": {
                  "status": 400,
                  "exposeMessage": true
                }
              }
            ]
          },
          "InvalidPassword": {
            "code": "invalid_password",
            "converters": [
              {
                "type": "http",
                "payload": {
                  "status": 400,
                  "exposeMessage": false
                }
              }
            ]
          },
          "InvalidInput": {
            "code": "invalid_input",
            "converters": [
              {
                "type": "http",
                "payload": {
                  "status": 400,
                  "exposeMessage": true
                }
              }
            ]
          }
        }
      },
      "AuthenticationError": {
        "code": "authentication",
        "children": {
          "InvalidCredentials": {
            "code": "invalid_credentials",
            "converters": [
              {
                "type": "http",
                "payload": {
                  "status": 401,
                  "exposeMessage": false
                }
              }
            ]
          },
          "TokenExpired": {
            "code": "token_expired",
            "converters": [
              {
                "type": "http",
                "payload": {
                  "status": 401,
                  "exposeMessage": true
                }
              }
            ]
          }
        }
      },
      "AuthorizationError": {
        "code": "authorization",
        "children": {
          "InsufficientPermissions": {
            "code": "insufficient_permissions",
            "converters": [
              {
                "type": "http",
                "payload": {
                  "status": 403,
                  "exposeMessage": false
                }
              }
            ]
          }
        }
      }
    }
  },
  "DatabaseError": {
    "code": "database",
    "children": {
      "ConnectionFailed": {
        "code": "connection_failed",
        "converters": [
          {
            "type": "http",
            "payload": {
              "status": 503,
              "exposeMessage": false
            }
          }
        ]
      },
      "QueryFailed": {
        "code": "query_failed",
        "converters": [
          {
            "type": "http",
            "payload": {
              "status": 500,
              "exposeMessage": false
            }
          }
        ]
      }
    }
  }
};
