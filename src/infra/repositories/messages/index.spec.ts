import { MessagesRepository } from ".";

class MessageModelSpy {
  message: any;

  find() {
    return [this.message];
  }

  create(message: any) {
    this.message = message;
    return [this.message];
  }
}
const makeSut = () => {
  const messageModelSpy = new MessageModelSpy();

  const sut = new MessagesRepository(messageModelSpy as any);

  return {
    sut,
    messageModelSpy,
  };
};

describe("Messages Repository", () => {
  it("should return all messages when fetch all is called", async () => {
    const { sut, messageModelSpy } = makeSut();

    const messages = await sut.fetchAll();

    expect(messages).toEqual([messageModelSpy.message]);
  });

  it("should return a message when create is called", async () => {
    const { sut, messageModelSpy } = makeSut();

    const message = await sut.create({
      content: "any_content",
      customer_id: "any_customer_id",
      user_id: "any_user_id",
      from_channel_id: "any_from_channel_id",
      contact_id: "any_contact_id",
    });

    expect(message).toEqual([messageModelSpy.message]);
  });
});
