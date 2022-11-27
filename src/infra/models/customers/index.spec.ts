import "@tests/setup";

import { faker } from "@faker-js/faker";
import { Customer } from "./index";

const makeSut = () => {
  const sut = new Customer();
  return { sut };
};

const createFakeCustomer = () => {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    document: faker.random.numeric(11),
    phone: faker.random.numeric(11),
    zip_code: faker.random.numeric(8),
    address: faker.address.streetAddress(),
    number: faker.random.numeric(5),
    complement: faker.address.secondaryAddress(),
    neighborhood: faker.address.county(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
  };
};

describe("Costumer model", () => {
  it("should create return a Customer", async () => {
    const { sut } = makeSut();

    const costumer = await sut.create(createFakeCustomer());

    expect(costumer).toBeTruthy();
  });

  it("should return a Customer when get by id", async () => {
    const { sut } = makeSut();

    const fakerCustomer = await sut.create(createFakeCustomer());

    const costumer = await sut.findById(fakerCustomer[0].id);

    Object.keys(fakerCustomer[0]).forEach((key) => {
      expect(costumer[key]).toEqual(fakerCustomer[0][key]);
    });

    expect(costumer.id).toBe(fakerCustomer[0].id);
  });
});
