"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicePriceProvider = void 0;
var commonTypes_1 = require("../common/commonTypes");
var ServicePriceProvider = /** @class */ (function () {
    function ServicePriceProvider() {
        this.loadPrices();
    }
    ServicePriceProvider.prototype.getKey = function (serviceType, year) {
        return serviceType + "##" + year;
    };
    ServicePriceProvider.prototype.loadPrices = function () {
        var pricesMap = new Map();
        pricesMap.set(this.getKey("Photography", 2020), 1700);
        pricesMap.set(this.getKey("Photography", 2021), 1800);
        pricesMap.set(this.getKey("Photography", 2022), 1900);
        pricesMap.set(this.getKey("VideoRecording", 2020), 1700);
        pricesMap.set(this.getKey("VideoRecording", 2021), 1800);
        pricesMap.set(this.getKey("VideoRecording", 2022), 1900);
        pricesMap.set(this.getKey("BlurayPackage", commonTypes_1.anyYear), 300);
        pricesMap.set(this.getKey("TwoDayEvent", commonTypes_1.anyYear), 400);
        pricesMap.set(this.getKey("WeddingSession", commonTypes_1.anyYear), 600);
        this.pricesMap = pricesMap;
    };
    ServicePriceProvider.prototype.getPrice = function (serviceType, serviceYear) {
        var price = this.pricesMap.get(this.getKey(serviceType, serviceYear));
        if (price) {
            return price;
        }
        price = this.pricesMap.get(this.getKey(serviceType, commonTypes_1.anyYear));
        if (price) {
            return price;
        }
        return 0;
    };
    return ServicePriceProvider;
}());
exports.ServicePriceProvider = ServicePriceProvider;
