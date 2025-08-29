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
          name: "token", // change if your cookie name differs
        },
      },
    },
  },
  apis: ["./routes/*.js"], // path to route files
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
