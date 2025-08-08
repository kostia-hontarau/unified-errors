const mockErrorCore = { errors: {}, errorDeclarations: {} };
import * as errorDeclarationHelpers from "./core/error-declaration-helpers";
jest.mock("./core/index", () => mockErrorCore);

describe("Error Declaration Helpers", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("#getErrorDeclarationByName", () => {
    it("should return error declaration by name (1st-level)", () => {
      mockErrorCore.errorDeclarations = {
        Unexpected: {
          code: "unexpected",
        },
      };
      mockErrorCore.errors = {
        Unexpected: Error,
      };

      const errorDeclaration =
        errorDeclarationHelpers.getErrorDeclarationByName(
          "Unexpected",
          mockErrorCore.errorDeclarations
        );

      expect(errorDeclaration).toEqual({
        code: "unexpected",
      });
    });

    it("should return error declaration by name (n-level)", () => {
      mockErrorCore.errorDeclarations = {
        SomeError: {
          code: "someError",
          children: {
            AnotherError: {
              code: "anotherError",
              children: {
                Unexpected: {
                  code: "unexpected",
                },
              },
            },
          },
        },
      };
      mockErrorCore.errors = {
        Unexpected: Error,
      };

      const errorDeclaration =
        errorDeclarationHelpers.getErrorDeclarationByName(
          "Unexpected",
          mockErrorCore.errorDeclarations
        );

      expect(errorDeclaration).toEqual({ code: "unexpected" });
    });

    it("should return null if no declaration found", () => {
      mockErrorCore.errorDeclarations = {
        SomeError: {
          code: "someError",
          children: {
            AnotherError: {
              code: "anotherError",
            },
          },
        },
      };
      mockErrorCore.errors = {
        MyError: Error,
      };

      const errorDeclaration =
        errorDeclarationHelpers.getErrorDeclarationByName(
          "anyOtherError",
          mockErrorCore.errorDeclarations
        );

      expect(errorDeclaration).toBe(null);
    });
  });

  // describe("error codes", () => {
  //   it("should allow hierarchy of error codes", () => {
  //     const error = new InvalidEmail("Invalid email");
  //     const validationError = new ValidationError("Invalid email");
  //     const applicationError = new ApplicationError("Invalid email");

  //     expect(error.errorCode).toBe("application.validation.invalid_email");
  //     expect(validationError.errorCode).toBe("application.validation");
  //     expect(applicationError.errorCode).toBe("application");
  //   });
  // });
});
