"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatePriceManager = void 0;
var CalculatePriceResult_1 = require("./model/CalculatePriceResult");
var BasePriceProvider_1 = require("./BasePriceProvider");
var DiscountsProvider_1 = require("./DiscountsProvider");
var CalculatePriceManager = /** @class */ (function () {
    function CalculatePriceManager() {
        this.servicePriceProvider = new BasePriceProvider_1.BasePriceProvider();
        this.discountsCalculator = new DiscountsProvider_1.DiscountsProvider();
    }
    CalculatePriceManager.prototype.calculatePrice = function (selectedServices, selectedYear) {
        var _this = this;
        var result = new CalculatePriceResult_1.CalculatePriceResult(0, 0);
        selectedServices.forEach(function (service) {
            var _a;
            var servicePrice = _this.servicePriceProvider.getPrice(service, selectedYear);
            var serviceDiscount = _this.discountsCalculator.getHighestDiscount(service, selectedServices, selectedYear);
            result.basePrice += servicePrice;
            result.finalPrice += servicePrice + ((_a = serviceDiscount === null || serviceDiscount === void 0 ? void 0 : serviceDiscount.value) !== null && _a !== void 0 ? _a : 0);
        });
        return result;
    };
    return CalculatePriceManager;
}());
exports.CalculatePriceManager = CalculatePriceManager;
