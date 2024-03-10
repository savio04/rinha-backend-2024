import { PoolClient } from "pg";
import { Client } from "../../entities/Client";

export interface UpdateParams {
  balance: number;
}

export interface IClientRepository {
  findById(id: number, db: PoolClient): Promise<Client | undefined>;
  update(id: number, params: UpdateParams, db: PoolClient): Promise<Client>;
}
