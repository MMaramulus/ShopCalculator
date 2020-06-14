"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountsProvider = void 0;
var PhotoVideoDiscount_1 = require("./discounts/PhotoVideoDiscount");
var WeddingSessionWithPhotoOrVideoDiscount_1 = require("./discounts/WeddingSessionWithPhotoOrVideoDiscount");
var WeddingSessionWithPhoto2022Discount_1 = require("./discounts/WeddingSessionWithPhoto2022Discount");
var DiscountsProvider = /** @class */ (function () {
    function DiscountsProvider() {
    }
    DiscountsProvider.prototype.getDiscounts = function (service, selectedServices, year) {
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
    DiscountsProvider.prototype.getHighestDiscount = function (service, selectedServices, year) {
        var discounts = this.getDiscounts(service, selectedServices, year);
        if (!discounts || discounts.length === 0) {
            return null;
        }
        var maxDiscount = discounts.reduce(function (prev, current) {
            return (prev.value < current.value) ? prev : current;
        });
        return maxDiscount;
    };
    DiscountsProvider.prototype.getValidators = function () {
        if (this.validators) {
            return this.validators;
        }
        var validators = [];
        validators.push(new PhotoVideoDiscount_1.PhotoVideoDiscount());
        validators.push(new WeddingSessionWithPhotoOrVideoDiscount_1.WeddingSessionWithPhotoOrVideoDiscount());
        validators.push(new WeddingSessionWithPhoto2022Discount_1.WeddingSessionWithPhoto2022Discount());
        this.validators = validators;
        return this.validators;
    };
    return DiscountsProvider;
}());
exports.DiscountsProvider = DiscountsProvider;
