const express = require("express");
const userRoute = require("./routes/userRoutes");
const { swaggerUi, swaggerSpec } = require("./config/swagger");
const cookieParser = require("cookie-parser");

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cookieParser());
  }

  routes() {
    this.server.use("/api/usuarios", userRoute);
    this.server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
}

module.exports = new App().server;
