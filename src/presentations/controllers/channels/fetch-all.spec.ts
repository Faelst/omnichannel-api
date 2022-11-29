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

  it("should return 200 on success", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle();
    expect(httpResponse.statusCode).toBe(200);
  });

  it("should return 500 if use case throws", async () => {
    const { sut, channelsUseCaseSpy } = makeSut();
    jest.spyOn(channelsUseCaseSpy, "fetchAll").mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle();
    expect(httpResponse.statusCode).toBe(500);
  });
});
