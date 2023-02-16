import { Router } from "express";
import fileRouter from "./file";
import slideRouter from "./slide";

const apiRouter = Router();

apiRouter.use("/slide", slideRouter);
apiRouter.use("/file", fileRouter);

export default apiRouter;