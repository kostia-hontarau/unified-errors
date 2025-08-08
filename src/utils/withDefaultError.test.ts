import { BaseError } from "../core/base-error";
import { withDefaultError } from "./withDefaultError";

class SomeError extends BaseError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super("some", message, meta);
  }
}

describe("With Default Error adapter", () => {
  describe("Function adapter", () => {
    it("should run original function and return its result (sync)", async () => {
      const expectedResult = 2;
      const decoratedFunction = withDefaultError(
        (argument: unknown) => argument,
        SomeError
      );
      const [result] = await decoratedFunction(expectedResult);

      expect(result).toBe(expectedResult);
    });

    it("should run original function and return its result (async)", async () => {
      const expectedResult = 2;
      const decoratedFunction = withDefaultError(
        async (argument: unknown) => Promise.resolve(argument),
        SomeError
      );
      const [result] = await decoratedFunction(expectedResult);

      expect(result).toBe(expectedResult);
    });

    it("should wrap error thrown in the original function (sync)", async () => {
      const message = "Some message";
      try {
        const decoratedFunction = withDefaultError(() => {
          throw new Error(message);
        }, SomeError);
        await decoratedFunction();
      } catch (error) {
        expect(error).toBeInstanceOf(SomeError);
        expect(error).toHaveProperty("message", message);
      }
    });

    it("should wrap error thrown in the original function (async)", async () => {
      const message = "Some message";
      try {
        const decoratedFunction = withDefaultError(() => {
          return Promise.reject(new Error(message));
        }, SomeError);
        await decoratedFunction();
      } catch (error) {
        expect(error).toBeInstanceOf(SomeError);
        expect(error).toHaveProperty("message", message);
      }
    });
  });
});
