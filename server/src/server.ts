import mongoose from "mongoose";
import config from "./config";
import app from "./app";

const port = config.port;

const main = async () => {
  try {
    await mongoose.connect(config.db_url as string);
    console.log("Database connected successfully");
    
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

main();