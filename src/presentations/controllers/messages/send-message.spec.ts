import { ChannelsUseCase } from "@domain/usecases/channels";
import { ContactsUseCase } from "@domain/usecases/contacts";
import { CustomersUseCase } from "@domain/usecases/customers";
import { MessagesUseCase } from "@domain/usecases/messages";
import { UsersUseCase } from "@domain/usecases/users";
import { SendMessageController } from "./send-message";

class ChannelsUseCaseSpy {
  channel?: any;

  async fetchById(channelId: string) {
    channelId;
    return this.channel;
  }
}

class CustomersUseCaseSpy {
  customer?: any;

  async fetchById(customerId: string) {
    customerId;
    return this.customer;
  }
}

class UsersUseCaseSpy {
  user?: any;

  async fetchById(userId: string) {
    userId;
    return this.user;
  }
}

class ContactsUseCaseSpy {
  contact?: any;

  async fetchById(contactId: string) {
    contactId;
    return this.contact;
  }

  async create(contact: any) {
    contact;
    return [this.contact];
  }
}

class MessagesUseCaseSpy {
  message?: any;

  async create(message: any) {
    message;
    return [this.message];
  }
}

const makeSut = () => {
  const channelUseCaseSpy = new ChannelsUseCaseSpy();
  const messagesUseCaseSpy = new MessagesUseCaseSpy();
  const customerUseCaseSpy = new CustomersUseCaseSpy();
  const userUseCaseSpy = new UsersUseCaseSpy();
  const contactsUseCaseSpy = new ContactsUseCaseSpy();

  const sut = new SendMessageController(
    messagesUseCaseSpy as MessagesUseCase,
    customerUseCaseSpy as CustomersUseCase,
    userUseCaseSpy as UsersUseCase,
    contactsUseCaseSpy as ContactsUseCase,
    channelUseCaseSpy as ChannelsUseCase
  );

  return {
    sut,
    channelUseCaseSpy,
    userUseCaseSpy,
    customerUseCaseSpy,
    contactsUseCaseSpy,
    messagesUseCaseSpy,
  };
};

