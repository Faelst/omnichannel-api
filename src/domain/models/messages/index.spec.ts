import "@tests/setup";
import { faker } from "@faker-js/faker";
import { Message } from "./index";

import { createFakeContact } from "@tests/helpers/createFakeContact";

import { Contact } from "../contacts";
import { Channel } from "../channels";

const makeSut = async () => {
  const contact = new Contact();
  const channel = new Channel();

  const contactData = await createFakeContact();

  const [contacts] = [await contact.create(contactData)];

  const channels = [
    ...(await channel.create({ name: faker.name.firstName() })),
    ...(await channel.create({ name: faker.name.firstName() })),
  ];

  const sut = new Message();

  return { sut, contacts, channels };
};

describe("Message Model", () => {
  it("should be able to create a new message", async () => {
    const { sut, contacts, channels } = await makeSut();

    const message = [
      ...(await sut.create({
        content: faker.lorem.sentence(),
        contact_id: contacts[0].id,
        from_channel_id: channels[0].id,
        customer_id: contacts[0].customer_id,
        user_id: null,
      })),
    ];

    expect(message).toHaveLength(1);
    expect(message).toBeTruthy();

    message.forEach((msg) => {
      expect(msg).toHaveProperty("id");
      expect(msg).toHaveProperty("content");
      expect(msg).toHaveProperty("contact_id");
      expect(msg).toHaveProperty("from_channel_id");
      expect(msg).toHaveProperty("customer_id");
      expect(msg).toHaveProperty("user_id");
      expect(msg).toHaveProperty("created_at");
      expect(msg).toHaveProperty("updated_at");
      expect(msg).toHaveProperty("deleted_at");
    });
  });
});
