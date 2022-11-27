import { faker } from "@faker-js/faker";
import { Customer } from "../customers";
import { Contact } from "./index";
import { Channel } from "../channels";

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

const makeSut = async () => {
  const customers = new Customer();
  const channels = new Channel();
  const sut = new Contact();

  const customer = await customers.create(createFakeCustomer());
  const channel = await channels.create({ name: faker.name.firstName() });

  return { sut, customer, channel };
};

describe("Contacts model", () => {
  it("should create return a contact", async () => {
    const { sut, channel, customer } = await makeSut();

    const contact = await sut.create({
      protocol: "any_protocol",
      customer_id: customer[0].id,
      entry_channel_id: channel[0].id,
      is_finished: false,
    });

    expect(contact).toBeTruthy();
    expect(contact[0].customer_id).toBe(customer[0].id);
    expect(contact[0].entry_channel_id).toBe(channel[0].id);
  });

  it("should return full data of a contact", async () => {
    const { sut, channel, customer } = await makeSut();

    const contact = await sut.create({
      protocol: "any_protocol",
      customer_id: customer[0].id,
      entry_channel_id: channel[0].id,
      is_finished: false,
    });

    const contactData = await sut.getFullById(contact[0].id);

    expect(contactData).toBeTruthy();
    expect(contactData.customer_name).toBe(customer[0].name);
    expect(contactData.channel_name).toBe(channel[0].name);
  });
});
