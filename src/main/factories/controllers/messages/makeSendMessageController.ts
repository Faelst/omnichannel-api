import { Channel } from "@domain/models/channels";
import { Contact } from "@domain/models/contacts";
import { Customer } from "@domain/models/customers";
import { Message } from "@domain/models/messages";
import { Users } from "@domain/models/users";
import { ChannelsUseCase } from "@domain/usecases/channels";
import { ContactsUseCase } from "@domain/usecases/contacts";
import { CustomersUseCase } from "@domain/usecases/customers";
import { MessagesUseCase } from "@domain/usecases/messages";
import { UsersUseCase } from "@domain/usecases/users";
import { ViaCepIntegration } from "@infra/integrations/via-cep";
import { ChannelsRepository } from "@infra/repositories/channels";
import { ContactsRepository } from "@infra/repositories/contacts";
import { CustomersRepository } from "@infra/repositories/costumers";
import { MessagesRepository } from "@infra/repositories/messages";
import { UsersRepository } from "@infra/repositories/users";
import { SendMessageController } from "@presentations/controllers/messages/send-message";

export const makeSendMessageController = () => {
  const messages = new MessagesUseCase(new MessagesRepository(new Message()));

  const customers = new CustomersUseCase(
    new CustomersRepository(new Customer(), new ViaCepIntegration())
  );

  const users = new UsersUseCase(new UsersRepository(new Users()));

  const contacts = new ContactsUseCase(new ContactsRepository(new Contact()));

  const channels = new ChannelsUseCase(new ChannelsRepository(new Channel()));

  return new SendMessageController(
    messages,
    customers,
    users,
    contacts,
    channels
  );
};
