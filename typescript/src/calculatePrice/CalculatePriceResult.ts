
export class CalculatePriceResult {
    public basePrice: number;
    public finalPrice: number;

    constructor(basePrice: number = 0, finalPrice: number = 0) {
        this.basePrice = basePrice;
        this.finalPrice = finalPrice;
    }
}
