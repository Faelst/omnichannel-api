import { FetchChannelsController } from "./fetch-all";

class ChannelsUseCaseSpy {
  fetchAllCalled = false;

  async fetchAll() {
    this.fetchAllCalled = true;
  }
}

const makeSut = () => {
  const channelsUseCaseSpy = new ChannelsUseCaseSpy();

  const sut = new FetchChannelsController(channelsUseCaseSpy as any);

  return {
    sut,
    channelsUseCaseSpy,
  };
};

describe("Fetch Channels Controller", () => {
  it("should call use case fetch all", async () => {
    const { sut, channelsUseCaseSpy } = makeSut();
    await sut.handle();
    expect(channelsUseCaseSpy.fetchAllCalled).toBe(true);
  });
});
