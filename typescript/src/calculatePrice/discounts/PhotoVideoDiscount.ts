import { ServiceType } from "../..";
import { DiscountValidator } from "../model/DiscountValidator";
import { ServiceYearOrAny, anyYear } from "../../common/commonTypes";
import { Discount } from "../model/Discount";
export class PhotoVideoDiscount implements DiscountValidator {

    private readonly discountValueMatrix: Map<ServiceYearOrAny, number> = new Map([
        [2020, -1200],
        [2021, -1300],
        [2022, -1300],
    ]);

    private readonly discountDescription = "Photography and Video Recording package discount";

    public validate(discountedService: ServiceType, selectedServices: ServiceType[], year: ServiceYearOrAny): Discount {
        if (discountedService !== "Photography") {
            return null;
        }
        if (selectedServices.filter(x => x === "Photography" || x === "VideoRecording").length === 2) {
            let result = this.discountValueMatrix.get(year);
            if (result) {
                return new Discount(result, this.discountDescription);
            }
            result = this.discountValueMatrix.get(anyYear);
            if (result) {
                return new Discount(result, this.discountDescription);
            }
        }
        return null;
    }
}
