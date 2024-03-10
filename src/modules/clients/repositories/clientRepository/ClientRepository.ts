import { PoolClient } from "pg";
import { Client } from "../../entities/Client";
import { IClientRepository, UpdateParams } from "./IClientRepository";

export class ClientRepository implements IClientRepository {
  async findById(id: number, db: PoolClient): Promise<Client | undefined> {
    const { rows } = await db.query(
      `SELECT id, balance, credit_limit FROM clients WHERE id = $1 FOR UPDATE`,
      [id],
    );

    const client = rows[0];

    return client;
  }

  async update(
    id: number,
    params: UpdateParams,
    db: PoolClient,
  ): Promise<Client> {
    const updateClientText =
      "UPDATE clients SET balance = $1 WHERE id = $2  RETURNING balance, credit_limit";

    const { rows } = await db.query(updateClientText, [params.balance, id]);

    return rows[0];
  }
}
