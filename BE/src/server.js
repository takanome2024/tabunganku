import express from "express";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("==================================");
  console.log(`${req.method} ${req.originalUrl}`);
  console.log("BODY:", req.body);
  console.log("AUTH:", req.headers.authorization);
  next();
});

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

