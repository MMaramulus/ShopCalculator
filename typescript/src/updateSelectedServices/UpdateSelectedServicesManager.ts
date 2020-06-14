import { ServiceType } from "..";
import { UpdateSelectedServicesValidator } from "./validators/UpdateSelectedServicesValidator";

export class UpdateSelectedServicesManager {
    private readonly updateSelectedServicesValidator: UpdateSelectedServicesValidator;

    constructor() {
        this.updateSelectedServicesValidator = new UpdateSelectedServicesValidator();
    }

    public updateHandler(previouslySelectedServices: ServiceType[],
        action: { type: 'Select' | "Deselect"; service: ServiceType }) : ServiceType[]
    {

        const validationResult = this.updateSelectedServicesValidator.validate(previouslySelectedServices, action);
        if (!validationResult.isValid) {
            // throw new Error(validationResult.errorMsg);
            return previouslySelectedServices;
        }

        switch(action.type) {
            case 'Select':  {
                previouslySelectedServices.push(action.service);
                return previouslySelectedServices;
             }
             case 'Deselect':{
                const index = previouslySelectedServices.indexOf(action.service);
                if (index > -1) {
                    // using splice instead of filter in case of many services with the name were added, but we want to remove only one (my assumption)
                    previouslySelectedServices.splice(index, 1);

                    this.removeTwoDayEventWhenNotNeeded(previouslySelectedServices);
                }
                return previouslySelectedServices;
             }
             default: {
                throw new Error("Unrecognized action type: "+action.type);
             }
        }

        return previouslySelectedServices;
    }

    private removeTwoDayEventWhenNotNeeded(previouslySelectedServices: ServiceType[]) {
        if ((!previouslySelectedServices.some(x => x === "WeddingSession")
                || previouslySelectedServices.filter(x => x === "VideoRecording" || x === "Photography").length === 0))
        {
            this.updateHandler(previouslySelectedServices, {
                type: "Deselect",
                service: "TwoDayEvent",
            });
        }
    }
}
