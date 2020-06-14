import { ServiceType } from "../..";
import { ValidationResult } from "./ValidationResult";

export interface Validator {
    validate(previouslySelectedServices: ServiceType[],
        action: { type: "Select" | "Deselect"; service: ServiceType; }
    ): ValidationResult;
}
