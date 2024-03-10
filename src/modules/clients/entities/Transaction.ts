export class Transaction {
  id: number;
  client_id: number;
  value: number;
  type: "c" | "d";
  descirption: string;
  transaction_at: Date;
}
