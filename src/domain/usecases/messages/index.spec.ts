import { ICreate } from "@infra/repositories/messages";
import { MessagesUseCase } from "./index";

class MessagesRepositorySpy {
  message: ICreate = {
    content: "any_content",
    contact_id: "any_contact_id",
    from_channel_id: "any_channel_id",
    user_id: "any_user_id",
    customer_id: "any_customer_id",
  };

  async create(message: ICreate) {
    this.message = message;
    return [message];
  }
}
const makeSut = () => {
  const messagesRepositorySpy = new MessagesRepositorySpy();
  const sut = new MessagesUseCase(messagesRepositorySpy as any);
  return {
    sut,
    messagesRepositorySpy,
  };
};

describe("Messages UseCase", () => {
  it("should be able to create a message", async () => {
    const { sut, messagesRepositorySpy } = makeSut();
    const message = await sut.create({
      content: "any_content",
      contactId: "any_contact_id",
      channelId: "any_channel_id",
      userId: "any_user_id",
      customerId: "any_customer_id",
    });
    expect(message).toEqual([messagesRepositorySpy.message]);
  });

  it("should be able to create a message without user_id", async () => {
    const { sut, messagesRepositorySpy } = makeSut();
    const message = await sut.create({
      content: "any_content",
      contactId: "any_contact_id",
      channelId: "any_channel_id",
    });
    expect(message).toEqual([messagesRepositorySpy.message]);
  });
});
