import { ChannelsUseCase } from "@domain/usecases/channels";
import { ContactsUseCase } from "@domain/usecases/contacts";
import { CustomersUseCase } from "@domain/usecases/customers";
import { MessagesUseCase } from "@domain/usecases/messages";
import { UsersUseCase } from "@domain/usecases/users";
import {
  badRequest,
  ok,
  serverError,
} from "@presentations/helpers/http-helper";

export class SendMessageController {
  constructor(
    private readonly messagesUseCase: MessagesUseCase,
    private readonly customersUseCase: CustomersUseCase,
    private readonly usersUseCase: UsersUseCase,
    private readonly contactsUseCase: ContactsUseCase,
    private readonly channelsUseCase: ChannelsUseCase
  ) {
    this.messagesUseCase = messagesUseCase;
    this.customersUseCase = customersUseCase;
    this.usersUseCase = usersUseCase;
    this.contactsUseCase = contactsUseCase;
    this.channelsUseCase = channelsUseCase;
  }

  async handle(request: SendMessageController.Request) {
    try {
      const {
        content,
        contactId,
        customerId = null,
        userId = null,
        channelId,
        isFinished = false,
      } = request;

      if (!customerId && !userId) {
        return badRequest(new Error("Missing param: customerId or userId"));
      }

      if (!channelId) {
        return badRequest(new Error("Missing param: channelId"));
      }

      const channel = await this.channelsUseCase.fetchById(channelId);

      if (!channel) {
        return badRequest(new Error("Channel not found"));
      }

      const customer = customerId
        ? await this.customersUseCase.fetchById(customerId)
        : null;

      const user = userId ? await this.usersUseCase.fetchById(userId) : null;

      if (!customer && !user) {
        return badRequest(new Error("Customer and user not found"));
      }

      // se nao houver um id de contato, isso significa que ele esta fazendo um novo contato
      const isNew = !contactId;

      let contact;
      if (isNew && customerId) {
        [contact] = await this.contactsUseCase.create({
          customerId,
          isFinished,
          entryChannelId: channelId,
        });
      } else if (contactId) {
        contact = await this.contactsUseCase.fetchById(contactId);
      }

      if (!contact) {
        return badRequest(new Error("Contact not found"));
      }

      const [message] = await this.messagesUseCase.create({
        content,
        contactId: contact.id,
        channelId,
        userId: user?.id,
        customerId: customer?.id,
      });

      return ok(message);
    } catch (error: any) {
      return serverError(error);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SendMessageController {
  export type Request = {
    content: string;
    userId?: string;
    customerId?: string;
    channelId: string;
    contactId?: string;
    isFinished?: boolean;
  };
}
