import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shopatos API",
      version: "1.0.0",
      description: "Shopatos backend API documentation (User + Admin)",
    },
    servers: [{ url: "http://localhost:5000" }],
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
          required: ["id", "name", "price"],
        },
        CartItem: {
          type: "object",
          properties: {
            productId: { type: "string" },
            name: { type: "string" },
            price: { type: "string" },
            quantity: { type: "integer" },
            image: { type: "string" },
            category: { type: "string" },
          },
          required: ["productId", "name", "price", "quantity"],
        },
        AdminUser: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string" },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "adminToken",
        },
      },
    },
  },
  // Use path.resolve to ensure it works on any OS
  apis: [path.resolve("./docs/*.js")], 
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
