"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePrice = exports.DeselectUnselectedValidator = exports.SelectTwoDayEventValidator = exports.SelectAlreadySelectedValidator = exports.SelectBlurayPackageValidator = exports.ValidationResult = exports.SelectValidatorFactory = exports.UpdateSelectedServicesValidator = exports.updateSelectedServices = void 0;
exports.updateSelectedServices = function (previouslySelectedServices, action) {
    var validationResult = new UpdateSelectedServicesValidator().validate(previouslySelectedServices, action);
    if (!validationResult.isValid) {
        // throw new Error(validationResult.errorMsg);
        return previouslySelectedServices;
    }
    switch (action.type) {
        case 'Select': {
            previouslySelectedServices.push(action.service);
            return previouslySelectedServices;
        }
        case 'Deselect': {
            var index = previouslySelectedServices.indexOf(action.service);
            if (index > -1) {
                // using splice instead of filter in case of many services with the name were added, but we want to remove only one (my assumption)
                previouslySelectedServices.splice(index, 1);
                removeTwoDayEventWhenNotNeeded(previouslySelectedServices);
            }
            return previouslySelectedServices;
        }
        default: {
            throw new Error("Unrecognized action type: " + action.type);
        }
    }
};
var UpdateSelectedServicesValidator = /** @class */ (function () {
    function UpdateSelectedServicesValidator() {
    }
    UpdateSelectedServicesValidator.prototype.validate = function (previouslySelectedServices, action) {
        var separator = " ## ";
        var validators = new SelectValidatorFactory().getValidators(action.type);
        var validationResult = new ValidationResult(true, "");
        validators.forEach(function (element) {
            var result = element.validate(previouslySelectedServices, action);
            if (!result.isValid) {
                validationResult.isValid = false;
                validationResult.errorMsg += separator + result.errorMsg;
            }
        });
        return validationResult;
    };
    return UpdateSelectedServicesValidator;
}());
exports.UpdateSelectedServicesValidator = UpdateSelectedServicesValidator;
var SelectValidatorFactory = /** @class */ (function () {
    function SelectValidatorFactory() {
    }
    SelectValidatorFactory.prototype.getValidators = function (type) {
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
    return SelectValidatorFactory;
}());
exports.SelectValidatorFactory = SelectValidatorFactory;
var ValidationResult = /** @class */ (function () {
    function ValidationResult(isValid, errorMsg) {
        this.isValid = isValid;
        this.errorMsg = errorMsg;
    }
    return ValidationResult;
}());
exports.ValidationResult = ValidationResult;
// It does not make sense to include the price of the Extra Blu-ray when the client did not choose a video recording.
var SelectBlurayPackageValidator = /** @class */ (function () {
    function SelectBlurayPackageValidator() {
    }
    SelectBlurayPackageValidator.prototype.validate = function (previouslySelectedServices, action) {
        if (action.type === 'Select'
            && action.service === 'BlurayPackage'
            && !previouslySelectedServices.some(function (x) { return x === 'VideoRecording'; })) {
            return new ValidationResult(false, "It does not make sense to include the price of the Extra Blu-ray when the client did not choose a video recording.");
        }
        return new ValidationResult(true, "");
    };
    return SelectBlurayPackageValidator;
}());
exports.SelectBlurayPackageValidator = SelectBlurayPackageValidator;
var SelectAlreadySelectedValidator = /** @class */ (function () {
    function SelectAlreadySelectedValidator() {
    }
    SelectAlreadySelectedValidator.prototype.validate = function (previouslySelectedServices, action) {
        if (action.type === 'Select'
            && previouslySelectedServices.some(function (x) { return x === action.service; })) {
            return new ValidationResult(false, "It does not make sense to select already selected service");
        }
        return new ValidationResult(true, "");
    };
    return SelectAlreadySelectedValidator;
}());
exports.SelectAlreadySelectedValidator = SelectAlreadySelectedValidator;
// It does not make sense to include the price of handling two-day event when the client did not choose video recording or photography during the wedding.
var SelectTwoDayEventValidator = /** @class */ (function () {
    function SelectTwoDayEventValidator() {
    }
    SelectTwoDayEventValidator.prototype.validate = function (previouslySelectedServices, action) {
        if (action.type === 'Select'
            && action.service === 'TwoDayEvent'
            && previouslySelectedServices.filter(function (x) { return x === 'VideoRecording' || x === 'Photography'; }).length === 0) {
            return new ValidationResult(false, "It does not make sense to include the price of handling two-day event when the client did not choose video recording or photography during the wedding.");
        }
        return new ValidationResult(true, "");
    };
    return SelectTwoDayEventValidator;
}());
exports.SelectTwoDayEventValidator = SelectTwoDayEventValidator;
var DeselectUnselectedValidator = /** @class */ (function () {
    function DeselectUnselectedValidator() {
    }
    DeselectUnselectedValidator.prototype.validate = function (previouslySelectedServices, action) {
        if (action.type === 'Deselect'
            && !previouslySelectedServices.some(function (x) { return x === action.service; })) {
            return new ValidationResult(false, action.service + " was not selected and cannot be deselected");
        }
        return new ValidationResult(true, "");
    };
    return DeselectUnselectedValidator;
}());
exports.DeselectUnselectedValidator = DeselectUnselectedValidator;
exports.calculatePrice = function (selectedServices, selectedYear) { return ({ basePrice: 0, finalPrice: 0 }); };
function removeTwoDayEventWhenNotNeeded(previouslySelectedServices) {
    if ((!previouslySelectedServices.some(function (x) { return x === "WeddingSession"; })
        || previouslySelectedServices.filter(function (x) { return x === "VideoRecording" || x === "Photography"; }).length === 0)) {
        exports.updateSelectedServices(previouslySelectedServices, {
            type: "Deselect",
            service: "TwoDayEvent",
        });
    }
}
