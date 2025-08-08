import { BaseError } from "../core/base-error";
import { withDefaultError } from "./withDefaultError";

class SomeError extends BaseError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super("some", message, meta);
  }
}

describe("With Default Error decorator", () => {
  describe("Function decorator", () => {
    it("should run original function and return its result (sync)", () => {
      const expectedResult = 2;
      const result = withDefaultError(
        (argument: unknown) => argument,
        SomeError
      )(expectedResult);

      expect(result).toBe(expectedResult);
    });

    it("should run original function and return its result (async)", async () => {
      const expectedResult = 2;
      const result = await withDefaultError(
        (argument: unknown) => Promise.resolve(argument),
        SomeError
      )(expectedResult);

      expect(result).toBe(expectedResult);
    });

    it("should wrap error thrown in the original function (sync)", () => {
      const message = "Some message";
      try {
        withDefaultError(() => {
          throw new Error(message);
        }, SomeError);
      } catch (error) {
        expect(error).toBeInstanceOf(BaseError);
        expect(error).toHaveProperty("message", message);
      }
    });

    it("should wrap error thrown in the original function (async)", async () => {
      const message = "Some message";
      try {
        const func = withDefaultError(() => {
          return Promise.reject(new Error(message));
        }, SomeError);
        await func();
      } catch (error) {
        expect(error).toBeInstanceOf(BaseError);
        expect(error).toHaveProperty("message", message);
      }
    });
  });
});
