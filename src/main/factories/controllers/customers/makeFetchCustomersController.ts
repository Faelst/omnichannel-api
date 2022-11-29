import { FetchCustomersController } from "@presentations/controllers/customers/fetch-all";
import { CustomersUseCase } from "@domain/usecases/customers";
import { Customer as CustomerModel } from "@domain/models/customers";
import { CustomersRepository } from "@infra/repositories/costumers";
import { ViaCepIntegration } from "@infra/integrations/via-cep";

export const makeFetchCustomersController = () => {
  return new FetchCustomersController(
    new CustomersUseCase(
      new CustomersRepository(new CustomerModel(), new ViaCepIntegration())
    )
  );
};