describe("MessagesController", () => {
  const validRequestBody: any = {
    content: "any_content",
    contactId: "any_contact_id",
    customerId: "any_customer_id",
    channelId: "any_channel_id",
  };

  it("should return 400 if no customerId or userId is provided", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({
      ...validRequestBody,
      customerId: null,
      userId: null,
    });

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new Error("Missing param: customerId or userId")
    );
  });

  it("should return 400 if no channelId is provided", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({
      ...validRequestBody,
      channelId: null,
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing param: channelId"));
  });

  it("should return 400 if no channel is found", async () => {
    const { sut, channelUseCaseSpy } = makeSut();

    channelUseCaseSpy.channel = null;
    const httpResponse = await sut.handle(validRequestBody);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Channel not found"));
  });

  it("should return 400 if no customer and users is found", async () => {
    const { sut, channelUseCaseSpy, userUseCaseSpy, customerUseCaseSpy } =
      makeSut();

    channelUseCaseSpy.channel = {
      id: "any_channel_id",
      name: "any_channel_name",
    };

    customerUseCaseSpy.customer = null;
    userUseCaseSpy.user = null;

    const httpResponse = await sut.handle(validRequestBody);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Customer and user not found"));
  });

  it("should return 400 if no contact is found", async () => {
    const {
      sut,
      channelUseCaseSpy,
      userUseCaseSpy,
      customerUseCaseSpy,
      contactsUseCaseSpy,
    } = makeSut();

    channelUseCaseSpy.channel = {
      id: "any_channel_id",
      name: "any_channel_name",
    };

    customerUseCaseSpy.customer = {
      id: "any_customer_id",
      name: "any_customer_name",
    };

    userUseCaseSpy.user = null;
    contactsUseCaseSpy.contact = null;

    const httpResponse = await sut.handle(validRequestBody);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Contact not found"));
  });

  it("should return 200 if contact is found", async () => {
    const {
      sut,
      channelUseCaseSpy,
      userUseCaseSpy,
      customerUseCaseSpy,
      contactsUseCaseSpy,
      messagesUseCaseSpy,
    } = makeSut();

    channelUseCaseSpy.channel = {
      id: "any_channel_id",
      name: "any_channel_name",
    };

    customerUseCaseSpy.customer = {
      id: "any_customer_id",
      name: "any_customer_name",
    };

    userUseCaseSpy.user = null;

    contactsUseCaseSpy.contact = {
      id: "any_contact_id",
      name: "any_contact_name",
    };

    messagesUseCaseSpy.message = {
      id: "any_message_id",
      content: "any_content",
      contactId: "any_contact_id",
    };

    const httpResponse = await sut.handle(validRequestBody);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "any_message_id",
      content: "any_content",
      contactId: "any_contact_id",
    });
  });

  it("should return 200 if contactId is not provided and create a new contact", async () => {
    const {
      sut,
      channelUseCaseSpy,
      userUseCaseSpy,
      customerUseCaseSpy,
      contactsUseCaseSpy,
      messagesUseCaseSpy,
    } = makeSut();

    channelUseCaseSpy.channel = {
      id: "any_channel_id",
      name: "any_channel_name",
    };

    customerUseCaseSpy.customer = {
      id: "any_customer_id",
      name: "any_customer_name",
    };

    userUseCaseSpy.user = null;

    contactsUseCaseSpy.contact = {
      id: "any_contact_id",
      name: "any_contact_name",
    };

    messagesUseCaseSpy.message = {
      id: "any_message_id",
      content: "any_content",
      contactId: "any_contact_id",
    };

    const httpResponse = await sut.handle({
      ...validRequestBody,
      contactId: null,
    });
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "any_message_id",
      content: "any_content",
      contactId: "any_contact_id",
    });
  });

  it("should trough an error if any use case throws", async () => {
    const {
      sut,
      channelUseCaseSpy,
      userUseCaseSpy,
      customerUseCaseSpy,
      contactsUseCaseSpy,
      messagesUseCaseSpy,
    } = makeSut();

    channelUseCaseSpy.channel = {
      id: "any_channel_id",
      name: "any_channel_name",
    };

    customerUseCaseSpy.customer = {
      id: "any_customer_id",
      name: "any_customer_name",
    };

    userUseCaseSpy.user = null;

    contactsUseCaseSpy.contact = {
      id: "any_contact_id",
      name: "any_contact_name",
    };

    messagesUseCaseSpy.message = {
      id: "any_message_id",
      content: "any_content",
      contactId: "any_contact_id",
    };

    jest.spyOn(messagesUseCaseSpy, "create").mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(validRequestBody);
    expect(httpResponse.statusCode).toBe(500);
  });

  it("should return 200 if contactId is not provided and create a new contact", async () => {
    const {
      sut,
      channelUseCaseSpy,
      userUseCaseSpy,
      customerUseCaseSpy,
      contactsUseCaseSpy,
      messagesUseCaseSpy,
    } = makeSut();

    channelUseCaseSpy.channel = {
      id: "any_channel_id",
      name: "any_channel_name",
    };

    customerUseCaseSpy.customer = {
      id: "any_customer_id",
      name: "any_customer_name",
    };

    userUseCaseSpy.user = {
      id: "any_user_id",
      name: "any_user_name",
    };

    contactsUseCaseSpy.contact = {
      id: "any_contact_id",
      name: "any_contact_name",
    };

    messagesUseCaseSpy.message = {
      id: "any_message_id",
      content: "any_content",
      contactId: "any_contact_id",
    };

    const httpResponse = await sut.handle({
      ...validRequestBody,
      userId: "any_user_id",
      customerId: null,
    });
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "any_message_id",
      content: "any_content",
      contactId: "any_contact_id",
    });
  });
});
