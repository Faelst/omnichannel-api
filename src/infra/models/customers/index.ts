import Model from "../model";

interface ICustomer {
  readonly id: string;
  name: string;
  readonly email: string;
  readonly document: string;
  phone: string;
  zip_code: string;
  address: string;
  number: number;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  readonly created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export class Customer extends Model implements ICustomer {
  id!: string;
  name!: string;
  email!: string;
  document!: string;
  phone!: string;
  zip_code!: string;
  address!: string;
  number!: number;
  complement?: string;
  neighborhood!: string;
  city!: string;
  state!: string;
  country!: string;
  created_at!: Date;
  updated_at?: Date;
  delete_at?: Date;

  constructor() {
    super("customers");
  }
}
