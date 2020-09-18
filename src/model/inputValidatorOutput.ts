import { inputValidatorError } from "./inputValidatorError";

export interface inputValidatorOutput {
  isValid: boolean;
  errors: inputValidatorError[];
}
