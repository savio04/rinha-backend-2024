import { app as server } from "./app";
import { envs } from "../../../config/envs";

server.listen(envs.PORT, () => {
  process.stdout.write(`Api is running: ${envs.PORT}\n`);
});
