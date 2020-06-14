import { ServiceType, ServiceYear } from "..";
import { CalculatePriceResult } from "./CalculatePriceResult";
import { ServicePriceProvider } from "./ServicePriceProvider";
import { DiscountsCalculator } from "./DiscountsCalculator";
import { Discount } from "./Discount";

export class ServicePriceDiscount {
    public basePrice: number;
    public bestDiscount: Discount;
    public serviceName: ServiceType;

    constructor(serviceName: ServiceType, basePrice: number = 0, bestDiscount: Discount = null) {
        this.serviceName = serviceName;
        this.basePrice = basePrice;
        this.bestDiscount = bestDiscount;
    }
}

export class CalculatePriceManager {

    private readonly servicePriceProvider: ServicePriceProvider;
    private readonly discountsCalculator: DiscountsCalculator;

    constructor() {
        this.servicePriceProvider = new ServicePriceProvider();
        this.discountsCalculator = new DiscountsCalculator();
    }

    public calculatePrice(selectedServices: ServiceType[], selectedYear: ServiceYear) : CalculatePriceResult
    {
        const servicePriceDiscount: Map<ServiceType, ServicePriceDiscount> = new Map();

        selectedServices.forEach(service => {
            const record = new ServicePriceDiscount(service);
            record.basePrice = this.servicePriceProvider.getPrice(service, selectedYear);
            record.bestDiscount = this.discountsCalculator.getHighestDiscounts(service, selectedServices, selectedYear);
            servicePriceDiscount.set(service, record );
        });

        const result = new CalculatePriceResult(0, 0);
        servicePriceDiscount.forEach(service => {
            result.basePrice += service.basePrice;
            result.finalPrice += service.basePrice + (service.bestDiscount?.value ?? 0);
        });

        return result;
    }
}
