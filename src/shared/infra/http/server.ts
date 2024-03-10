import { app as server } from "./app";
import { envs } from "../../../config/envs";

console.log({ port: envs.PORT });

server.listen(envs.PORT, () => {
  process.stdout.write(`Api is running: ${envs.PORT}\n`);
});
