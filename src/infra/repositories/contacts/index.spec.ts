import { ContactsRepository, ICreate } from ".";

class ContactModelSpy {
  getFullByParamId = "";
  contact = {
    protocol: "123456789",
    customer_id: "1",
    entry_channel_id: "1",
    is_finished: false,
  };

  async getFull() {
    return [this.contact];
  }

  async create(contact: ICreate) {
    this.contact = {
      ...this.contact,
      ...contact,
    };

    return [this.contact];
  }

  async getFullById(id: string) {
    this.getFullByParamId = id;
    return this.contact;
  }
}

const makeSut = () => {
  const contactModelSpy = new ContactModelSpy();

  const sut = new ContactsRepository(contactModelSpy as any);

  return {
    sut,
    contactModelSpy,
  };
};

describe("Contact Repository", () => {
  it("should return all contacts when fetch all is called", async () => {
    const { sut, contactModelSpy } = makeSut();

    const contacts = await sut.fetchAll();

    expect(contacts).toEqual([contactModelSpy.contact]);
  });

  it("should return a contact when create is called", async () => {
    const { sut, contactModelSpy } = makeSut();

    const contact = await sut.create({
      customerId: "1",
      entryChannelId: "1",
    });

    expect(contact).toEqual([contactModelSpy.contact]);
  });

  it("should return a contact when create is called", async () => {
    const { sut, contactModelSpy } = makeSut();

    const contact = await sut.create({
      protocol: "123456789",
      customerId: "1",
      entryChannelId: "1",
      isFinished: true,
    });

    expect(contact).toEqual([contactModelSpy.contact]);
  });

  it("should return a contact when fetchById is called", async () => {
    const { sut, contactModelSpy } = makeSut();

    const contact = await sut.fetchById("1");

    expect(contact).toEqual(contactModelSpy.contact);
    expect(contactModelSpy.getFullByParamId).toBe("1");
  });
});
