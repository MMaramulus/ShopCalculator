"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeddingSessionWithPhotoOrVideoDiscount = void 0;
var Discount_1 = require("../model/Discount");
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
exports.WeddingSessionWithPhotoOrVideoDiscount = WeddingSessionWithPhotoOrVideoDiscount;
