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

import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import transactionRoute from "./transaction.route.js";
import dashboardRoute from "./dashboard.route.js";

export default (app) => {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/transactions", transactionRoute);
  app.use("/api/v1/dashboard", dashboardRoute);
};