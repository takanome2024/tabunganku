import express from "express";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

const app = express();

app.use(express.json());

// Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// API Routes
app.use("/api/v1", routes);

// Global Error Handler (harus setelah semua route)
app.use(errorHandler);

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});

app.use((req, res, next) => {
  console.log("==================================");
  console.log(`${req.method} ${req.originalUrl}`);
  console.log("BODY:", req.body);
  console.log("AUTH:", req.headers.authorization);
  next();
});