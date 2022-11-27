import { Channel } from "@domain/models/channels";

interface IChannelsRepository {
  create(channel: any): Promise<Channel[]>;
  fetchAll(): Promise<Channel[]>;
}

export class ChannelsRepository implements IChannelsRepository {
  channelModel: Channel;

  constructor(private readonly channelsModel: Channel) {
    this.channelModel = channelsModel;
  }

  async create(channel: { name: string }): Promise<Channel[]> {
    return await this.channelModel.create(channel);
  }

  async fetchAll(): Promise<Channel[]> {
    return await this.channelModel.find({});
  }

  async fetchById(id: string): Promise<Channel> {
    return await this.channelModel.findById(id);
  }
}
