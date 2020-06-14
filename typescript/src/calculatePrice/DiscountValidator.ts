import { ServiceType, ServiceYear } from "../..";
import { Discount } from "./Discount";

export interface DiscountValidator {
    validate(discountedService:ServiceType, selectedServices: ServiceType[], year : ServiceYear): Discount;
}
