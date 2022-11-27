import "@tests/setup";

import { Customer } from "./index";
import { createFakeCustomer } from "@tests/helpers/createFakeCustomer";

const makeSut = () => {
  const sut = new Customer();
  return { sut };
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
