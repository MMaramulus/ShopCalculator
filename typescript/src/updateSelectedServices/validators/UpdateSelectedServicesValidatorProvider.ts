import { Validator } from "./Validator";
import { ServiceType } from "../..";
import { ValidationResult } from "./ValidationResult";

export class UpdateSelectedServicesValidatorProvider {
    public getValidators(type: 'Select' | "Deselect") {
        const validators: Validator[] = [];
        switch (type) {
            case 'Select': {
                validators.push(new SelectAlreadySelectedValidator());
                validators.push(new SelectBlurayPackageValidator());
                validators.push(new SelectTwoDayEventValidator());
                break;
            }
            case 'Deselect': {
                validators.push(new DeselectUnselectedValidator());
                break;
            }
        }
        return validators;
    }
}

// It does not make sense to include the price of the Extra Blu-ray when the client did not choose a video recording.
class SelectBlurayPackageValidator implements Validator {
    public validate(previouslySelectedServices: ServiceType[],
        action: { type: "Select" | "Deselect"; service: ServiceType; }): ValidationResult
    {
        if (action.type === 'Select'
            && action.service === 'BlurayPackage'
            && !previouslySelectedServices.some(x=> x === 'VideoRecording'))
        {
            return new ValidationResult(false, "It does not make sense to include the price of the Extra Blu-ray when the client did not choose a video recording.");
        }
        return new ValidationResult(true, "");
    }
}

// It does not make sense to select already selected service
class SelectAlreadySelectedValidator implements Validator {
    public validate(previouslySelectedServices: ServiceType[],
        action: { type: "Select" | "Deselect"; service: ServiceType; }): ValidationResult
    {
        if (action.type === 'Select'
            && previouslySelectedServices.some(x => x === action.service))
        {
            return new ValidationResult(false, "It does not make sense to select already selected service");
        }
        return  new ValidationResult(true, "");
    }
}

// It does not make sense to include the price of handling two-day event when the client did not choose video recording or photography during the wedding.
class SelectTwoDayEventValidator implements Validator {
    public validate(previouslySelectedServices: ServiceType[],
        action: { type: "Select" | "Deselect"; service: ServiceType; }): ValidationResult
    {
        if (action.type === 'Select'
            && action.service === 'TwoDayEvent'
            && previouslySelectedServices.filter(x=> x === 'VideoRecording' || x === 'Photography').length === 0)
        {
            return new ValidationResult(false, "It does not make sense to include the price of handling two-day event when the client did not choose video recording or photography during the wedding.");
        }
        return new ValidationResult(true, "");
    }
}

// service was not selected and cannot be deselected
class DeselectUnselectedValidator implements Validator {
    public validate(previouslySelectedServices: ServiceType[],
        action: { type: "Select" | "Deselect"; service: ServiceType; }): ValidationResult
    {
        if (action.type === 'Deselect'
            && !previouslySelectedServices.some(x => x === action.service))
        {
            return new ValidationResult(false, action.service + " was not selected and cannot be deselected");
        }
        return  new ValidationResult(true, "");
    }
}
