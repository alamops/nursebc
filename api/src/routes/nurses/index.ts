import { Router } from 'express';
import hiringAvailability from './hiringAvailability';

const nursesRouter: Router = Router();

nursesRouter.route('/hiring-availability').get(hiringAvailability)

export default nursesRouter
