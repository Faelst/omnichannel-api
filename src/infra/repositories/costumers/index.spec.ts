import { CustomersRepository, ICreate } from ".";

class CustomerModelSpy {
  findByIdParamId = "";

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

    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
  };

  create(customer: ICreate) {
    return customer;
  }

  find() {
    return [this.customer];
  }

  findById(id: string) {
    this.findByIdParamId = id;
    return this.customer;
  }
}

const makeSut = () => {
  const customerModelSpy = new CustomerModelSpy();

  const sut = new CustomersRepository(customerModelSpy as any);

  return {
    sut,
    customerModelSpy,
  };
};

describe("Customers Repository", () => {
  it("should return all customers when fetch all is called", async () => {
    const { sut, customerModelSpy } = makeSut();

    const customers = await sut.fetchAll();

    expect(customers).toEqual([customerModelSpy.customer]);
  });

  it("should return a customer when fetch by id is called", async () => {
    const { sut, customerModelSpy } = makeSut();

    const customer = await sut.fetchById("any_id");

    expect(customer).toEqual(customerModelSpy.customer);
    expect(customerModelSpy.findByIdParamId).toBe("any_id");
  });

  it("should return a customer when create is called", async () => {
    const { sut, customerModelSpy } = makeSut();

    const customer = await sut.create(customerModelSpy.customer as ICreate);

    expect(customer).toEqual(customerModelSpy.customer);
  });
});
