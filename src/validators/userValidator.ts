import * as Boom from 'boom';
import lang from '../utils/lang';
import * as userService from '../services/userService';
import { Request, Response, NextFunction } from 'express';

/**
 * Validate unique email.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export function uniqueEmail(req: Request, res: Response, next: NextFunction) {
  return userService
    .findByEmail(req.body.email)
    .then(() => next(Boom.badRequest(lang.emailTaken)))
    .catch((err: {}) => next());
}

/**
 * Validate user existence.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export function userExists(req: Request, res: Response, next: NextFunction) {
  return userService
    .findById(req.params.id)
    .then(() => next())
    .catch(() => next(Boom.notFound(lang.userNotFound)));
}


export async function validateUser(user:LoginInput): Bluebird<any> {
  try {
    let users = await getUserByEmail(user.email);
    if (bcrypt.compareSync(user.password, users.toJSON().password)) {
      return users;
    } else {
      throw Boom.notFound('Invalid password');
    }
  } catch (err) {
    throw err;
  }
}
