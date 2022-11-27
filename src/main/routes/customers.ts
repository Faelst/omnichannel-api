import { adaptRoute } from "@main/adapters";
import { makeFetchCustomersController } from "@main/factories/controllers/customers/makeFetchCustomersController";

import { Router } from "express";

export default (router: Router): void => {
  router.get("/customers", adaptRoute(makeFetchCustomersController()));
};
