# Unified Errors

A declarative error handling library for Node.js that generates TypeScript error classes at build time.

## Features

- **Declarative Error Definition**: Define all errors in a single `.errors.js` file
- **Build-Time Generation**: Generate TypeScript classes at build time (no runtime code execution)
- **Type Safety**: Full TypeScript support with generated types
- **Hierarchical Organization**: Support for nested error structures
- **Error Conversion**: Built-in utilities for converting errors to different formats
- **CLI Tool**: Command-line interface for generating error classes

## Installation

```bash
npm install --save-dev unified-errors-generator
```

## Quick Start

### 1. Create Error Declarations

Create a `.errors.js` file in your project root:

```javascript
// .errors.js
module.exports = {
  ApplicationError: {
    code: "application",
    children: {
      ValidationError: {
        code: "validation",
        children: {
          InvalidEmail: {
            code: "invalid_email",
            isDefault: true,
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
      }
    }
  }
};
```

**Note**: Error codes are concatenable and form hierarchical paths. For example:
- `InvalidEmail` error code becomes: `application.validation.invalid_email`
- `InvalidCredentials` error code becomes: `application.authentication.invalid_credentials`
- `ConnectionFailed` error code becomes: `database.connection_failed`

### 2. Generate Error Classes

```bash
# Generate error classes
npx unified-errors generate
```

### 3. Use Generated Errors

```typescript
// src/services/user-service.ts
import { errors } from '../generated/errors';

export class UserService {
  async createUser(email: string, password: string) {
    if (!this.isValidEmail(email)) {
      throw new errors.InvalidEmail('Invalid email format', {
        email,
        field: 'email'
      });
    }
    
    if (!this.isValidPassword(password)) {
      throw new errors.InvalidPassword('Password too weak', {
        field: 'password',
        requirements: ['minLength', 'uppercase', 'number']
      });
    }
    
    try {
      await this.db.createUser({ email, password });
    } catch (dbError) {
      throw new errors.ConnectionFailed('Database connection failed', {
        originalError: dbError,
        operation: 'createUser'
      });
    }
  }
}
```

## Concatenable Error Codes

The unified-errors library uses a hierarchical error code system where error codes are built by concatenating all parent error codes with dots. This provides several benefits:

### How It Works

1. **Simple Error Codes**: Each error defines a simple code segment (e.g., "validation", "invalid_email")
2. **Hierarchical Building**: The final error code is built by traversing up the hierarchy
3. **Consistent Naming**: All error codes follow the same pattern

### Examples

```javascript
// Error declaration
ApplicationError: {
  code: "application",
  children: {
    ValidationError: {
      code: "validation", 
      children: {
        InvalidEmail: {
          code: "invalid_email"
        }
      }
    }
  }
}

// Final error codes:
// InvalidEmail -> "application.validation.invalid_email"
// ValidationError -> "application.validation"
// ApplicationError -> "application"
```

### Benefits

- **Clear Hierarchy**: Error codes clearly show the error's position in the hierarchy
- **Easy Filtering**: You can filter errors by prefix (e.g., all "application.validation.*" errors)
- **Consistent Structure**: All error codes follow the same naming pattern
- **Namespace Separation**: Different error categories are clearly separated

## Unified Constructor Pattern

The unified-errors library uses a consistent constructor pattern across all error classes to maintain type safety and simplify error handling:

### Constructor Arguments

All error classes use the same constructor signature:
```typescript
constructor(message: string, meta?: Record<string, unknown>)
```

### Error Code Propagation

Error codes are propagated through the inheritance chain using different strategies:

1. **BaseError Children**: Direct children of BaseError pass the full error code as the first argument
2. **Nested Children**: Further children use `_errorCodeOverride` in the meta object to propagate the full error code

### Example

```typescript
// Generated error classes
export class ApplicationError extends BaseError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super('application', message, meta); // Full code passed as first argument
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: (meta && meta._errorCodeOverride) || 'application.validation'
    }); // Full code passed via _errorCodeOverride
  }
}

export class InvalidEmail extends ValidationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, {
      ...meta,
      _errorCodeOverride: (meta && meta._errorCodeOverride) || 'application.validation.invalid_email'
    }); // Full code passed via _errorCodeOverride
  }
}
```

### Benefits

- **Type Safety**: All errors have the same constructor signature
- **Consistent API**: Developers don't need to remember different constructor patterns
- **Flexible Meta**: The meta object can contain additional context and overrides
- **Error Code Override**: Allows runtime modification of error codes when needed

## CLI Usage

### Generate Error Classes

```bash
# Basic generation
npx unified-errors generate

# With custom options
npx unified-errors generate \
  --config .errors.js \
  --output src/generated \
  --template typescript
```

