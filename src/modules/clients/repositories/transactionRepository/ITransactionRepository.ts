import { PoolClient } from "pg";

export interface CreateParams {
  client_id: number;
  value: number;
  type: "c" | "d";
  description: string;
}

export interface ITransactionRepository {
  create(params: CreateParams, db: PoolClient): Promise<void>;
}
