import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error("No DATABASE_URL provided");
  process.exit(1);
}

export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
};
