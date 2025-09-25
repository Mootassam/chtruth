require("dotenv").config();

import server from "./api";
import { databaseInit } from "./database/databaseConnection";

const PORT = process.env.PORT || 8084;

(async () => {

  // start cron after db is ready

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})();
