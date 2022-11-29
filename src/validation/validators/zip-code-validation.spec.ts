import { InvalidParamError } from "@utils/errors/invalidParams";
import { ZipCodeValidation } from "./zip-code-validation";

class ZipCodeValidatorSpy {
  _isValid = true;
  zipCode = "";

  isValid(zipCode: string): boolean {
    this.zipCode = zipCode;
    return this._isValid;
  }
}

const makeSut = () => {
  const zipCodeValidatorSpy = new ZipCodeValidatorSpy();

  const sut = new ZipCodeValidation("zip_code", zipCodeValidatorSpy as any);

  return {
    sut,
    zipCodeValidatorSpy,
  };
};

describe("Zip Code Validation", () => {
  it("should return an error if zip code is invalid", () => {
    const { sut, zipCodeValidatorSpy } = makeSut();
    zipCodeValidatorSpy._isValid = false;
    const error = sut.validate({ zip_code: "any_zip_code" });
    expect(error).toEqual(new InvalidParamError("zip_code"));
  });
});
