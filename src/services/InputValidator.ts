import { inputValidatorOutput } from "../model/inputValidatorOutput";
import { inputValidatorError } from "../model/inputValidatorError";

export class InputValidator {
  public validate(input: any): inputValidatorOutput {
    let errors: inputValidatorError[] = [];
    for (const key in input) {
      if (input[key] !== false && !input[key]) {
        errors.push({ key, value: input[key] });
      }
    }
    return { isValid: errors.length === 0, errors };
  }
}
