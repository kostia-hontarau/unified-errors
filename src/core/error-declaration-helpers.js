const errorCore = require("./index.js");

const matchErrorDeclaration = (errorClassName, errorDeclaration, filter) => {
  let isMatch = true;

  if (filter.errorName) {
    isMatch = filter.errorName === errorClassName;
  }

  if (filter.isDefault) {
    isMatch = Boolean(errorDeclaration.isDefault);
  }

  return isMatch;
};

const plainMatchErrorDeclaration = (errorDeclarations, filter) => {
  const internalErrorClassNames = Object.keys(errorDeclarations);
  for (let i = 0; i < internalErrorClassNames.length; i += 1) {
    const errorName = internalErrorClassNames[i];
    const errorDeclaration = errorDeclarations[errorName];
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

const match = (errorDeclarations, filter) => {
  if (!Object.keys(errorDeclarations).length) {
    return null;
  }

  let matchResult = plainMatchErrorDeclaration(errorDeclarations, filter);
  if (matchResult) return matchResult;

  const errorDeclarationsToInspect = Object.values(errorDeclarations).filter(
    (value) => {
      return Boolean(value.specificErrors);
    }
  );

  for (let i = 0; i < errorDeclarationsToInspect.length; i += 1) {
    const errorDeclarationToInspect = errorDeclarationsToInspect[i];
    matchResult = match(errorDeclarationToInspect.specificErrors, filter);

    if (matchResult) return matchResult;
  }

  return null;
};

const getDefaultError = () => {
  const matchResult = match(errorCore.errorDeclarations, {
    isDefault: true,
  });

  if (!matchResult) {
    return null;
  }

  return {
    DefaultError: errorCore.errors[matchResult.errorName],
    errorName: matchResult.errorName,
    errorDeclaration: matchResult.errorDeclaration,
  };
};

module.exports = {
  getErrorDeclarationByName: (errorClassName) => {
    const matchResult = match(errorCore.errorDeclarations, {
      errorName: errorClassName,
    });

    return matchResult ? matchResult.errorDeclaration : null;
  },
  getDefaultError,
};
