import { generateErrors } from "./typescript-generator";
import { join } from "path";

jest.mock(
  "fs",
  () =>
    ({
      ...jest.requireActual("fs"),
      writeFileSync: jest.fn(),
      mkdirSync: jest.fn(),
    }) as unknown as Record<string, unknown>
);

describe("TypeScript Generator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should generate error classes from declarations", () => {
    const mockDeclarations = {
      ValidationError: {
        code: "validation.error",
        children: {
          InvalidEmail: {
            code: "invalid_email",
            converters: [
              {
                type: "http",
                payload: { status: 400, exposeMessage: true },
              },
            ],
          },
        },
      },
    };

    const mockPath = join(process.cwd(), ".errors.js");
    jest.doMock(mockPath, () => mockDeclarations, { virtual: true });

    generateErrors({
      configPath: ".errors.js",
      outputDir: "test-output",
    });

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs: unknown = require("fs");
    const { mkdirSync, writeFileSync } = fs as {
      mkdirSync: () => void;
      writeFileSync: () => void;
    };
    expect(mkdirSync).toHaveBeenCalledWith("test-output", {
      recursive: true,
    });
    expect(writeFileSync).toHaveBeenCalledTimes(4);
  });
});
