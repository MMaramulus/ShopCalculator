"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoVideoDiscount = void 0;
var commonTypes_1 = require("../../common/commonTypes");
var Discount_1 = require("../model/Discount");
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
exports.PhotoVideoDiscount = PhotoVideoDiscount;
