import { Router } from "express";
import { clientRoutes } from "./clients.routes";

export const routes = Router();

routes.use("/clientes", clientRoutes);
