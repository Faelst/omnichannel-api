import { faker } from "@faker-js/faker";

import { Channel } from "@infra/models/channels";
import { Customer } from "@infra/models/customers";

import { createFakeCustomer } from "./createFakeCustomer";

const createFakeContact = async () => {
  const customers = new Customer();
  const channels = new Channel();

  const customer = await customers.create(createFakeCustomer());
  const channel = await channels.create({ name: faker.name.firstName() });

  return {
    protocol: faker.random.alphaNumeric(5),
    customer_id: customer[0].id,
    entry_channel_id: channel[0].id,
    is_finished: false,
  };
};

export { createFakeContact };
