import { ChannelsUseCase } from "@domain/usecases/channels";
import { ok, serverError } from "@presentations/helpers/http-helper";

export class FetchChannelsController {
  constructor(private readonly channelsUseCase: ChannelsUseCase) {}

  async handle() {
    try {
      const contacts = await this.channelsUseCase.fetchAll();

      return ok(contacts);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
