import { Router } from "express";
import facilitiesRouter from "./facilities";
import shiftsRouter from "./shifts";

const rootRouter: Router = Router();

rootRouter.use('/shifts', shiftsRouter);
rootRouter.use('/facilities', facilitiesRouter);

export default rootRouter;
