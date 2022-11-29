import { ICreate } from "@infra/repositories/costumers";
import { CustomersUseCase } from ".";

class CustomersRepositorySpy {
  customer = {
    name: "any_name",
    email: "any_email",
    document: "any_document",
    phone: "any_phone",
    zip_code: "any_zip_code",
    address: "any_address",
    number: 1,
    complement: "any_complement",
    neighborhood: "any_neighborhood",
    city: "any_city",
    state: "any_state",
    country: "any_country",
  };

  create(customer: ICreate) {
    return customer;
  }
}

const makeSut = () => {
  const customersRepositorySpy = new CustomersRepositorySpy();
  const sut = new CustomersUseCase(customersRepositorySpy as any);
  return {
    sut,
    customersRepositorySpy,
  };
};

describe("Customers UseCase", () => {
  it("should be able to create a customer", async () => {
    const { sut, customersRepositorySpy } = makeSut();
    const customer = await sut.create({
      name: "any_name",
      email: "any_email",
      document: "any_document",
      phone: "any_phone",
      zip_code: "any_zip_code",
      address: "any_address",
      number: 1,
      complement: "any_complement",
      neighborhood: "any_neighborhood",
      city: "any_city",
      state: "any_state",
      country: "any_country",
    });
    expect(customer).toEqual(customersRepositorySpy.customer);
  });
});
