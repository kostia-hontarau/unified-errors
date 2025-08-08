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
            code: "invalid_email",
            converters: [{
              type: "http",
              payload: { status: 400, exposeMessage: true }
            }]
          },
          InvalidPassword: {
            code: "invalid_password",
            converters: [{
              type: "http",
              payload: { status: 400, exposeMessage: false }
            }]
          },
          InvalidInput: {
            code: "invalid_input",
            converters: [{
              type: "http",
              payload: { status: 400, exposeMessage: true }
            }]
          }
        }
      },
      AuthenticationError: {
        code: "authentication",
        children: {
          InvalidCredentials: {
            code: "invalid_credentials",
            converters: [{
              type: "http",
              payload: { status: 401, exposeMessage: false }
            }]
          },
          TokenExpired: {
            code: "token_expired",
            converters: [{
              type: "http",
              payload: { status: 401, exposeMessage: true }
            }]
          }
        }
      },
      AuthorizationError: {
        code: "authorization",
        children: {
          InsufficientPermissions: {
            code: "insufficient_permissions",
            converters: [{
              type: "http",
              payload: { status: 403, exposeMessage: false }
            }]
          }
        }
      }
    }
  },
  DatabaseError: {
    code: "database",
    children: {
      ConnectionFailed: {
        code: "connection_failed",
        converters: [{
          type: "http",
          payload: { status: 503, exposeMessage: false }
        }]
      },
      QueryFailed: {
        code: "query_failed",
        converters: [{
          type: "http",
          payload: { status: 500, exposeMessage: false }
        }]
      }
    }
  }
}; 