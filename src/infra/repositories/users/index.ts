import { Users } from "@domain/models/users";

export class UsersRepository {
  UsersModel: Users;

  constructor(usersModel: Users) {
    this.UsersModel = usersModel;
  }

  async fetchAll(): Promise<Users[]> {
    return await this.UsersModel.find({});
  }

  async fetchById(id: string): Promise<Users> {
    return await this.UsersModel.findById(id);
  }

  async create(user: { name: string }): Promise<Users[]> {
    return await this.UsersModel.create(user);
  }
}
