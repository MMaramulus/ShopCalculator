export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: 'Select' | "Deselect"; service: ServiceType }
) => {
    if (action.type === "Select")
    {
        if (previouslySelectedServices.some(x => x === action.service))
        {
            return previouslySelectedServices;
        }
        previouslySelectedServices.push(action.service);
        return previouslySelectedServices;
    }
    if (action.type === "Deselect")
    {
        if (previouslySelectedServices.some(x => x === action.service))
        {
            previouslySelectedServices.pop();
            return previouslySelectedServices;
        }
        return previouslySelectedServices;
    }
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => ({ basePrice: 0, finalPrice: 0 });