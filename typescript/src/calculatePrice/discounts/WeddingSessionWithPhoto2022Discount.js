"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeddingSessionWithPhoto2022Discount = void 0;
var Discount_1 = require("../model/Discount");
var WeddingSessionWithPhoto2022Discount = /** @class */ (function () {
    function WeddingSessionWithPhoto2022Discount() {
        this.discountValue = -600;
        this.discountDescription = "Wedding Session with Photography 2022 package discount";
    }
    WeddingSessionWithPhoto2022Discount.prototype.validate = function (discountedService, selectedServices, year) {
        if (discountedService !== "WeddingSession") {
            return null;
        }
        if (year !== 2022) {
            return null;
        }
        if (selectedServices.filter(function (x) { return x === "WeddingSession" || x === "Photography"; }).length === 2) {
            return new Discount_1.Discount(this.discountValue, this.discountDescription);
        }
        return null;
    };
    return WeddingSessionWithPhoto2022Discount;
}());
exports.WeddingSessionWithPhoto2022Discount = WeddingSessionWithPhoto2022Discount;
