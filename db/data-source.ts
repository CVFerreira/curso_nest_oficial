import * as dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config();
export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/db/migrations/*.js"],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
