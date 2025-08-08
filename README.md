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
import { InvalidEmail } from './errors';

// Use the generated error classes
throw new InvalidEmail('Invalid email format', {
  userId: session.userId
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
  }
}
```

## License

MIT
