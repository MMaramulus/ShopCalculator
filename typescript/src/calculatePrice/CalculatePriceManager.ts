import { ServiceType, ServiceYear } from "..";
import { CalculatePriceResult } from "./CalculatePriceResult";
import { ServicePriceProvider } from "./ServicePriceProvider";
import { DiscountsCalculator } from "./DiscountsCalculator";

export class CalculatePriceManager {

    private readonly servicePriceProvider: ServicePriceProvider;
    private readonly discountsCalculator: DiscountsCalculator;

    constructor() {
        this.servicePriceProvider = new ServicePriceProvider();
        this.discountsCalculator = new DiscountsCalculator();
    }

    public calculatePrice(selectedServices: ServiceType[], selectedYear: ServiceYear) : CalculatePriceResult
    {
        let basePrice = 0;
        selectedServices.forEach(x => basePrice += this.servicePriceProvider.getPrice(x, selectedYear));
        const highestDiscount = this.discountsCalculator.getHighestDiscounts(selectedServices, selectedYear);

        const result = new CalculatePriceResult(basePrice, basePrice);
        result.finalPrice += highestDiscount?.value ?? 0;
        return result;
    }
}
