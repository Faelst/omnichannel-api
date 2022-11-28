import { ContactsUseCase } from "@domain/usecases/contacts";
import { ok, serverError } from "@presentations/helpers/http-helper";

export class FetchAllContactsController {
  constructor(private readonly contactsUseCase: ContactsUseCase) {}

  async handle() {
    try {
      const contacts = await this.contactsUseCase.fetchAll();

      return ok(contacts);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
