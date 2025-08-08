import { ErrorDeclaration, ErrorFilter, ErrorsDeclaration } from "./types.js";

type MatchResult = {
  errorName: string;
  errorDeclaration: ErrorDeclaration;
};

const matchErrorDeclaration = (
  errorClassName: string,
  errorDeclaration: ErrorDeclaration,
  filter: ErrorFilter
): boolean => {
  let isMatch = true;

  if (filter.errorName) {
    isMatch = filter.errorName === errorClassName;
  }

  if (filter.isDefault) {
    isMatch = Boolean(errorDeclaration.isDefault);
  }

  return isMatch;
};

const plainMatchErrorDeclaration = (
  errorsDeclarations: ErrorsDeclaration,
  filter: ErrorFilter
): MatchResult | null => {
  const errorClassNames = Object.keys(errorsDeclarations);
  for (let i = 0; i < errorClassNames.length; i += 1) {
    const errorName = errorClassNames[i];
    const errorDeclaration = errorsDeclarations[errorName];
    const isMatching = matchErrorDeclaration(
      errorName,
      errorDeclaration,
      filter
    );

    if (isMatching) {
      return { errorName, errorDeclaration };
    }
  }

  return null;
};

const match = (
  errorsDeclarations: ErrorsDeclaration,
  filter: ErrorFilter
): MatchResult | null => {
  if (!Object.keys(errorsDeclarations).length) {
    return null;
  }

  let matchResult = plainMatchErrorDeclaration(errorsDeclarations, filter);
  if (matchResult) return matchResult;

  const errorDeclarationsWithChildren = Object.values(
    errorsDeclarations
  ).filter((errorDeclaration) => {
    return Boolean(errorDeclaration.children);
  });

  for (let i = 0; i < errorDeclarationsWithChildren.length; i += 1) {
    const errorDeclarationWithChildren = errorDeclarationsWithChildren[i];
    matchResult = match(errorDeclarationWithChildren.children || {}, filter);

    if (matchResult) return matchResult;
  }

  return null;
};

export const getErrorDeclarationByName = (
  errorClassName: string,
  errorDeclarations: ErrorsDeclaration
): ErrorDeclaration | null => {
  const matchResult = match(errorDeclarations, {
    errorName: errorClassName,
  });

  return matchResult ? matchResult.errorDeclaration : null;
};
