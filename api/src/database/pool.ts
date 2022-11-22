import { Pool } from "pg";
import config from "./config";

const databasePool: Pool = new Pool(config);

export default databasePool;
