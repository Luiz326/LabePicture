"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputValidator = void 0;
class InputValidator {
    validate(input) {
        let errors = [];
        for (const key in input) {
            if (input[key] !== false && !input[key]) {
                errors.push({ key, value: input[key] });
            }
        }
        return { isValid: errors.length === 0, errors };
    }
}
exports.InputValidator = InputValidator;
