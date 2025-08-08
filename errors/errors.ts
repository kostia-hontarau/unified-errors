
// Auto-generated file - DO NOT EDIT
// Generated from .errors.js on 2025-08-08T15:09:57.108Z
import { UnifiedError } from "./error-types";

export class BaseError extends Error implements UnifiedError {
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
    super(['application', meta?._errorCodeOverride].filter(Boolean).join('.'), message, meta);
  }
  
}

export class ValidationError extends ApplicationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: ['validation', meta?._errorCodeOverride].filter(Boolean).join('.')
    });
  }
  
}

export class InvalidEmail extends ValidationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: ['invalid_email', meta?._errorCodeOverride].filter(Boolean).join('.')
    });
  }
  
}

export class InvalidPassword extends ValidationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: ['invalid_password', meta?._errorCodeOverride].filter(Boolean).join('.')
    });
  }
  
}

export class InvalidInput extends ValidationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: ['invalid_input', meta?._errorCodeOverride].filter(Boolean).join('.')
    });
  }
  
}

export class AuthenticationError extends ApplicationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: ['authentication', meta?._errorCodeOverride].filter(Boolean).join('.')
    });
  }
  
}

export class InvalidCredentials extends AuthenticationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: ['invalid_credentials', meta?._errorCodeOverride].filter(Boolean).join('.')
    });
  }
  
}

export class TokenExpired extends AuthenticationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: ['token_expired', meta?._errorCodeOverride].filter(Boolean).join('.')
    });
  }
  
}

export class AuthorizationError extends ApplicationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: ['authorization', meta?._errorCodeOverride].filter(Boolean).join('.')
    });
  }
  
}

export class InsufficientPermissions extends AuthorizationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: ['insufficient_permissions', meta?._errorCodeOverride].filter(Boolean).join('.')
    });
  }
  
}

export class DatabaseError extends BaseError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(['database', meta?._errorCodeOverride].filter(Boolean).join('.'), message, meta);
  }
  
}

export class ConnectionFailed extends DatabaseError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: ['connection_failed', meta?._errorCodeOverride].filter(Boolean).join('.')
    });
  }
  
}

export class QueryFailed extends DatabaseError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: ['query_failed', meta?._errorCodeOverride].filter(Boolean).join('.')
    });
  }
  
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
            "code": "invalid_email"
          },
          "InvalidPassword": {
            "code": "invalid_password"
          },
          "InvalidInput": {
            "code": "invalid_input"
          }
        }
      },
      "AuthenticationError": {
        "code": "authentication",
        "children": {
          "InvalidCredentials": {
            "code": "invalid_credentials"
          },
          "TokenExpired": {
            "code": "token_expired"
          }
        }
      },
      "AuthorizationError": {
        "code": "authorization",
        "children": {
          "InsufficientPermissions": {
            "code": "insufficient_permissions"
          }
        }
      }
    }
  },
  "DatabaseError": {
    "code": "database",
    "children": {
      "ConnectionFailed": {
        "code": "connection_failed"
      },
      "QueryFailed": {
        "code": "query_failed"
      }
    }
  }
};
