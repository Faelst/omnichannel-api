import Model from "../model";

interface IUsers {
  readonly id: string;
  name: string;
  readonly created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export class Users extends Model implements IUsers {
  id!: string;
  name!: string;
  created_at!: Date;
  updated_at?: Date;
  delete_at?: Date;

  constructor() {
    super("users");
  }
}
