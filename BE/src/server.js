import express from "express";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(routes);

routes(app);

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");

app.use(errorHandler);
});