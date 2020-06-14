import { ServiceType, ServiceYear } from "..";
import { ServiceYearOrAny, anyYear } from "../common/commonTypes";

export class ServicePriceProvider {

    private pricesMap;
    constructor() {
        this.loadPrices();
    }

    private getKey(serviceType: ServiceType, year: ServiceYearOrAny)
    {
        return serviceType + "##" + year;
    }

    private loadPrices()
    {
        const pricesMap = new Map();
        pricesMap.set(this.getKey("Photography", 2020), 1700);
        pricesMap.set(this.getKey("Photography", 2021), 1800);
        pricesMap.set(this.getKey("Photography", 2022), 1900);

        pricesMap.set(this.getKey("VideoRecording", 2020), 1700);
        pricesMap.set(this.getKey("VideoRecording", 2021), 1800);
        pricesMap.set(this.getKey("VideoRecording", 2022), 1900);

        pricesMap.set(this.getKey("BlurayPackage", anyYear), 300);
        pricesMap.set(this.getKey("TwoDayEvent", anyYear), 400);
        pricesMap.set(this.getKey("WeddingSession", anyYear), 600);

        this.pricesMap = pricesMap;
    }

    public getPrice(serviceType: ServiceType, serviceYear: ServiceYear) : number
    {
        let price = this.pricesMap.get(this.getKey(serviceType, serviceYear));
        if (price) {
            return price;
        }
        price = this.pricesMap.get(this.getKey(serviceType, anyYear));
        if (price) {
            return price;
        }
        return 0;
    }
}
