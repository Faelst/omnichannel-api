import { ServerError } from "@presentations/errors";
import { FetchCustomersController } from "./fetch-all";

class CustomersUseCaseSpy {
  costumers: any = [];

  async fetchAll() {
    return this.costumers;
  }
}

const makeSut = () => {
  const customersUseCaseSpy = new CustomersUseCaseSpy();

  const sut = new FetchCustomersController(customersUseCaseSpy as any);
  return {
    sut,
    customersUseCaseSpy,
  };
};

describe("Fetch All Customers Controller", () => {
  it("should be able to return 200", async () => {
    const { sut, customersUseCaseSpy } = makeSut();

    const customers = [
      {
        id: "any_id",
        name: "any_name",
        email: "any_email",
        password: "any_password",
      },
    ];

    customersUseCaseSpy.costumers = customers;

    const httpResponse = await sut.handle();

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual(customers);
  });

  it("should be able to return 500", async () => {
    const { sut, customersUseCaseSpy } = makeSut();

    jest.spyOn(customersUseCaseSpy, "fetchAll").mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle();

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
