import { adaptRoute } from "@main/adapters";
import { makeFetchCustomersController } from "@main/factories/controllers/contacts/makeFetchAllContacts";

import { Router } from "express";

export default (router: Router): void => {
  router.get("/contacts", adaptRoute(makeFetchCustomersController()));
};
