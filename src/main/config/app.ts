import express from "express";
import setupApp from "@main/setup/config";

const app = express();

setupApp(app);

export default app;
