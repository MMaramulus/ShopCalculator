"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountsCalculator = void 0;
var Discount_1 = require("./Discount");
var commonTypes_1 = require("../common/commonTypes");
var DiscountsCalculator = /** @class */ (function () {
    function DiscountsCalculator() {
    }
    DiscountsCalculator.prototype.getDiscounts = function (service, selectedServices, year) {
        var discounts = [];
        var validators = this.getValidators();
        validators.forEach(function (x) {
            var discount = x.validate(service, selectedServices, year);
            if (discount) {
                discounts.push(discount);
            }
        });
        return discounts;
    };
    DiscountsCalculator.prototype.getHighestDiscounts = function (service, selectedServices, year) {
        var discounts = this.getDiscounts(service, selectedServices, year);
        if (!discounts || discounts.length === 0) {
            return null;
        }
        var maxDiscount = discounts.reduce(function (prev, current) {
            return (prev.value < current.value) ? prev : current;
        });
        return maxDiscount;
    };
    DiscountsCalculator.prototype.getValidators = function () {
        if (this.validators) {
            return this.validators;
        }
        var validators = [];
        validators.push(new PhotoVideoDiscount());
        validators.push(new WeddingSessionWithPhotoOrVideoDiscount());
        validators.push(new WeddingSessionWithPhoto2022Discount());
        this.validators = validators;
        return this.validators;
    };
    return DiscountsCalculator;
}());
exports.DiscountsCalculator = DiscountsCalculator;
var PhotoVideoDiscount = /** @class */ (function () {
    function PhotoVideoDiscount() {
        this.discountValueMatrix = new Map([
            [2020, -1200],
            [2021, -1300],
            [2022, -1300],
        ]);
        this.discountDescription = "Photography and Video Recording package discount";
    }
    PhotoVideoDiscount.prototype.validate = function (discountedService, selectedServices, year) {
        if (discountedService !== "Photography") {
            return null;
        }
        if (selectedServices.filter(function (x) { return x === "Photography" || x === "VideoRecording"; }).length === 2) {
            var result = this.discountValueMatrix.get(year);
            if (result) {
                return new Discount_1.Discount(result, this.discountDescription);
            }
            result = this.discountValueMatrix.get(commonTypes_1.anyYear);
            if (result) {
                return new Discount_1.Discount(result, this.discountDescription);
            }
        }
        return null;
    };
    return PhotoVideoDiscount;
}());
var WeddingSessionWithPhotoOrVideoDiscount = /** @class */ (function () {
    function WeddingSessionWithPhotoOrVideoDiscount() {
        this.discountValue = -300;
        this.discountDescription = "Wedding Session with Video Recording or Photography package discount";
    }
    WeddingSessionWithPhotoOrVideoDiscount.prototype.validate = function (discountedService, selectedServices, year) {
        if (discountedService !== "WeddingSession") {
            return null;
        }
        if (!selectedServices.some(function (x) { return x === "WeddingSession"; })) {
            return null;
        }
        if (selectedServices.filter(function (x) { return x === "Photography" || x === "VideoRecording"; }).length >= 1) {
            return new Discount_1.Discount(this.discountValue, this.discountDescription);
        }
        return null;
    };
    return WeddingSessionWithPhotoOrVideoDiscount;
}());
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
