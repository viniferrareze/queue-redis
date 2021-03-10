import express from "express";
// import queueRoutes from "../modules/account/routes/queue.routes";
import accountsRoutes from "../modules/account/routes/accounts.routes";
const routes = express.Router();

// routes.use("/queue", queueRoutes);
routes.use("/account", accountsRoutes);

export default routes;
