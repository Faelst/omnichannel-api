import setupRoutes from "@main/setup/routes";

import express from "express";

const setupApp = (app: express.Application): void => {
  app.use(express.json());
  app.use((_, res, next) => {
    res.set("access-control-allow-origin", "*");
    res.set("access-control-allow-methods", "*");
    res.set("access-control-allow-headers", "*");
    next();
  });
  app.disable("x-powered-by");

  setupRoutes(app);
};

export default setupApp;
