const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gorwanalitics API",
      version: "1.0.0",
      description: "Documentación",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },

  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
