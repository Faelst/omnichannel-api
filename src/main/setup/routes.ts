import { Application, Router } from "express";
import { readdirSync } from "fs";
import { join } from "path";

export default (app: Application): void => {
  const router = Router();
  app.use("/api", router);
  readdirSync(join(__dirname, "../routes")).map(async (file) => {
    if (!file.endsWith(".map")) {
      (await import(`../routes/${file}`)).default(router);
      console.log(`routers loaded: ${file}`);
    }
  });
};
