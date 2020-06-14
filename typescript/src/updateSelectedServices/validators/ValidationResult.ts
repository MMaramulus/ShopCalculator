
export class ValidationResult {
    public isValid: boolean;
    public errorMsg: string;

    constructor(isValid: boolean, errorMsg: string) {
        this.isValid = isValid;
        this.errorMsg = errorMsg;
    }
}
