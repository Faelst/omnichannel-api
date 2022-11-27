import { Customer } from "@domain/models/customers";

export interface ICustomerRepository {
  create(customer: Customer): Promise<Customer[]>;
  fetchAll(): Promise<Customer[]>;
}

export class CustomersRepository implements ICustomerRepository {
  costumerModel: Customer;

  constructor(private readonly customersModel: Customer) {
    this.costumerModel = customersModel;
  }

  async create(customer: Customer): Promise<Customer[]> {
    return await this.costumerModel.create(customer);
  }

  async fetchAll(): Promise<Customer[]> {
    return await this.costumerModel.find({});
  }

  async fetchById(id: string): Promise<Customer> {
    return await this.costumerModel.findById(id);
  }
}
