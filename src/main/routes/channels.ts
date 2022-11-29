import { adaptRoute } from "@main/adapters";
import { makeFetchChannelsController } from "@main/factories/controllers/channels/makeFetchChannelsController";

import { Router } from "express";

export default (router: Router): void => {
  router.get("/channels", adaptRoute(makeFetchChannelsController()));
};
