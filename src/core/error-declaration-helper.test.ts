const mockErrorCore = { errors: {}, errorDeclarations: {} };
jest.mock("./index", () => mockErrorCore);

import * as errorDeclarationHelpers from "./error-declaration-helpers";

describe("Error Declaration Helpers", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("#getDefaultError", () => {
    it("should return default error", () => {
      mockErrorCore.errorDeclarations = {
        MyError: {
          code: "error.myerror",
          children: {
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

      const result = errorDeclarationHelpers.getDefaultError();

      expect(result?.DefaultError).toBe(Error);
      expect(result?.errorDeclaration).toEqual({
        code: "unexpected",
        isDefault: true,
      });
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

      const errorDeclaration = errorDeclarationHelpers.getErrorDeclarationByName(
        "Unexpected"
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

      const errorDeclaration = errorDeclarationHelpers.getErrorDeclarationByName(
        "anyOtherError"
      );

      expect(errorDeclaration).toBe(null);
    });
  });
});
