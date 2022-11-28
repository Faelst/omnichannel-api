import { ContactsRepository, ICreate } from "@infra/repositories/contacts";

export class ContactsUseCase {
  constructor(private readonly contactsRepository: ContactsRepository) {}

  generateProtocol(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  async fetchAll() {
    return this.contactsRepository.fetchAll();
  }

  async create(contact: ICreate) {
    const protocol = this.generateProtocol();

    return this.contactsRepository.create({ ...contact, protocol });
  }

  async fetchById(id: string) {
    return this.contactsRepository.fetchById(id);
  }
}
