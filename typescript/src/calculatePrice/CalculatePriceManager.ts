import { ServiceType, ServiceYear } from "..";
import { CalculatePriceResult } from "./model/CalculatePriceResult";
import { BasePriceProvider } from "./BasePriceProvider";
import { DiscountsProvider } from "./DiscountsProvider";

export class CalculatePriceManager {

    private readonly servicePriceProvider: BasePriceProvider;
    private readonly discountsCalculator: DiscountsProvider;

    constructor() {
        this.servicePriceProvider = new BasePriceProvider();
        this.discountsCalculator = new DiscountsProvider();
    }

    public calculatePrice(selectedServices: ServiceType[], selectedYear: ServiceYear) : CalculatePriceResult
    {
        const result = new CalculatePriceResult(0, 0);
        selectedServices.forEach(service => {
            const servicePrice = this.servicePriceProvider.getPrice(service, selectedYear);
            const serviceDiscount = this.discountsCalculator.getHighestDiscount(service, selectedServices, selectedYear);
            result.basePrice += servicePrice;
            result.finalPrice += servicePrice + (serviceDiscount?.value ?? 0);
        });

        return result;
    }
}
