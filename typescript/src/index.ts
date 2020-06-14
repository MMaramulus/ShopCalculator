import { UpdateSelectedServicesManager } from "./updateSelectedServices/UpdateSelectedServicesManager";
import { CalculatePriceManager } from "./calculatePrice/CalculatePriceManager";

export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: 'Select' | "Deselect"; service: ServiceType }
) =>
{
    const updateSelectedServicesManager = new UpdateSelectedServicesManager();
    const result = updateSelectedServicesManager.updateHandler(previouslySelectedServices, action);
    return result;
};

export const calculatePrice = (
    selectedServices: ServiceType[],
    selectedYear: ServiceYear
) =>
{
    const calculatePriceManager = new CalculatePriceManager();
    const result = calculatePriceManager.calculatePrice(selectedServices, selectedYear);
    return result;
};
