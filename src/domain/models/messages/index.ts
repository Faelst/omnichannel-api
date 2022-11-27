import Model from "../model";

interface IMessage {
  readonly id: string;
  content: string;
  readonly contact_id: string;
  readonly from_channel_id: string;
  customer_id?: string;
  customer_name?: string;
  user_id?: string;
  user_name?: string;
  readonly created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export class Message extends Model implements IMessage {
  id!: string;
  content!: string;
  contact_id!: string;
  from_channel_id!: string;
  customer_id?: string;
  user_id?: string;
  created_at!: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor() {
    super("messages");
  }
}
