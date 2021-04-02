/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "safer-eval" {
  type Eval = (code: string, lock: Record<string, unknown>) => unknown;
  const saferEval: Eval;

  export = saferEval;
}
