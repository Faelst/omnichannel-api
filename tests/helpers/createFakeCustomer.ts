import { faker } from "@faker-js/faker";

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

export { createFakeCustomer };
