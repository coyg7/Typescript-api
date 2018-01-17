import {request} from 'http';
import * as HTTPStatus from 'http-status-codes';
import * as userService from '../services/userService';
import {Request, Response, NextFunction, Router } from 'express';

const router = Router();

/**
 * Get list of user
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  userService
    .fetchAll()
    .then((result: {}) => res.status(HTTPStatus.OK).json(result))
    .catch((error: {}) => next(error));
});

/**
 * Get specific user
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */

router.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction): void => {
    userService
      .findById(req.params.id)
      .then((result = {}) => res.status(HTTPStatus.OK).json(result))
      .catch((error: {}) => next(error));
  }
);

/**
 * Register user
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */

router.post('/register', (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  userService
    .create(req.body)
    .then((result: {}) => res.status(HTTPStatus.CREATED).json(result))
    .catch((error: {}) => next(error));
});


/**
 * Update specific user information
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
router.put('/:id', (req: Request, res: Response, next: NextFunction): void => {
  req.body.id = req.params.id;
  userService
    .update(req.body)
    .then((result: {}) => res.status(HTTPStatus.OK).json(result))
    .catch((error: {}) => next(error));
});


/**
 * Delete specific user information
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */

router.delete('/:id', (req: Request, res: Response, next: NextFunction): void => {
  userService
    .removeUserById(req.params.id)
    .then((result: {}) => res.status(HTTPStatus.OK).json(result))
    .catch((error: {}) => next(error));
});


export default router;
