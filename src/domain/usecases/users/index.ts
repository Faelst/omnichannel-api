import { Users } from "@domain/models/users";
import { UsersRepository } from "@infra/repositories/users";

export class UsersUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async fetchAll(): Promise<Users[]> {
    return await this.userRepository.fetchAll();
  }

  async create(user: { name: string }): Promise<Users[]> {
    return await this.userRepository.create(user);
  }

  async fetchById(id: string): Promise<Users> {
    return await this.userRepository.fetchById(id);
  }
}
