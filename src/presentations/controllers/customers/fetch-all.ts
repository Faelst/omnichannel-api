import { serverError } from "@presentations/helpers/http-helper";
import { Controller, HttpResponse } from "@presentations/protocols";
import { ok } from "@presentations/helpers/http-helper";
import { CustomersUseCase } from "@domain/usecases/customers";

export class FetchCustomersController implements Controller {
  constructor(private readonly CustomersUseCase: CustomersUseCase) {}

  async handle(): Promise<HttpResponse> {
    try {
      const customers = await this.CustomersUseCase.fetchAll();

      return ok(customers);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
