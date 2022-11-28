import { CustomersRepository, ICreate } from ".";

class CustomerModelSpy {
  findByIdParamId = "";

  costumer = {
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
    return [this.costumer];
  }

  findById(id: string) {
    this.findByIdParamId = id;
    return this.costumer;
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

describe("Costumers Repository", () => {
  it("should return all costumers when fetch all is called", async () => {
    const { sut, customerModelSpy } = makeSut();

    const costumers = await sut.fetchAll();

    expect(costumers).toEqual([customerModelSpy.costumer]);
  });

  it("should return a costumer when fetch by id is called", async () => {
    const { sut, customerModelSpy } = makeSut();

    const costumer = await sut.fetchById("any_id");

    expect(costumer).toEqual(customerModelSpy.costumer);
    expect(customerModelSpy.findByIdParamId).toBe("any_id");
  });

  it("should return a costumer when create is called", async () => {
    const { sut, customerModelSpy } = makeSut();

    const costumer = await sut.create(customerModelSpy.costumer as ICreate);

    expect(costumer).toEqual(customerModelSpy.costumer);
  });
});
