import { BaseError } from "../../core/base-error";
import {
  ErrorConverter,
  ErrorDeclaration,
  IErrorConverterConfig,
} from "../../core/types";

export type IDefaultHttpConverterConfig = IErrorConverterConfig<{
  status?: number;
  exposeMessage?: boolean;
}>;

export type IDefaultHttpConverterResult = {
  status: number;
  body: {
    error: string;
  };
};

/* eslint-disable no-unused-vars */
export class DefaultHttpResponseConverter
  implements ErrorConverter<IDefaultHttpConverterResult> {
  defaultHttpErrorMessage: string;

  constructor(defaultHttpErrorMessage: string) {
    this.defaultHttpErrorMessage = defaultHttpErrorMessage;
  }

  convert(
    error: BaseError,
    declaration: ErrorDeclaration
  ): IDefaultHttpConverterResult {
    const converterConfig = declaration.converters?.find(
      (converter) => converter.type === "http"
    );
    if (converterConfig) {
      const httpConverterConfig = converterConfig as IDefaultHttpConverterConfig;

      return {
        status: httpConverterConfig.payload.status || 500,
        body: httpConverterConfig.payload.exposeMessage
          ? { error: error.message }
          : { error: this.defaultHttpErrorMessage },
      };
    }

    return {
      status: 500,
      body: { error: this.defaultHttpErrorMessage },
    };
  }
}
