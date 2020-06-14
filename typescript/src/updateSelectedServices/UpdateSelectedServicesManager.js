"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSelectedServicesManager = void 0;
var UpdateSelectedServicesValidator_1 = require("./validators/UpdateSelectedServicesValidator");
var UpdateSelectedServicesManager = /** @class */ (function () {
    function UpdateSelectedServicesManager() {
        this.updateSelectedServicesValidator = new UpdateSelectedServicesValidator_1.UpdateSelectedServicesValidator();
    }
    UpdateSelectedServicesManager.prototype.updateHandler = function (previouslySelectedServices, action) {
        var validationResult = this.updateSelectedServicesValidator.validate(previouslySelectedServices, action);
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
                    this.removeTwoDayEventWhenNotNeeded(previouslySelectedServices);
                }
                return previouslySelectedServices;
            }
            default: {
                throw new Error("Unrecognized action type: " + action.type);
            }
        }
        return previouslySelectedServices;
    };
    UpdateSelectedServicesManager.prototype.removeTwoDayEventWhenNotNeeded = function (previouslySelectedServices) {
        if ((!previouslySelectedServices.some(function (x) { return x === "WeddingSession"; })
            || previouslySelectedServices.filter(function (x) { return x === "VideoRecording" || x === "Photography"; }).length === 0)) {
            this.updateHandler(previouslySelectedServices, {
                type: "Deselect",
                service: "TwoDayEvent",
            });
        }
    };
    return UpdateSelectedServicesManager;
}());
exports.UpdateSelectedServicesManager = UpdateSelectedServicesManager;
