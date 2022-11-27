import { Message } from "@domain/models/messages";
import { MessagesRepository } from "@infra/repositories/messages";

interface ICreate {
  content: string;
  contactId: string;
  channelId: string;
  userId?: string;
  customerId?: string;
}

export class MessagesUseCase {
  constructor(private readonly messagesRepository: MessagesRepository) {
    this.messagesRepository = messagesRepository;
  }

  async create(message: ICreate): Promise<Message[]> {
    return await this.messagesRepository.create({
      content: message.content,
      contact_id: message.contactId,
      from_channel_id: message.channelId,
      user_id: message?.userId,
      customer_id: message?.customerId,
    });
  }
}
