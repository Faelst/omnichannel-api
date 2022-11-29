import { adaptRoute } from "@main/adapters";
import { makeSendMessageController } from "@main/factories/controllers/messages/makeSendMessageController";

import { Router } from "express";

export default (router: Router): void => {
  router.post("/messages/send", adaptRoute(makeSendMessageController()));
  router.get("/messages", adaptRoute(makeSendMessageController()));
};
