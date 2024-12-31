import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";

import databaseConnection from "./DB/DB.connection.js";
databaseConnection();

app.listen(process.env.PORT);
