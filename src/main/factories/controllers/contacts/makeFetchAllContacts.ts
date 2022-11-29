import { Contact } from "@domain/models/contacts";
import { ContactsUseCase } from "@domain/usecases/contacts";
import { ContactsRepository } from "@infra/repositories/contacts";
import { FetchAllContactsController } from "@presentations/controllers/contacts/fetch-all";

export const makeFetchCustomersController = () => {
  const controller = new FetchAllContactsController(
    new ContactsUseCase(new ContactsRepository(new Contact()))
  );

  return controller;
};
