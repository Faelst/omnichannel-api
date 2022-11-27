import { ServerError } from "@presentations/errors";
import { FetchAllContactsController } from "./fetch-all-contacts";

class ContactsUseCaseSpy {
  contacts: any[] = [];

  fetchAll() {
    return this.contacts;
  }
}

const makeSut = () => {
  const contactsUseCaseSpy = new ContactsUseCaseSpy();
  const sut = new FetchAllContactsController(contactsUseCaseSpy as any);

  return { sut, contactsUseCaseSpy };
};

describe("Fetch All Contacts", () => {
  it("should be able to fetch all contacts", async () => {
    const validContacts = {
      id: "any_id",
      name: "any_name",
      email: "any_email",
      phone: "any_phone",
      customer_id: "any_customer_id",
      created_at: "any_created",
    };

    const { sut, contactsUseCaseSpy } = await makeSut();

    contactsUseCaseSpy.contacts = [validContacts, validContacts];

    const response = await sut.handle();

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(contactsUseCaseSpy.contacts.length);
  });

  it("should be able to return 500 if fetch all contacts throws", async () => {
    const { sut, contactsUseCaseSpy } = await makeSut();

    jest.spyOn(contactsUseCaseSpy, "fetchAll").mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await sut.handle();
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });
});
