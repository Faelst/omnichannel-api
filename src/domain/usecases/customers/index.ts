import { Customer } from "@domain/models/customers";
import { IGetAddress } from "@infra/integrations/via-cep";
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

  async getAddress(zip_code: string): Promise<IGetAddress> {
    return await this.customerRepository.getAddress(zip_code);
  }
}
