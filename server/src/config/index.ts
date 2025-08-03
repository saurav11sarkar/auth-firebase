import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  round: process.env.ROUND,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    jwt_secret_refresh: process.env.JWT_SECRET_REFRESH,
    jwt_expires_in_refresh: process.env.JWT_EXPIRES_IN_REFRESH,
  },
};
