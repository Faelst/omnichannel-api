import { ChannelsUseCase } from ".";

class ChannelRepositorySpy {
  fetchByIdParam = "";
  channel = {
    id: "any_id",
    name: "any_name",
  };

  async fetchById(id: string) {
    this.fetchByIdParam = id;
    return this.channel;
  }

  async create(channel: { name: string }) {
    channel.name = "any_name";
    return [this.channel];
  }

  async fetchAll() {
    return [this.channel];
  }
}

const makeSut = () => {
  const channelRepositorySpy = new ChannelRepositorySpy();
  const sut = new ChannelsUseCase(channelRepositorySpy as any);
  return {
    sut,
    channelRepositorySpy,
  };
};

describe("Channels UseCase", () => {
  it("should return a channel when fetchById is called", async () => {
    const { sut, channelRepositorySpy } = makeSut();

    const channel = await sut.fetchById("any_id");

    expect(channel).toEqual(channelRepositorySpy.channel);
    expect(channelRepositorySpy.fetchByIdParam).toBe("any_id");
  });

  it("should return all channels when fetchAll is called", async () => {
    const { sut, channelRepositorySpy } = makeSut();

    const channels = await sut.fetchAll();

    expect(channels).toEqual([channelRepositorySpy.channel]);
  });

  it("should return a channel when create is called", async () => {
    const { sut, channelRepositorySpy } = makeSut();

    const channel = await sut.create({
      name: "any_name",
    });

    expect(channel).toEqual([channelRepositorySpy.channel]);
  });
});
