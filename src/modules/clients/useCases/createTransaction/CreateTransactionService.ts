import { AppError } from "../../../../shared/appError";
import { pool } from "../../../../shared/infra/postgres";
import { IClientRepository } from "../../repositories/clientRepository/IClientRepository";
import { ITransactionRepository } from "../../repositories/transactionRepository/ITransactionRepository";

export interface IRequest {
  valor: number;
  tipo: "c" | "d";
  descricao: string;
  client_id: number;
}

export class CreateTransactionService {
  constructor(
    private clientRepository: IClientRepository,
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(params: IRequest) {
    const db = await pool.connect();

    try {
      await db.query("BEGIN");

      const client = await this.clientRepository.findById(params.client_id, db);

      if (client === undefined) {
        throw new AppError("Cliente not found", 404);
      }

      let newBalance = client.balance;

      if (params.tipo === "d") {
        newBalance = client.balance - params.valor;

        if (newBalance < client.credit_limit * -1) {
          throw new AppError("Not enough limit", 422);
        }
      } else {
        newBalance = client.balance + params.valor;
      }

      await this.transactionRepository.create(
        {
          client_id: params.client_id,
          value: params.valor,
          type: params.tipo,
          description: params.descricao,
        },
        db,
      );

      const { credit_limit, balance } = await this.clientRepository.update(
        client.id,
        { balance: newBalance },
        db,
      );

      await db.query("COMMIT");

      return {
        limite: credit_limit,
        saldo: balance,
      };
    } catch (error) {
      await db.query("ROLLBACK");

      if (error instanceof AppError) {
        throw new AppError(error.message, error.status);
      }

      throw new AppError("Internal server error", 500);
    } finally {
      db.release();
    }
  }
}
