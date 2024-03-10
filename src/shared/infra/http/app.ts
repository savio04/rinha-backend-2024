import express from "express";
import cors from "cors";
import { routes } from "./routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use("/health", async (_, response) => {
  return response.status(200).json({ status: 200, payload: "ok" });
});

app.use((_, response) => {
  return response.status(404).json({ status: 404, payload: "Not found" });
});
