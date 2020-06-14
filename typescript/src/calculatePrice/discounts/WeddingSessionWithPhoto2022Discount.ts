import { ServiceType } from "../..";
import { DiscountValidator } from "../model/DiscountValidator";
import { ServiceYearOrAny } from "../../common/commonTypes";
import { Discount } from "../model/Discount";

export class WeddingSessionWithPhoto2022Discount implements DiscountValidator {

    private readonly discountValue: number = -600;
    private readonly discountDescription = "Wedding Session with Photography 2022 package discount";

    public validate(discountedService: ServiceType, selectedServices: ServiceType[], year: ServiceYearOrAny): Discount {
        if (discountedService !== "WeddingSession") {
            return null;
        }

        if (year !== 2022) {
            return null;
        }
        if (selectedServices.filter(x => x === "WeddingSession" || x === "Photography").length === 2) {
            return new Discount(this.discountValue, this.discountDescription);
        }

        return null;
    }
}
