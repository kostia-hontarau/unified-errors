const mockErrorCore = { errors: {}, errorDeclarations: {} };
jest.mock("./index", () => mockErrorCore);

import * as errorDeclarationHelpers from "./error-declaration-helpers";

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

      const errorDeclaration = errorDeclarationHelpers.getErrorDeclarationByName(
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

      const errorDeclaration = errorDeclarationHelpers.getErrorDeclarationByName(
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

      const errorDeclaration = errorDeclarationHelpers.getErrorDeclarationByName(
        "anyOtherError",
        mockErrorCore.errorDeclarations
      );

      expect(errorDeclaration).toBe(null);
    });
  });
});
