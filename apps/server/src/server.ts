import makeApp from './app';
import { config } from './config/config';
import connectDB from './config/database';

async function run() {
  /* Establish database connection */
  await connectDB();

  /* Create new express instance */
  const express_app = await makeApp();

  express_app.listen(config.PORT, () =>
    console.log(`The server is running on port ${config.PORT}`),
  );
}

run();
