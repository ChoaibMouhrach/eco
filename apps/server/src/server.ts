import config from "./config/config";
import makeApp from "./app";

const app = makeApp();

app.listen(config.APP_PORT, () =>
  console.log(`The server os listening on port ${config.APP_PORT}`)
);
