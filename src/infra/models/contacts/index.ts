import Model from "../model";
import { ICustomer } from "../customers";

interface IContact {
  readonly id: string;
  readonly protocol: string;
  readonly customer_id: string;
  readonly entry_channel_id: string;
  is_finished: boolean;
  readonly created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  readonly customer_name?: string;
  readonly channel_name?: string;
}

export class Contact extends Model implements IContact {
  id!: string;
  protocol!: string;
  customer_id!: string;
  entry_channel_id!: string;
  is_finished!: boolean;
  created_at!: Date;
  updated_at?: Date;
  deleted_at?: Date;

  customer_name?: string;
  channel_name?: string;

  constructor() {
    super("contacts");
  }

  async getFullById(id: string): Promise<IContact> {
    const contact = this.findOne({ "contacts.id": id })
      .select(
        "contacts.id",
        "contacts.protocol as protocol",
        "contacts.is_finished as is_finished",
        "contacts.created_at as created_at",
        "customers.id as customer_id",
        "customers.name as customer_name",
        "channels.id as channel_id",
        "channels.name as channel_name"
      )
      .innerJoin("customers", "contacts.customer_id", "customers.id")
      .innerJoin("channels", "contacts.entry_channel_id", "channels.id");

    return contact;
  }
}
