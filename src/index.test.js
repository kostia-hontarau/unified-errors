const mockErrorCore = { errors: {}, errorDeclarations: {} };
const errorDeclarationHelpers = require("./core/error-declaration-helpers");
jest.mock("./core/index.js", () => mockErrorCore);

describe("Error Declaration Helpers", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("#getDefaultError", () => {
    it("should return default error", () => {
      mockErrorCore.errorDeclarations = {
        MyError: {
          code: "error.myerror",
          specificErrors: {
            Unexpected: {
              code: "unexpected",
              isDefault: true,
            },
          },
        },
      };
      mockErrorCore.errors = {
        Unexpected: Error,
      };

      const {
        DefaultError,
        errorDeclaration,
        errorName,
      } = errorDeclarationHelpers.getDefaultError();

      expect(DefaultError).toBe(Error);
      expect(errorDeclaration).toEqual({
        code: "unexpected",
        isDefault: true,
      });
      expect(errorName).toBe("Unexpected");
    });

    it("should return null if no default error", () => {
      mockErrorCore.errorDeclarations = {
        MyError: {
          code: "error.myerror",
        },
      };
      mockErrorCore.errors = {
        MyError: Error,
      };

      const defaultErrorResult = errorDeclarationHelpers.getDefaultError();

      expect(defaultErrorResult).toBe(null);
    });
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

      const errorDeclaration = errorDeclarationHelpers.getErrorDeclarationByName(
        "Unexpected"
      );

      expect(errorDeclaration).toEqual({
        code: "unexpected",
      });
    });

    it("should return error declaration by name (n-level)", () => {
      mockErrorCore.errorDeclarations = {
        SomeError: {
          code: "someError",
          specificErrors: {
            AnotherError: {
              code: "anotherError",
              specificErrors: {
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

      const errorDeclaration = errorDeclarationHelpers.getErrorDeclarationByName(
        "Unexpected"
      );

      expect(errorDeclaration).toEqual({ code: "unexpected" });
    });

    it("should return null if no declaration found", () => {
      mockErrorCore.errorDeclarations = {
        SomeError: {
          code: "someError",
          specificErrors: {
            AnotherError: {
              code: "anotherError",
            },
          },
        },
      };
      mockErrorCore.errors = {
        MyError: Error,
      };

      const errorDeclaration = errorDeclarationHelpers.getErrorDeclarationByName(
        "anyOtherError"
      );

      expect(errorDeclaration).toBe(null);
    });
  });
});
