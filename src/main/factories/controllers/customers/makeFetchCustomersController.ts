import { FetchCustomersController } from "@presentations/controllers/costumers/fetch-all";
import { CustomersUseCase } from "@domain/usecases/customers";
import { Customer as CustomerModel } from "@domain/models/customers";
import { CustomersRepository } from "@infra/repositories/costumers";

export const makeFetchCustomersController = () => {
  return new FetchCustomersController(
    new CustomersUseCase(new CustomersRepository(new CustomerModel()))
  );
};
