// import authRoute from "./auth.route.js";

// export default (app) => {
//   app.use("/api/v1/auth", authRoute);
// };

// import userRoute from "./user.route.js";
// import authRoute from "./auth.route.js";

// export default function routes(app) {

//   app.use(
//     "/api/v1/auth", 
//     authRoute
//   );

//   app.use(
//     "/api/v1/user",
//     userRoute
//   );

// }
import express from "express";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import transactionRoute from "./transaction.route.js";
import dashboardRoute from "./dashboard.route.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/transactions", transactionRoute);
router.use("/dashboard", dashboardRoute);

export default router;