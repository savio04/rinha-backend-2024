import { Request, Response } from "express";
import { AppError } from "../../../../shared/appError";
import { GetStatementService } from "./GetStatementService";

export class GetStatementController {
  async handler(request: Request, response: Response) {
    const { params } = request;

    const service = new GetStatementService();

    try {
      const data = await service.execute(Number(params.id));

      return response.status(200).json(data);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.status).json({ error: error.message });
      }

      return response.status(500).end();
    }
  }
}
