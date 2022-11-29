import { Customer } from "@domain/models/customers";
import { IGetAddress, ViaCepIntegration } from "@infra/integrations/via-cep";

export interface ICreate {
  name: string;
  email: string;
  document: string;
  phone: string;
  zip_code: string;
  address: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

export interface ICustomerRepository {
  create(customer: ICreate): Promise<Customer[]>;
  fetchAll(): Promise<Customer[]>;
}

export class CustomersRepository implements ICustomerRepository {
  costumerModel: Customer;

  constructor(
    private readonly customersModel: Customer,
    private readonly viaCepIntegration: ViaCepIntegration
  ) {
    this.costumerModel = customersModel;
  }

  async create(customer: ICreate): Promise<Customer[]> {
    return await this.costumerModel.create(customer);
  }

  async fetchAll(): Promise<Customer[]> {
    return await this.costumerModel.find({});
  }

  async fetchById(id: string): Promise<Customer> {
    return await this.costumerModel.findById(id);
  }

  async getAddress(zip_code: string): Promise<IGetAddress> {
    return await this.viaCepIntegration.getAddress(zip_code);
  }
}
