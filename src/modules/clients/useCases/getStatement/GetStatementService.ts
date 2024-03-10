import { AppError } from "../../../../shared/appError";
import { pool } from "../../../../shared/infra/postgres";

export class GetStatementService {
  async execute(client_id: number) {
    const db = await pool.connect();

    try {
      const { rows } = await db.query(
        `SELECT id, balance, credit_limit FROM clients WHERE id = $1`,
        [client_id],
      );

      const client = rows[0];

      if (client === undefined) {
        throw new AppError("Cliente not found", 404);
      }

      const { rows: transactions } = await db.query(
        `SELECT id, value as valor, type as tipo, description as descricao, transaction_at as realizada_em FROM transactions WHERE client_id = $1 ORDER BY transaction_at DESC LIMIT 10`,
        [client_id],
      );

      return {
        saldo: {
          total: client.balance,
          data_extrato: new Date(),
          limite: client.credit_limit,
        },
        ultimas_transacoes: transactions,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(error.message, error.status);
      }

      throw new AppError("Internal server error", 500);
    } finally {
      db.release();
    }
  }
}
