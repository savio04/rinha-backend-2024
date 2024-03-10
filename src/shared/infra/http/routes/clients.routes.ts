import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import * as schemas from "./schemas/clients.schemas";
import { CreateTransactionController } from "../../../../modules/clients/useCases/createTransaction/CreateTransactionController";
import { GetStatementController } from "../../../../modules/clients/useCases/getStatement/GetStatementController";

export const clientRoutes = Router();

const createTransactionController = new CreateTransactionController();
clientRoutes.post(
  "/:id/transacoes",
  validateSchema(schemas.CreateTransaction),
  createTransactionController.handler,
);

const getStatementController = new GetStatementController();
clientRoutes.get("/:id/extrato", getStatementController.handler);
