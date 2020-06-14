import { ServiceType, ServiceYear } from "..";
import { DiscountValidator } from "./model/DiscountValidator";
import { PhotoVideoDiscount } from "./discounts/PhotoVideoDiscount";
import { WeddingSessionWithPhotoOrVideoDiscount } from "./discounts/WeddingSessionWithPhotoOrVideoDiscount";
import { WeddingSessionWithPhoto2022Discount } from "./discounts/WeddingSessionWithPhoto2022Discount";
import { Discount } from "./model/Discount";

export class DiscountsProvider {

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

    public getHighestDiscount(service: ServiceType, selectedServices: ServiceType[], year: ServiceYear): Discount
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

