import { Customer } from "@domain/models/customers";
import { CustomersRepository, ICreate } from "@infra/repositories/costumers";

export class CustomersUseCase {
  constructor(private readonly customerRepository: CustomersRepository) {}

  async fetchAll(): Promise<Customer[]> {
    return await this.customerRepository.fetchAll();
  }

  async create(customer: ICreate): Promise<Customer[]> {
    return await this.customerRepository.create(customer);
  }

  async fetchById(id: string): Promise<Customer> {
    return await this.customerRepository.fetchById(id);
  }
}
