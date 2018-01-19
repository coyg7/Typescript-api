import { request } from 'http';
import { Router } from 'express';
import * as HTTPStatus from 'http-status-codes';
import * as todoService from '../services/todoService';
import { Request, Response, NextFunction } from 'express';

const router = Router();

/**
 * Get list of todos
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
router.get('/',(req: Request, res: Response, next: NextFunction): void => {
  todoService
    .fetchAll()
    .then((result: {}) => res.status(HTTPStatus.OK).json(result))
    .catch((error: {}) => next(error));
});

export default router;