// Sample error declarations for unified-errors library
// This file defines all error types in your application

module.exports = {
  ApplicationError: {
    code: "application",
    children: {
      ValidationError: {
        code: "validation",
        children: {
          InvalidEmail: {
            code: "invalid_email"
          },
          InvalidPassword: {
            code: "invalid_password"
          },
          InvalidInput: {
            code: "invalid_input"
          }
        }
      },
      AuthenticationError: {
        code: "authentication",
        children: {
          InvalidCredentials: {
            code: "invalid_credentials"
          },
          TokenExpired: {
            code: "token_expired"
          }
        }
      },
      AuthorizationError: {
        code: "authorization",
        children: {
          InsufficientPermissions: {
            code: "insufficient_permissions"
          }
        }
      }
    }
  },
  DatabaseError: {
    code: "database",
    children: {
      ConnectionFailed: {
        code: "connection_failed"
      },
      QueryFailed: {
        code: "query_failed"
      }
    }
  }
}; 