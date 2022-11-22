import { Router } from 'express';
import coworkers from './coworkers';
import hiringAvailability from './hiringAvailability';

const nursesRouter: Router = Router();

nursesRouter.route('/hiring-availability').get(hiringAvailability)
nursesRouter.route('/coworkers').get(coworkers)

export default nursesRouter
