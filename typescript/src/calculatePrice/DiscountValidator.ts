import { ServiceType, ServiceYear } from "../..";
import { Discount } from "./Discount";

export interface DiscountValidator {
    validate(selectedServices: ServiceType[], year : ServiceYear): Discount;
}
