import { Validator } from "./Validator";
import { ServiceType } from "../..";
import { ValidationResult } from "./ValidationResult";
import { UpdateSelectedServicesValidatorProvider } from "./UpdateSelectedServicesValidatorProvider";

export class UpdateSelectedServicesValidator implements Validator {

    private validatorProvider: UpdateSelectedServicesValidatorProvider;

    constructor() {
        this.validatorProvider = new UpdateSelectedServicesValidatorProvider();
    }

    public validate(previouslySelectedServices: ServiceType[],
                    action: { type: "Select" | "Deselect"; service: ServiceType; }
        ): ValidationResult
    {
        const validators = this.validatorProvider.getValidators(action.type);
        const msgSeparator = " ## ";
        const validationResult = new ValidationResult(true, "");

        validators.forEach(element => {
            const result = element.validate(previouslySelectedServices, action);
            if (!result.isValid) {
                validationResult.isValid = false;
                validationResult.errorMsg += msgSeparator + result.errorMsg;
            }
        });

        return validationResult;
    }
}