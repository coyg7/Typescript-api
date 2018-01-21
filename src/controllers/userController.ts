import { request } from 'http';
import { Router } from 'express';
import * as jwt from '../utils/jwt';
import todoController from './todoController';
import * as HTTPStatus from 'http-status-codes';
import * as userService from '../services/userService';
import * as todoService from '../services/todoService';
import ensureToken from '../utils/ensureToken';
import { Request, Response, NextFunction } from 'express';


const router = Router();

/**
 * Get list of user
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
router.get('/',(req: Request, res: Response, next: NextFunction): void => {
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
router.get('/:id',(req: Request, res: Response, next: NextFunction): void => {
  userService
    .findById(req.params.id)
    .then((result = {}) => res.status(HTTPStatus.OK).json(result))
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
router.put('/:id',(req: Request, res: Response, next: NextFunction): void => {
  userService
    .update(req.params.id,req.body)
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
router.delete('/:id',(req: Request, res: Response, next: NextFunction): void => {
  userService
    .removeUserById(req.params.id)
    .then((result: {}) => res.status(HTTPStatus.OK).json(result))
    .catch((error: {}) => next(error));
});


/**
 * Create user-specific todo
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
router.post('/:id/todo', ensureToken, (req: Request, res: Response, next: NextFunction):void => {
  todoService
    .createTodo(req.params.id,req.body)
    .then((data: {} )=> res.json({ data }))
    .catch((err: any) => next(err));
});

/**
 * Get user-specific todo
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
router.get('/:id/todo', ensureToken,(req: Request, res: Response, next: NextFunction):void => {
  if(req.query){

    todoService
    .getUserTodo(req.params.id)
    .then((data: {}) => res.json({ data }))
    .catch((err: any) => next(err));
  }
  else{
    todoService
      .searchText(req.params.id, req.query.search)
      .then((data:{}) => res.json({ data }))
      .catch((err: any) => next(err));
  }
});

/**
 * Get user-specific todo by Page Number
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
router.get('/:id/todo/:pageNo', ensureToken, (req: Request, res: Response, next: NextFunction):void => {
  todoService
    .getUserPageTodo(req.params.id, req.params.pageNo)
    .then((data: {}) => res.json({ data }))
    .catch((err: any) => next(err));
});

/**
 * Get user-specific todo by TODO_ID
 */
router.put('/:id/todo/:todoId', ensureToken, (req: Request, res: Response, next: NextFunction):void => {
    todoService
      .updateTodo(req.params.todoId, req.body)
      .then((data:{}) => res.json({ data }))
      .catch((err:any) => next(err));
  }
);

/**
 * DELETE user-specific todo by Todo number
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
router.delete('/:id/todo/:todoId', ensureToken, (req: Request, res: Response, next: NextFunction):void  => {
  todoService
    .deleteTodo(req.params.todoId)
    .then((data:{}) => res.json({ message: 'delete success', data }))
    .catch((err:any) => next(err));
});

export default router;
