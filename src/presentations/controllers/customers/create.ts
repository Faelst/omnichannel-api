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

      return ok(request);
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
    zipCode: string;
  };
}
