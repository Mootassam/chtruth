require("dotenv").config();

import api from "./api";
import { databaseInit } from "./database/databaseConnection";

const PORT = process.env.PORT || 8084;

(async () => {

  // start cron after db is ready

  api.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})();
