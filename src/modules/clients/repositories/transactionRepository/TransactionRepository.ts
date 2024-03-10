import { PoolClient } from "pg";
import { CreateParams, ITransactionRepository } from "./ITransactionRepository";
import { mapKeys } from "../../../../shared/utils/mapKeys";
import { query } from "express";

export class TransactionRepository implements ITransactionRepository {
  async create(params: CreateParams, db: PoolClient): Promise<void> {
    const { keys, items, values } = mapKeys(params);

    const queryText = `INSERT INTO transactions (${keys}) VALUES(${items}) RETURNING id`;

    await db.query(queryText, values);
  }
}
