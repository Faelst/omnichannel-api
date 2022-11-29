import { ICreate } from "@infra/repositories/contacts";
import { ContactsUseCase } from ".";

class ContactRepositorySpy {
  getFullByParamId = "";
  contact = {
    protocol: "123456789",
    customer_id: "1",
    entry_channel_id: "1",
    is_finished: false,
  };

  async fetchAll() {
    return [this.contact];
  }

  async create(contact: ICreate) {
    this.contact = {
      ...this.contact,
      ...contact,
    };
    return [this.contact];
  }

  async fetchById(id: string) {
    this.getFullByParamId = id;
    return this.contact;
  }
}

const makeSut = () => {
  const contactRepositorySpy = new ContactRepositorySpy();
  const sut = new ContactsUseCase(contactRepositorySpy as any);
  return {
    sut,
    contactRepositorySpy,
  };
};

describe("Contact UseCase", () => {
  it("should return all contacts when fetch all is called", async () => {
    const { sut, contactRepositorySpy } = makeSut();

    const contacts = await sut.fetchAll();

    expect(contacts).toEqual([contactRepositorySpy.contact]);
  });

  it("should return a contact when create is called", async () => {
    const { sut, contactRepositorySpy } = makeSut();

    const contact = await sut.create({
      customerId: "1",
      entryChannelId: "1",
    });

    expect(contact).toEqual([contactRepositorySpy.contact]);
  });

  it("should return a contact when fetch by id is called", async () => {
    const { sut, contactRepositorySpy } = makeSut();

    const contact = await sut.fetchById("1");

    expect(contact).toEqual(contactRepositorySpy.contact);
    expect(contactRepositorySpy.getFullByParamId).toBe("1");
  });
});
