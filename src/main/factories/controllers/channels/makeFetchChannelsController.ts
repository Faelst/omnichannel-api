import { Channel } from "@domain/models/channels";
import { ChannelsUseCase } from "@domain/usecases/channels";
import { ChannelsRepository } from "@infra/repositories/channels";
import { FetchChannelsController } from "@presentations/controllers/channels/fetch-all";

export const makeFetchChannelsController = () => {
  const controller = new FetchChannelsController(
    new ChannelsUseCase(new ChannelsRepository(new Channel()))
  );

  return controller;
};
