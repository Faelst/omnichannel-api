import { ChannelsRepository } from ".";

class ChannelModelSpy {
  fetchByIdParam = "";
  channel = {
    id: "any_id",
    name: "any_name",
  };

  async findById(id: string) {
    this.fetchByIdParam = id;
    return this.channel;
  }

  async create(channel: { name: string }) {
    channel.name = "any_name";
    return [this.channel];
  }

  async find() {
    return [this.channel];
  }
}

const makeSut = () => {
  const channelModelSpy = new ChannelModelSpy();

  const sut = new ChannelsRepository(channelModelSpy as any);

  return {
    sut,
    channelModelSpy,
  };
};

describe("Channels Repository", () => {
  it("should return a channel when fetchById is called", async () => {
    const { sut, channelModelSpy } = makeSut();

    const channel = await sut.fetchById("any_id");

    expect(channel).toEqual(channelModelSpy.channel);
    expect(channelModelSpy.fetchByIdParam).toBe("any_id");
  });

  it("should return all channels when fetchAll is called", async () => {
    const { sut, channelModelSpy } = makeSut();

    const channels = await sut.fetchAll();

    expect(channels).toEqual([channelModelSpy.channel]);
  });

  it("should return a channel when create is called", async () => {
    const { sut, channelModelSpy } = makeSut();

    const channel = await sut.create({
      name: "any_name",
    });

    expect(channel).toEqual([channelModelSpy.channel]);
  });
});
