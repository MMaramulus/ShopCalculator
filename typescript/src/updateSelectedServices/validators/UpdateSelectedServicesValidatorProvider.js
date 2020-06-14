"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSelectedServicesValidatorProvider = void 0;
var ValidationResult_1 = require("./ValidationResult");
var UpdateSelectedServicesValidatorProvider = /** @class */ (function () {
    function UpdateSelectedServicesValidatorProvider() {
    }
    UpdateSelectedServicesValidatorProvider.prototype.getValidators = function (type) {
        var validators = [];
        switch (type) {
            case 'Select': {
                validators.push(new SelectAlreadySelectedValidator());
                validators.push(new SelectBlurayPackageValidator());
                validators.push(new SelectTwoDayEventValidator());
                break;
            }
            case 'Deselect': {
                validators.push(new DeselectUnselectedValidator());
                break;
            }
        }
        return validators;
    };
    return UpdateSelectedServicesValidatorProvider;
}());
exports.UpdateSelectedServicesValidatorProvider = UpdateSelectedServicesValidatorProvider;
// It does not make sense to include the price of the Extra Blu-ray when the client did not choose a video recording.
var SelectBlurayPackageValidator = /** @class */ (function () {
    function SelectBlurayPackageValidator() {
    }
    SelectBlurayPackageValidator.prototype.validate = function (previouslySelectedServices, action) {
        if (action.type === 'Select'
            && action.service === 'BlurayPackage'
            && !previouslySelectedServices.some(function (x) { return x === 'VideoRecording'; })) {
            return new ValidationResult_1.ValidationResult(false, "It does not make sense to include the price of the Extra Blu-ray when the client did not choose a video recording.");
        }
        return new ValidationResult_1.ValidationResult(true, "");
    };
    return SelectBlurayPackageValidator;
}());
// It does not make sense to select already selected service
var SelectAlreadySelectedValidator = /** @class */ (function () {
    function SelectAlreadySelectedValidator() {
    }
    SelectAlreadySelectedValidator.prototype.validate = function (previouslySelectedServices, action) {
        if (action.type === 'Select'
            && previouslySelectedServices.some(function (x) { return x === action.service; })) {
            return new ValidationResult_1.ValidationResult(false, "It does not make sense to select already selected service");
        }
        return new ValidationResult_1.ValidationResult(true, "");
    };
    return SelectAlreadySelectedValidator;
}());
// It does not make sense to include the price of handling two-day event when the client did not choose video recording or photography during the wedding.
var SelectTwoDayEventValidator = /** @class */ (function () {
    function SelectTwoDayEventValidator() {
    }
    SelectTwoDayEventValidator.prototype.validate = function (previouslySelectedServices, action) {
        if (action.type === 'Select'
            && action.service === 'TwoDayEvent'
            && previouslySelectedServices.filter(function (x) { return x === 'VideoRecording' || x === 'Photography'; }).length === 0) {
            return new ValidationResult_1.ValidationResult(false, "It does not make sense to include the price of handling two-day event when the client did not choose video recording or photography during the wedding.");
        }
        return new ValidationResult_1.ValidationResult(true, "");
    };
    return SelectTwoDayEventValidator;
}());
// service was not selected and cannot be deselected
var DeselectUnselectedValidator = /** @class */ (function () {
    function DeselectUnselectedValidator() {
    }
    DeselectUnselectedValidator.prototype.validate = function (previouslySelectedServices, action) {
        if (action.type === 'Deselect'
            && !previouslySelectedServices.some(function (x) { return x === action.service; })) {
            return new ValidationResult_1.ValidationResult(false, action.service + " was not selected and cannot be deselected");
        }
        return new ValidationResult_1.ValidationResult(true, "");
    };
    return DeselectUnselectedValidator;
}());
