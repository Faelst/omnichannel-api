import { Customer } from "@domain/models/customers";
import { CustomersUseCase } from "@domain/usecases/customers";
import { ViaCepIntegration } from "@infra/integrations/via-cep";
import { CustomersRepository } from "@infra/repositories/costumers";
import { CreateCustomerController } from "@presentations/controllers/customers/create";
import { makeCreateCustomerValidator } from "./makeCreateCustomerValidator";

export const makeCreateCustomerController = () => {
  const controller = new CreateCustomerController(
    makeCreateCustomerValidator(),
    new CustomersUseCase(
      new CustomersRepository(new Customer(), new ViaCepIntegration())
    )
  );
  return controller;
};
