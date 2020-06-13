"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePrice = exports.updateSelectedServices = void 0;
exports.updateSelectedServices = function (previouslySelectedServices, action) {
    if (action.type == "Select") {
        if (previouslySelectedServices.some(function (x) { return x === action.service; })) {
            return previouslySelectedServices;
        }
        previouslySelectedServices.push(action.service);
        return previouslySelectedServices;
    }
    if (action.type == "Deselect") {
        if (previouslySelectedServices.some(function (x) { return x === action.service; })) {
            previouslySelectedServices.pop();
            return previouslySelectedServices;
        }
        return previouslySelectedServices;
    }
};
exports.calculatePrice = function (selectedServices, selectedYear) { return ({ basePrice: 0, finalPrice: 0 }); };
