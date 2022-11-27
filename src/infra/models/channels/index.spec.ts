import "@tests/setup";

import { cleanAllTables } from "@tests/clearAllTables";
import { Channel } from "./index";

const makeSut = (): { sut: Channel } => {
  const sut = new Channel();

  return {
    sut,
  };
};

describe("Channels model", () => {
  afterEach(async () => {
    await cleanAllTables();
  });

  test("should is iterable", () => {
    const { sut } = makeSut();

    expect(sut).toBeInstanceOf(Object);
  });

  test("should create a new channel", async () => {
    const { sut } = makeSut();

    const [channel] = await sut.create({
      name: "channel",
    });

    expect(channel).toHaveProperty("id");
    expect(channel).toHaveProperty("name");
    expect(channel).toHaveProperty("created_at");
    expect(channel).toHaveProperty("updated_at");
    expect(channel).toHaveProperty("deleted_at");
  });

  test("should throw an error if name is not provided", async () => {
    const { sut } = makeSut();

    await expect(sut.create({})).rejects.toThrow();
  });

  test("should get a channel by id", async () => {
    const { sut } = makeSut();

    const [channel] = await sut.create({
      name: "channel",
    });

    const channelFound = await sut.findById(channel.id);

    expect(channelFound).toHaveProperty("id");
    expect(channelFound).toHaveProperty("name");
    expect(channelFound).toHaveProperty("created_at");
    expect(channelFound).toHaveProperty("updated_at");
    expect(channelFound).toHaveProperty("deleted_at");
  });

  test("should get a channel by name", async () => {
    const { sut } = makeSut();

    const [channel] = await sut.create({
      name: "channel",
    });

    const [channelFound] = await sut.find({
      name: channel.name,
    });

    expect(channelFound).toHaveProperty("id");
    expect(channelFound).toHaveProperty("name");
    expect(channelFound).toHaveProperty("created_at");
    expect(channelFound).toHaveProperty("updated_at");
    expect(channelFound).toHaveProperty("deleted_at");
  });

  test("should update a channel", async () => {
    const { sut } = makeSut();

    const [channel] = await sut.create({
      name: "channel",
    });

    const [channelUpdated] = await sut.update(channel.id, {
      name: "channel updated",
    });

    expect(channelUpdated.name).toBe("channel updated");
  });
});
