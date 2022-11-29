import { CustomersUseCase } from "@domain/usecases/customers";
import {
  badRequest,
  ok,
  serverError,
} from "@presentations/helpers/http-helper";
import { HttpResponse } from "@presentations/protocols";
import { Validation } from "@presentations/protocols/validation";

export class CreateCustomerController {
  constructor(
    private readonly validation: Validation,
    private readonly createCustomerUseCase: CustomersUseCase
  ) {
    this.createCustomerUseCase = createCustomerUseCase;
    this.validation = validation;
  }

  async handle(
    request: CreateCustomerController.Request
  ): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);

      if (error) {
        return badRequest(error);
      }

      const { name, email, document, phone, zip_code, number, country } =
        request;

      const address = await this.createCustomerUseCase.getAddress(zip_code);

      const customer = await this.createCustomerUseCase.create({
        name,
        email,
        document,
        phone,
        country,
        number,
        zip_code: address.cep,
        address: address.logradouro,
        complement: address.complemento,
        neighborhood: address.bairro,
        city: address.localidade,
        state: address.uf,
      });

      return ok(customer);
    } catch (error: any) {
      return serverError(error);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateCustomerController {
  export type Request = {
    name: string;
    email: string;
    document: string;
    phone: string;
    zip_code: string;
    number: number;
    country: string;
  };
}
