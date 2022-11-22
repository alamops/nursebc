import { Router } from 'express';
import all from './all';
import compare from './compare';

const shiftsRouter: Router = Router();

shiftsRouter.route('/all').get(all)

shiftsRouter.route('/compare').get(compare)

export default shiftsRouter
