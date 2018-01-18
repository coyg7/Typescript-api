import { request } from 'http';
import * as HTTPStatus from 'http-status-codes';
import * as todoService from '../services/todoService';
import { Request, Response, NextFunction, Router } from 'express';

const router = Router();

/**
 * Get all todos
 * 
 * @param {Request} req
 * @param {Request} req
 * @param {Request} req
 * @returns void
 */
 router.get('/', (req: Request, res: Response, next: NextFunction): void => {
   todoService
    .fetchAlltodos()
    .then((data: {}) => res.json({ data }))
    .catch((err: {}) => next(err));
 });


/**
 * Get todo by id
 * 
 * @param {Request} req
 * @param {Request} req
 * @param {Request} req
 * @returns void
 */
 router.get('/:id', (req: Request, res: Response, next: NextFunction): void => {
  todoService
    .fetchTodoById(req.params.id)
    .then((result: {}) => res.status(HTTPStatus.OK).json(result))
    .catch((err: {}) => next(err));
 });


 /**
 * Create todo
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */

router.post('/', (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  todoService
    .createTodo(req.body)
    .then((result: {}) => res.status(HTTPStatus.CREATED).json(result))
    .catch((error: {}) => next(error));
});


/**
 * Update todo information
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
router.put('/:id', (req: Request, res: Response, next: NextFunction): void => {
  req.body.id = req.params.id;
  todoService
    .updateTodo(req.body)
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
  todoService
    .removeTodoById(req.params.id)
    .then((result: {}) => res.status(HTTPStatus.OK).json(result))
    .catch((error: {}) => next(error));
});


 export default router;