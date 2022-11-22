import { PoolConfig } from "pg";
import { config as configEnv } from 'dotenv';

configEnv();

const databaseConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}

export default databaseConfig;