### Options

- `-c, --config <path>`: Path to error declarations file (default: `.errors.js`)
- `-o, --output <path>`: Output directory for generated files (default: `src/generated`)
- `-t, --template <name>`: Template to use (default: `typescript`)

## Generated Files

The CLI generates the following files:

```
src/generated/
├── errors.ts          # Generated error classes
├── error-types.ts     # TypeScript type definitions
├── error-helpers.ts   # Helper functions
└── index.ts           # Main export
```

### Generated Error Classes

```typescript
// src/generated/errors.ts
import { BaseError } from '../core/base-error';

export class ApplicationError extends BaseError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super('application', message, meta);
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super('validation', message, meta);
  }
}

export class InvalidEmail extends ValidationError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super('invalid_email', message, meta);
  }
  
  static converters = [{
    type: "http",
    payload: { status: 400, exposeMessage: true }
  }];
}

// Main export object
export const errors = {
  ApplicationError,
  ValidationError,
  InvalidEmail,
  // ... other errors
};
```

**Note**: The final error code for `InvalidEmail` would be `application.validation.invalid_email`, built by concatenating all parent error codes.

## Error Declaration Format

### Basic Error

```javascript
{
  MyError: {
    code: "my_error"
  }
}
```

### Error with Children

```javascript
{
  ParentError: {
    code: "parent",
    children: {
      ChildError: {
        code: "child"
      }
    }
  }
}
```

### Error with Converters

```javascript
{
  ApiError: {
    code: "api",
    converters: [{
      type: "http",
      payload: { 
        status: 500, 
        exposeMessage: false 
      }
    }]
  }
}
```

### Default Error

```javascript
{
  ApplicationError: {
    code: "application",
    children: {
      ValidationError: {
        code: "validation",
        children: {
          InvalidInput: {
            code: "invalid_input",
            isDefault: true  // Mark as default error
          }
        }
      }
    }
  }
}
```

## Error Handling

### Type-Safe Error Handling

```typescript
import { errors } from '../generated/errors';

try {
  await someOperation();
} catch (error) {
  if (error instanceof errors.InvalidEmail) {
    // TypeScript knows this is an InvalidEmail error
    console.log(error.errorCode); // 'application.validation.invalid_email'
    console.log(error.meta); // { email: '...', field: 'email' }
  }
}
```

### HTTP Error Handling

```typescript
import { errors } from '../generated/errors';
import { DefaultHttpResponseConverter } from 'unified-errors';

const httpConverter = new DefaultHttpResponseConverter('Internal server error');

export function errorHandler(error: Error, req: Request, res: Response) {
  if (error instanceof errors.BaseError) {
    const converters = (error.constructor as any).converters;
    
    if (converters) {
      const httpConverter = converters.find((c: any) => c.type === 'http');
      if (httpConverter) {
        return res.status(httpConverter.payload.status).json({
          error: httpConverter.payload.exposeMessage ? error.message : 'Error occurred'
        });
      }
    }
  }
  
  return res.status(500).json({ error: 'Internal server error' });
}
```

## Package.json Configuration

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "generate-errors": "unified-errors generate",
    "build": "npm run generate-errors && tsc",
    "dev": "npm run generate-errors && ts-node-dev src/index.ts"
  }
}
```

## Migration from Runtime Generation

### Before (Runtime Generation)

```typescript
// Old approach - UNSAFE
import { errors } from 'unified-errors';
// errors are generated at runtime using safer-eval
```

### After (Build-Time Generation)

```typescript
// New approach - SAFE
import { errors } from './generated/errors';
// errors are static classes generated at build time
```

## Benefits

### ✅ Security
- **No runtime code execution**
- **No eval/safer-eval**
- **Static analysis possible**

### ✅ Performance
- **No runtime overhead**
- **Fast startup time**
- **Optimized bundle size**

### ✅ Developer Experience
- **Full TypeScript IntelliSense**
- **Source maps work correctly**
- **Easy debugging**
- **IDE support for refactoring**

### ✅ Maintainability
- **Single source of truth** (`.errors.js`)
- **Automatic regeneration**
- **Version control friendly**

## API Reference

### CLI Commands

- `unified-errors generate`: Generate error classes from declarations

### Generated Exports

- `errors`: Object containing all generated error classes
- `errorDeclarations`: Original error declarations for runtime use
- `GeneratedErrors`: TypeScript type for all generated errors
- `ErrorNames`: TypeScript type for error names

### Utilities

- `withDefaultError`: Wrap functions with default error handling
- `DefaultHttpResponseConverter`: Convert errors to HTTP responses
- `getDefaultError`: Get the default error class
- `getErrorDeclarationByName`: Get error declaration by name

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT
