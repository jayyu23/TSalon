import "dotenv/config";

const configs = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8000,
  jwtSecret: process.env.JWT_SECRET || "SecretToken",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/tsalon_prototype",
};

export default configs;
