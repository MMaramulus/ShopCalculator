import { ServiceType } from "../..";
import { DiscountValidator } from "../model/DiscountValidator";
import { ServiceYearOrAny } from "../../common/commonTypes";
import { Discount } from "../model/Discount";

export class WeddingSessionWithPhotoOrVideoDiscount implements DiscountValidator {

    private readonly discountValue: number = -300;
    private readonly discountDescription = "Wedding Session with Video Recording or Photography package discount";

    public validate(discountedService: ServiceType, selectedServices: ServiceType[], year: ServiceYearOrAny): Discount {
        if (discountedService !== "WeddingSession") {
            return null;
        }

        if (!selectedServices.some(x => x === "WeddingSession")) {
            return null;
        }

        if (selectedServices.filter(x => x === "Photography" || x === "VideoRecording").length >= 1) {
            return new Discount(this.discountValue, this.discountDescription);
        }
        return null;
    }
}
