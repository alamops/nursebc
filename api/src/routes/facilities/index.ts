import { Router } from 'express';
import availability from './availability';

const facilitiesRouter: Router = Router();

facilitiesRouter.route('/availability').get(availability)

export default facilitiesRouter
