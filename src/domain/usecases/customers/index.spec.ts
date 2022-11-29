import { ICreate } from "@infra/repositories/costumers";
import { CustomersUseCase } from ".";

class CustomersRepositorySpy {
  fetchByIdParams = "";
  zipCode = "";
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

  fetchAll() {
    return [this.customer];
  }

  fetchById(id: string) {
    this.fetchByIdParams = id;
    return this.customer;
  }

  getAddress(zipCode: string) {
    this.zipCode = zipCode;
    return this.customer;
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

  it("should be able to fetch all customers", async () => {
    const { sut, customersRepositorySpy } = makeSut();
    const customers = await sut.fetchAll();
    expect(customers).toEqual([customersRepositorySpy.customer]);
  });

  it("should be able to fetch a customer by id", async () => {
    const { sut, customersRepositorySpy } = makeSut();
    const customer = await sut.fetchById("any_id");
    expect(customer).toEqual(customersRepositorySpy.customer);
    expect(customersRepositorySpy.fetchByIdParams).toBe("any_id");
  });

  it("should be able to fetch a customer by zip code", async () => {
    const { sut, customersRepositorySpy } = makeSut();
    const customer = await sut.getAddress("any_zip_code");
    expect(customer).toEqual(customersRepositorySpy.customer);
    expect(customersRepositorySpy.zipCode).toBe("any_zip_code");
  });
});
