import { app } from "./app";
import { config } from "./config/config";

async function run() {
  const port = config.PORT ?? "30000";

  const express_app = await app();

  express_app.listen(port, () => console.log(`The server is running on port ${port}`));
}

run();
