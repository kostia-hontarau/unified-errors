const createErrorClasses = require("./create-error-classes");
const UnifiedError = require("./unified-error");

describe("Declarative error generation", () => {
  let errorDefinition = null;

  describe("Error definition", () => {
    it("should generate 1 level error hierarchy", () => {
      errorDefinition = {
        MyFirstError: { code: "errorCode1" },
        MySecondError: { code: "errorCode2" },
      };

      const errors = createErrorClasses(errorDefinition);

      expect(errors).toHaveProperty("MyFirstError");
      expect(errors.MyFirstError).toBeInstanceOf(Function);

      expect(errors).toHaveProperty("MySecondError");
      expect(errors.MySecondError).toBeInstanceOf(Function);
    });

    it("should generate n-level error hierarchy", () => {
      errorDefinition = {
        FirstLevelError: {
          code: "errorCode1",
          specificErrors: {
            SecondLevelError: {
              code: "errorCode2",
              specificErrors: {
                ThirdLevelError: { code: "errorCode3" },
              },
            },
          },
        },
      };

      const errors = createErrorClasses(errorDefinition);

      expect(errors).toHaveProperty("FirstLevelError");
      expect(errors.FirstLevelError).toBeInstanceOf(Function);
      expect(errors).toHaveProperty("SecondLevelError");
      expect(errors.SecondLevelError).toBeInstanceOf(Function);
      expect(errors).toHaveProperty("ThirdLevelError");
      expect(errors.ThirdLevelError).toBeInstanceOf(Function);

      const firstError = new errors.FirstLevelError("message");
      expect(firstError).toBeInstanceOf(UnifiedError);
      expect(firstError).toHaveProperty("message", "message");
      expect(firstError).toHaveProperty("errorCode", "errorCode1");

      const secondError = new errors.SecondLevelError("message");
      expect(secondError).toBeInstanceOf(errors.FirstLevelError);
      expect(secondError).toHaveProperty("message", "message");
      expect(secondError).toHaveProperty("errorCode", "errorCode2");

      const thirdError = new errors.ThirdLevelError("message");
      expect(thirdError).toBeInstanceOf(errors.SecondLevelError);
      expect(thirdError).toHaveProperty("message", "message");
      expect(thirdError).toHaveProperty("errorCode", "errorCode3");
    });

    describe("Wrong error definition", () => {});
  });

  describe("Generated error usage", () => {
    it("should be allowed to throw generated error", () => {
      errorDefinition = {
        MyFirstError: { code: "errorCode1" },
      };

      const errors = createErrorClasses(errorDefinition);

      try {
        throw new errors.MyFirstError("message", {
          payload: null,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(errors.MyFirstError);
        expect(error).toHaveProperty("message", "message");
        expect(error).toHaveProperty("errorCode", "errorCode1");
        expect(error).toHaveProperty("meta", {
          payload: null,
        });
      }
    });
  });
});
