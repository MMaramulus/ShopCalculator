"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePrice = exports.updateSelectedServices = void 0;
var UpdateSelectedServicesManager_1 = require("./updateSelectedServices/UpdateSelectedServicesManager");
var CalculatePriceManager_1 = require("./calculatePrice/CalculatePriceManager");
exports.updateSelectedServices = function (previouslySelectedServices, action) {
    var updateSelectedServicesManager = new UpdateSelectedServicesManager_1.UpdateSelectedServicesManager();
    var result = updateSelectedServicesManager.updateHandler(previouslySelectedServices, action);
    return result;
};
exports.calculatePrice = function (selectedServices, selectedYear) {
    var calculatePriceManager = new CalculatePriceManager_1.CalculatePriceManager();
    var result = calculatePriceManager.calculatePrice(selectedServices, selectedYear);
    return result;
};
