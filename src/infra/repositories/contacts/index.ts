import { Contact, IContact } from "@domain/models/contacts";

export interface CreateParams {
  protocol?: string;
  customerId: string;
  entryChannelId: string;
  isFinished?: boolean;
}

export class ContactsRepository {
  ContactsModel: Contact;

  constructor(contactsModel: Contact) {
    this.ContactsModel = contactsModel;
  }

  async fetchAll(): Promise<IContact[]> {
    return this.ContactsModel.getFull();
  }

  async create(contact: CreateParams): Promise<IContact[]> {
    return this.ContactsModel.create({
      protocol: contact?.protocol,
      customer_id: contact.customerId,
      entry_channel_id: contact.entryChannelId,
      is_finished: contact?.isFinished || false,
    });
  }

  async fetchById(id: string): Promise<IContact> {
    return this.ContactsModel.getFullById(id);
  }
}
