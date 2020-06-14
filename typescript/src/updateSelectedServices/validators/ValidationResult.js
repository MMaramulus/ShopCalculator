"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationResult = void 0;
var ValidationResult = /** @class */ (function () {
    function ValidationResult(isValid, errorMsg) {
        this.isValid = isValid;
        this.errorMsg = errorMsg;
    }
    return ValidationResult;
}());
exports.ValidationResult = ValidationResult;
