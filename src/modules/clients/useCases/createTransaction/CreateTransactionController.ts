import { Request, Response } from "express";
import { CreateTransactionService } from "./CreateTransactionService";
import { AppError } from "../../../../shared/appError";
import { ClientRepository } from "../../repositories/clientRepository/ClientRepository";
import { TransactionRepository } from "../../repositories/transactionRepository/TransactionRepository";

export class CreateTransactionController {
  async handler(request: Request, response: Response) {
    const { params, body } = request;

    const clientRepositoy = new ClientRepository();
    const transactionRepository = new TransactionRepository();

    const service = new CreateTransactionService(
      clientRepositoy,
      transactionRepository,
    );

    try {
      const data = await service.execute({
        client_id: params.id,
        ...body,
      });

      return response.status(200).json(data);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.status).json({ error: error.message });
      }

      return response.status(500).end();
    }
  }
}
