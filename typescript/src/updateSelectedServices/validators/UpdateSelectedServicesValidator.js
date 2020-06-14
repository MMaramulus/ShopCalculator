"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSelectedServicesValidator = void 0;
var ValidationResult_1 = require("./ValidationResult");
var UpdateSelectedServicesValidatorProvider_1 = require("./UpdateSelectedServicesValidatorProvider");
var UpdateSelectedServicesValidator = /** @class */ (function () {
    function UpdateSelectedServicesValidator() {
        this.validatorProvider = new UpdateSelectedServicesValidatorProvider_1.UpdateSelectedServicesValidatorProvider();
    }
    UpdateSelectedServicesValidator.prototype.validate = function (previouslySelectedServices, action) {
        var validators = this.validatorProvider.getValidators(action.type);
        var msgSeparator = " ## ";
        var validationResult = new ValidationResult_1.ValidationResult(true, "");
        validators.forEach(function (element) {
            var result = element.validate(previouslySelectedServices, action);
            if (!result.isValid) {
                validationResult.isValid = false;
                validationResult.errorMsg += msgSeparator + result.errorMsg;
            }
        });
        return validationResult;
    };
    return UpdateSelectedServicesValidator;
}());
exports.UpdateSelectedServicesValidator = UpdateSelectedServicesValidator;
