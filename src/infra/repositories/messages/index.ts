import { Message } from "@domain/models/messages";

export interface ICreate {
  content: string;
  customer_id?: string;
  user_id?: string;
  from_channel_id: string;
  contact_id: string;
}

interface IMessagesRepository {
  create(message: ICreate): Promise<Message[]>;
  fetchAll(): Promise<Message[]>;
}

export class MessagesRepository implements IMessagesRepository {
  messageModel: Message;

  constructor(private readonly messagesModel: Message) {
    this.messageModel = messagesModel;
  }

  async create(message: ICreate) {
    return await this.messageModel.create(message);
  }

  async fetchAll(): Promise<Message[]> {
    return await this.messageModel.find({});
  }
}
