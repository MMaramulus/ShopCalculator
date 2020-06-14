import { ServiceType, ServiceYear } from "..";
import { DiscountValidator } from "./DiscountValidator";
import { Discount } from "./Discount";
import { ServiceYearOrAny, anyYear } from "../common/commonTypes";



export class DiscountsCalculator {

    private validators : DiscountValidator[];
    constructor() {
    }

    public getDiscounts(services: ServiceType[], year: ServiceYear) : Discount[]
    {
        const discounts : Discount[] = [];
        const validators = this.getValidators();
        validators.forEach(x => {
            const discount = x.validate(services, year);
            if (discount) {
                discounts.push(discount);
            }
        });
        return discounts;
    }

    public getHighestDiscounts(services: ServiceType[], year: ServiceYear): Discount
    {
        const discounts = this.getDiscounts(services, year);

        if (!discounts || discounts.length === 0)
        {
            return null;
        }
        const maxDiscount = discounts.reduce( (prev, current) => {
                return (prev.value < current.value) ? prev : current;
            });

        return maxDiscount;
        // // package Photography + Video discount
        // pricesMap.set({service : "Photography + Video", year: 2020}, -1200 ); //2200
        // pricesMap.set({service : "Photography + Video", year: 2021}, -1300);  //2300
        // pricesMap.set({service : "Photography + Video", year: 2022}, -1300);  //2500

        // // wedding session costs regularly $600, but in a package with photography during the wedding or with a video recording it costs $300
        // pricesMap.set({service : "WeddingSession + Video", year: "*"}, -300);          // 300 for wedding sesion when with video or photographt
        // pricesMap.set({service : "WeddingSession + Photography", year: "*"}, -300);    // 300 for wedding sesion when with video

        // // wedding session is free if the client chooses Photography during the wedding in 2022
        // pricesMap.set({service : "WeddingSession + Photography", year: "2022"}, -600); // 0 for weeding session when with photo (with or without 2 days)
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

    public validate(selectedServices: ServiceType[], year : ServiceYearOrAny): Discount
    {
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

    public validate(selectedServices: ServiceType[], year : ServiceYearOrAny): Discount
    {
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

    public validate(selectedServices: ServiceType[], year : ServiceYearOrAny): Discount
    {
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