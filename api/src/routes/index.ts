import { Router } from "express";
import facilitiesRouter from "./facilities";
import nursesRouter from "./nurses";
import shiftsRouter from "./shifts";

const rootRouter: Router = Router();

rootRouter.use('/shifts', shiftsRouter);
rootRouter.use('/facilities', facilitiesRouter);
rootRouter.use('/nurses', nursesRouter);

export default rootRouter;
