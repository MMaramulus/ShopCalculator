"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatePriceManager = void 0;
var CalculatePriceResult_1 = require("./CalculatePriceResult");
var ServicePriceProvider_1 = require("./ServicePriceProvider");
var DiscountsCalculator_1 = require("./DiscountsCalculator");
var CalculatePriceManager = /** @class */ (function () {
    function CalculatePriceManager() {
        this.servicePriceProvider = new ServicePriceProvider_1.ServicePriceProvider();
        this.discountsCalculator = new DiscountsCalculator_1.DiscountsCalculator();
    }
    CalculatePriceManager.prototype.calculatePrice = function (selectedServices, selectedYear) {
        var _this = this;
        var _a;
        var basePrice = 0;
        selectedServices.forEach(function (x) { return basePrice += _this.servicePriceProvider.getPrice(x, selectedYear); });
        var highestDiscount = this.discountsCalculator.getHighestDiscounts(selectedServices, selectedYear);
        var result = new CalculatePriceResult_1.CalculatePriceResult(basePrice, basePrice);
        result.finalPrice += (_a = highestDiscount === null || highestDiscount === void 0 ? void 0 : highestDiscount.value) !== null && _a !== void 0 ? _a : 0;
        return result;
    };
    return CalculatePriceManager;
}());
exports.CalculatePriceManager = CalculatePriceManager;
