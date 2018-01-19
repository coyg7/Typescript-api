import { Request, Response, NextFunction } from 'express';
import * as jwt from './jwt';


function ensureToken(req: Request, res: Response, next: NextFunction): void {
  const bearerHeader: string = String(req.headers['authorization']);
  if (typeof bearerHeader !== 'undefined') {
    const bearer: string[] = bearerHeader.split(' ');
    const bearerToken: string = bearer[1];
    try {
      jwt.verifyAccessToken(bearerToken);
      next();
    }
    catch (err) {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(400);
  }
}

export default ensureToken;