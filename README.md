# unified-errors

A TypeScript library for declarative error handling in Node.js applications.

## Installation

```bash
npm install --save-dev unified-errors
```

## Quick Start

### 1. Create Error Declarations

Create a `.errors.js` file in your project root:

```javascript
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
          }
        }
      }
    }
  }
};
```

### 2. Generate Error Classes

```bash
npx unified-errors generate
```

### 3. Use Generated Errors

```typescript
import { errors } from './errors';

// Use the generated error classes
throw new errors.InvalidEmail('Invalid email format', {
  email: 'test@example.com'
});
```

## CLI Usage

```bash
# Generate with default options
npx unified-errors generate

# Generate with custom options
npx unified-errors generate --config .errors.js --output ./src/errors
```

## API

### Main Exports

- `generateErrors(options)`: Generate error classes from declarations
- `withDefaultError(func, DefaultErrorClass)`: Wrap functions with default error handling
- `DefaultHttpResponseConverter`: Convert errors to HTTP responses

### Generated Files

- `errors.ts`: Generated error classes
- `error-types.ts`: TypeScript type definitions
- `error-helpers.ts`: Helper functions
- `index.ts`: Main export file

## Error Declaration Format

```javascript
{
  ErrorName: {
    code: "error_code",
    children: {
      // Nested errors
    },
    converters: [{
      type: "http",
      payload: { status: 400, exposeMessage: true }
    }]
  }
}
```

## License

MIT
