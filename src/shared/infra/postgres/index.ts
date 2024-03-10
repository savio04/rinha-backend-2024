import { Pool } from "pg";
import { envs } from "../../../config/envs";

export const pool = new Pool({
  host: envs.DB_HOSTNAME,
  user: "root",
  password: "123456",
  database: "rinha",
  max: 10,
  connectionTimeoutMillis: 3 * 60 * 1000,
  keepAlive: true,
});
