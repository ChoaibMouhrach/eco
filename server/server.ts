import { app } from "./app";

async function run() {

  const port = process.env.PORT ?? "30000"

  const express_app = await app()

  express_app.listen(port, () => console.log(`The server is running on port ${port}`))

}

run()
