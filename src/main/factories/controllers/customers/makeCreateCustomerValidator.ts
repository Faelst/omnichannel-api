import { ZipCodeValidationAdapter } from "@infra/validators/zip-code-adapter";
import { Validation } from "@presentations/protocols/validation";
import { ValidationComposite } from "@validation/validators/validation-composite";
import { ZipCodeValidation } from "@validation/validators/zip-code-validation";

export const makeCreateCustomerValidator = () => {
  const validators: Validation[] = [];

  validators.push(
    new ZipCodeValidation("zipCode", new ZipCodeValidationAdapter())
  );

  return new ValidationComposite(validators);
};
