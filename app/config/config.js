const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8000,
  jwtSecret:
    process.env.JWT_SECRET || "QmNN4e4yABPVmQbsLH1qgm7jB6WpqQfe9turQvGfF1HuNu",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/tsalon_prototype",
};
export default config;
