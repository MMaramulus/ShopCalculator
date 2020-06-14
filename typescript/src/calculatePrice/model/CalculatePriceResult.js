"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatePriceResult = void 0;
var CalculatePriceResult = /** @class */ (function () {
    function CalculatePriceResult(basePrice, finalPrice) {
        if (basePrice === void 0) { basePrice = 0; }
        if (finalPrice === void 0) { finalPrice = 0; }
        this.basePrice = basePrice;
        this.finalPrice = finalPrice;
    }
    return CalculatePriceResult;
}());
exports.CalculatePriceResult = CalculatePriceResult;
