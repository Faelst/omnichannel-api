import { Validation } from "@presentations/protocols/validation";
import { InvalidParamError } from "@utils/errors/invalidParams";
import { ZipCodeValidator } from "../protocols/zip-code-validation";

export class ZipCodeValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly zipCodeValidator: ZipCodeValidator
  ) {
    this.fieldName = fieldName;
    this.zipCodeValidator = zipCodeValidator;
  }

  validate(input: any): any {
    const isValid = this.zipCodeValidator.isValid(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
