import { z } from "zod";

export const CreateTransaction = {
  params: z
    .object({
      id: z.coerce.number(),
    })
    .strict(),
  body: z
    .object({
      valor: z.number().int(),
      tipo: z.enum(["c", "d"]),
      descricao: z.string().max(10).min(1),
    })
    .strict(),
};
