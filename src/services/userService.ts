import * as Boom from 'boom';
import knex from '../config/db';
import lang from '../utils/lang';
import * as bcrypt from 'bcrypt';
import User from '../models/user';
import * as jwt from '../utils/jwt';
import * as Bluebird from 'bluebird';
import LoginInput from '../domain/Login';
import LoginOutput from '../domain/LoginOutput';
import Token from '../models/tokens';
import UpdateBody from '../domain/UpdateBody';
import RegisterBody from '../domain/RegisterBody';

/**
 * Create user
 *
 * @param  {RegisterBody} body
 * @returns {Bluebird}
 */
export function createUser(user: RegisterBody): Bluebird<{}> {
  return new User({
    name: user.name,
    email: user.email,
    password: bcrypt.hashSync(user.password, 8)
  })
    .save()
    .then((user: {}) => user)
    .catch((err: any) => err);
}

/**
 * Fetch user by id
 *
 * @param  {number} id
 */
export function findById(id: number) {
  return new User({ id })
    .fetch()
    .then((user: {}) => {
      if (!user) {
        throw Boom.notFound('User not found');
      }

      return user;
    });
}

/**
 * Fetch all user
 *
 * @returns Promise
 */
export function fetchAll(): Bluebird<{}> {
  return User.fetchAll();
}

/**
 * Update specific user
 *
 * @param  {UpdateBody} body
 * @returns {Bluebird}
 */
export function update(id: number, body: {}): Bluebird<{}> {
  return new User({ id })
    .save({ name: body.name, email: body.email, password: body.password })
    .then((user: {}) => user)
    .catch((err: any) => err);
}

/**
 * Remove specific user
 *
 * @param  {number} id
 * @returns {Bluebird}
 */
export function removeUserById(id: number): Bluebird<{}> {
  return new User({ id })
    .fetch()
    .then(token => token.destroy())
    .catch((err: any) => err);
}


/**
 * Validate password and Login user and return Access and Refresh tokens
 *
 * @param  {number} id
 * @returns {Bluebird}
 */
export async function loginUser(user: LoginInput): Bluebird<LoginOutput> {
  try {
    let validUser = await validateUser(user);
    let accessToken = await jwt.generateAccessToken(user);
    let refreshToken = await jwt.generateRefreshToken(user);
    validUser.token().save({
      token: refreshToken
    });

    return {
      user: validUser,
      token: {
        accessToken,
        refreshToken
      }
    };
  } catch (err) {
    throw err;
  }
}

/**
 * Validate email and password
 * 
 * @param user 
 *  @returns {Bluebird}
 */
export async function validateUser(user: LoginInput): Bluebird<any> {
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

/**
 * 
 * @param email 
 * @returns {Bluebird}
 */
export function getUserByEmail(email: string): Bluebird<any> {
  let user = new User({ email }).fetch();
  return user.then((user: {}) => {
    if (!user) {
      throw Boom.notFound('User not found');
    }
    return user;
  });
}

export function deleteUser(token: string): Bluebird<any> {
  try {
    jwt.verifyRefreshToken(token);
    return new Token({ token })
      .fetch()
      .then(rfstoken => rfstoken.destroy());
  } catch (error) {
    throw error;
  }
}

export async function verifyUser(token: string): Bluebird<any> {
  return await jwt.verifyAccessToken(token);
}

export function validateRefreshToken(token: string): Bluebird<Token> {
  return new Token({ token })
    .fetch()
    .then(token => {
      if (!token) {
        throw Boom.notFound('Token not found');
      }

      return token;
    });
}