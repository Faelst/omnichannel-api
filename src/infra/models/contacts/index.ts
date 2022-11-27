import Model from "../model";

interface IContact {
  readonly id: string;
  readonly protocol: string;
  readonly customer_id: string;
  readonly entry_channel_id: string;
  is_finished: boolean;
  readonly created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
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

  constructor() {
    super("contacts");
  }
}
