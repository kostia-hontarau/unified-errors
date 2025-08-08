export interface ErrorDeclaration {
  code: string;
  children?: ErrorsDeclaration;
}
export interface ErrorsDeclaration {
  [errorName: string]: ErrorDeclaration;
}
