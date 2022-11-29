import { Validation } from "@presentations/protocols/validation";
import { ValidationComposite } from "./validation-composite";

class ValidationSpy implements Validation {
  input: any;
  error: any = null;

  validate(input: any): Error {
    this.input = input;
    return this.error;
  }
}

const makeSut = () => {
  const validationSpy = new ValidationSpy();

  const sut = new ValidationComposite([validationSpy]);

  return {
    sut,
    validationSpy,
  };
};

describe("Validation Composite", () => {
  it("should return an error if any validation fails", () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new Error("any_error_message");
    const error = sut.validate({ any_field: "any_value" });
    expect(error).toEqual(validationSpy.error);
  });
});
