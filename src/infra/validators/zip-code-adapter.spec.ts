import { ZipCodeValidationAdapter } from "./zip-code-adapter";

const makeSut = () => {
  const sut = new ZipCodeValidationAdapter();

  return {
    sut,
  };
};

describe("Zip Code Validation Adapter", () => {
  it("should return true if zip code is valid", () => {
    const validZipCode = "12345-678";
    const { sut } = makeSut();
    const isValid = sut.isValid(validZipCode);
    expect(isValid).toBe(true);
  });

  it("should return false if zip code is invalid", () => {
    const { sut } = makeSut();
    const isValid = sut.isValid("invalid_zip_code");
    expect(isValid).toBe(false);
  });
});
