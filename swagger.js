import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shopatos API",
      version: "1.0.0",
      description: "Shopatos backend API documentation",
    },
    servers: [
      { url: "http://localhost:5000" },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            price: { type: "string" },
            subtitle: { type: "string" },
            image: { type: "string" },
            category: { type: "string" },
          },
          required: ["id", "name", "price"]
        }
      }
    }
  },
  apis: ["./routes/*.js"], // make sure this path points to your products.js
};


const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
