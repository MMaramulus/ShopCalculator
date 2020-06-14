"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatePriceManager = exports.ServicePriceDiscount = void 0;
var CalculatePriceResult_1 = require("./CalculatePriceResult");
var ServicePriceProvider_1 = require("./ServicePriceProvider");
var DiscountsCalculator_1 = require("./DiscountsCalculator");
var ServicePriceDiscount = /** @class */ (function () {
    function ServicePriceDiscount(serviceName, basePrice, bestDiscount) {
        if (basePrice === void 0) { basePrice = 0; }
        if (bestDiscount === void 0) { bestDiscount = null; }
        this.serviceName = serviceName;
        this.basePrice = basePrice;
        this.bestDiscount = bestDiscount;
    }
    return ServicePriceDiscount;
}());
exports.ServicePriceDiscount = ServicePriceDiscount;
var CalculatePriceManager = /** @class */ (function () {
    function CalculatePriceManager() {
        this.servicePriceProvider = new ServicePriceProvider_1.ServicePriceProvider();
        this.discountsCalculator = new DiscountsCalculator_1.DiscountsCalculator();
    }
    CalculatePriceManager.prototype.calculatePrice = function (selectedServices, selectedYear) {
        var _this = this;
        var servicePriceDiscount = new Map();
        selectedServices.forEach(function (service) {
            var record = new ServicePriceDiscount(service);
            record.basePrice = _this.servicePriceProvider.getPrice(service, selectedYear);
            record.bestDiscount = _this.discountsCalculator.getHighestDiscounts(service, selectedServices, selectedYear);
            servicePriceDiscount.set(service, record);
        });
        var result = new CalculatePriceResult_1.CalculatePriceResult(0, 0);
        servicePriceDiscount.forEach(function (service) {
            var _a, _b;
            result.basePrice += service.basePrice;
            result.finalPrice += service.basePrice + ((_b = (_a = service.bestDiscount) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0);
        });
        return result;
    };
    return CalculatePriceManager;
}());
exports.CalculatePriceManager = CalculatePriceManager;
