import { Channel } from "@domain/models/channels";
import { ChannelsRepository } from "@infra/repositories/channels";

export class ChannelsUseCase {
  constructor(private readonly channelsRepository: ChannelsRepository) {
    this.channelsRepository = channelsRepository;
  }

  async fetchAll(): Promise<Channel[]> {
    return await this.channelsRepository.fetchAll();
  }

  async create(channel: { name: string }): Promise<Channel[]> {
    return await this.channelsRepository.create({
      name: channel.name,
    });
  }

  async fetchById(id: string): Promise<Channel> {
    return await this.channelsRepository.fetchById(id);
  }
}
