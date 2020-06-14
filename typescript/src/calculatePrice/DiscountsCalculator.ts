import { ServiceType, ServiceYear } from "..";
import { DiscountValidator } from "./DiscountValidator";
import { Discount } from "./Discount";
import { ServiceYearOrAny, anyYear } from "../common/commonTypes";

export class DiscountsCalculator {

    private validators : DiscountValidator[];
    constructor() {
    }

    public getDiscounts(service: ServiceType, selectedServices: ServiceType[], year: ServiceYear) : Discount[]
    {
        const discounts : Discount[] = [];
        const validators = this.getValidators();
        validators.forEach(x => {
            const discount = x.validate(service, selectedServices, year);
            if (discount) {
                discounts.push(discount);
            }
        });
        return discounts;
    }

    public getHighestDiscounts(service: ServiceType, selectedServices: ServiceType[], year: ServiceYear): Discount
    {
        const discounts = this.getDiscounts(service, selectedServices, year);

        if (!discounts || discounts.length === 0)
        {
            return null;
        }
        const maxDiscount = discounts.reduce( (prev, current) => {
                return (prev.value < current.value) ? prev : current;
            });

        return maxDiscount;
    }

    private getValidators(): DiscountValidator[]
    {
        if (this.validators)
        {
            return this.validators;
        }

        const validators: DiscountValidator[] = [];
        validators.push(new PhotoVideoDiscount());
        validators.push(new WeddingSessionWithPhotoOrVideoDiscount());
        validators.push(new WeddingSessionWithPhoto2022Discount());
        this.validators = validators;

        return this.validators;
    }
}

class PhotoVideoDiscount implements DiscountValidator {

    private readonly discountValueMatrix : Map<ServiceYearOrAny, number> =
                    new Map([
                                [2020, -1200],
                                [2021, -1300],
                                [2022, -1300],
                            ]);

    private readonly discountDescription = "Photography and Video Recording package discount";

    public validate(discountedService: ServiceType, selectedServices: ServiceType[], year : ServiceYearOrAny): Discount
    {
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

class WeddingSessionWithPhotoOrVideoDiscount implements DiscountValidator {

    private readonly discountValue : number = -300;

    private readonly discountDescription = "Wedding Session with Video Recording or Photography package discount";

    public validate(discountedService: ServiceType, selectedServices: ServiceType[], year : ServiceYearOrAny): Discount
    {
        if (discountedService !== "WeddingSession") {
            return null;
        }

        if (!selectedServices.some(x => x === "WeddingSession"))
        {
            return null;
        }

        if (selectedServices.filter(x => x === "Photography" || x === "VideoRecording").length >= 1) {
                return new Discount(this.discountValue, this.discountDescription);
        }
        return null;
    }
}

class WeddingSessionWithPhoto2022Discount implements DiscountValidator {

    private readonly discountValue : number = -600;

    private readonly discountDescription = "Wedding Session with Photography 2022 package discount";

    public validate(discountedService: ServiceType, selectedServices: ServiceType[], year : ServiceYearOrAny): Discount
    {
        if (discountedService !== "WeddingSession") {
            return null;
        }

        if (year !== 2022)
        {
            return null;
        }
        if (selectedServices.filter(x => x === "WeddingSession" || x === "Photography").length === 2)
        {
            return new Discount(this.discountValue, this.discountDescription);
        }

        return null;
    }
}