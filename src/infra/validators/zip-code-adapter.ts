import { ZipCodeValidator } from "src/validation/protocols/zip-code-validation";

export class ZipCodeValidationAdapter implements ZipCodeValidator {
  isValid(zipCode: string): boolean {
    return /^[0-9]{5}-[0-9]{3}$/.test(zipCode);
  }
}
