const { defineConfig } = require("drizzle-kit");

if (!process.env.SQLITE_DATABASE_PATH) {
  throw new Error("SQLITE_DATABASE_PATH must be set.");
}

module.exports = defineConfig({
  out: "./migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.SQLITE_DATABASE_PATH,
  },
});
