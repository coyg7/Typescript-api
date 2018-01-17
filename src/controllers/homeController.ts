import { Request, Response, Router } from 'express';
import * as HTTPStatus from 'http-status-codes';
import * as homeService from '../services/homeService';

const router = Router();

router.get('/', (req: Request, res: Response): void => {
  const result = homeService.getAppInfo();
  res.status(HTTPStatus.OK).json(result);
});

export default router;
