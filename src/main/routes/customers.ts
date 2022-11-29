import { adaptRoute } from "@main/adapters";
import { makeCreateCustomerController } from "@main/factories/controllers/customers/makeCreateCustomerController";
import { makeFetchCustomersController } from "@main/factories/controllers/customers/makeFetchCustomersController";

import { Router } from "express";

export default (router: Router): void => {
  router.get("/customers", adaptRoute(makeFetchCustomersController()));
  router.post("/customers", adaptRoute(makeCreateCustomerController()));
};
