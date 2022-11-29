import { ServerError } from "@presentations/errors";
import { Validation } from "@presentations/protocols/validation";
import { CreateCustomerController } from "./create";

class ValidationSpy implements Validation {
  input: any;
  error: any = null;

  validate(input: any): Error {
    this.input = input;
    return this.error;
  }
}

class CreateCustomerUseCaseSpy {
  customer: any;
  zipCode: any;
  address: any;

  async create(customer: any) {
    this.customer = customer;
  }

  async getAddress(zipCode: string) {
    this.zipCode = zipCode;
    this.address = {
      cep: "12345678",
      logradouro: "Rua dos Bobos",
      complemento: "casa 1",
      bairro: "Bairro dos Bobos",
      localidade: "São Paulo",
      uf: "SP",
    };

    return this.address;
  }
}

const makeSut = () => {
  const validationSpy = new ValidationSpy();
  const createCustomerUseCaseSpy = new CreateCustomerUseCaseSpy();

  const sut = new CreateCustomerController(
    validationSpy,
    createCustomerUseCaseSpy as any
  );

  return {
    sut,
    validationSpy,
    createCustomerUseCaseSpy,
  };
};

describe("Create Customer Controller", () => {
  it("should call CreateCustomerUseCase with correct values", async () => {
    const { sut, createCustomerUseCaseSpy } = makeSut();

    const request = {
      name: "any_name",
      email: "any_email",
      document: "any_document",
      phone: "any_phone",
      zip_code: "any_zip_code",
      number: 1,
      country: "any_country",
    };

    await sut.handle(request);

    expect(createCustomerUseCaseSpy.customer).toEqual({
      ...request,
      zip_code: createCustomerUseCaseSpy.address.cep,
      address: createCustomerUseCaseSpy.address.logradouro,
      complement: createCustomerUseCaseSpy.address.complemento,
      neighborhood: createCustomerUseCaseSpy.address.bairro,
      city: createCustomerUseCaseSpy.address.localidade,
      state: createCustomerUseCaseSpy.address.uf,
    });
  });

  it("should return 400 if Validation returns an error", async () => {
    const { sut, validationSpy } = makeSut();

    const error = new Error("any_error_message");

    validationSpy.error = error;

    const httpResponse = await sut.handle({
      name: "any_name",
      email: "any_email",
      document: "any_document",
      phone: "any_phone",
      zip_code: "any_zip_code",
      number: 1,
      country: "any_country",
    });

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(error);
  });

  it("should return 500 if CreateCustomerUseCase throws", async () => {
    const { sut, createCustomerUseCaseSpy } = makeSut();

    jest
      .spyOn(createCustomerUseCaseSpy, "create")
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const httpResponse = await sut.handle({
      name: "any_name",
      email: "any_email",
      document: "any_document",
      phone: "any_phone",
      zip_code: "any_zip_code",
      number: 1,
      country: "any_country",
    });

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
