import * as Boom from 'boom';
import Token from '../models/tokens';

import { knex } from '../config/db';
import lang from '../utils/lang';
import UpdateBody from '../domain/UpdateBody';
import RegisterBody from '../domain/RegisterBody';
import * as jwt from '../utils/jwt';

import User from '../models/user';

let bcrypt = require('bcrypt');

/**
 * Create user
 *
 * @param  {RegisterBody} body
 * @returns Promise
 */
export function create(body: RegisterBody): Promise<{}> {
  return knex('users')
    .insert({ name: body.name, email: body.email, password: body.password })
    .returning('*')
    .then((data: number[]) => ({ data: data[0] }));
}

/**
 * Fetch user by id
 *
 * @param  {number} id
 */
export function findById(id: number) {
  return knex('users')
    .where('id', '=', id)
    .first()
    .then((user: {}) => {
      if (!user) {
        throw Boom.notFound(lang.userNotFound);
      }

      return { data: user };
    });
}

/**
 * Fetch user by email
 *
 * @param  {string} email
 */
export function findByEmail(email: string) {
  return knex('users')
    .where('email', '=', email)
    .first()
    .then((user: {}) => {
      if (!user) {
        throw Boom.notFound(lang.userNotFound);
      }

      return { data: user };
    });
}

/**
 * Fetch all user
 *
 * @returns Promise
 */
export function fetchAll(): Promise<{}> {
  return knex('users')
    .select()
    .then((data: {}) => ({ data }));
}

/**
 * Update specific user
 *
 * @param  {UpdateBody} body
 * @returns Promise
 */
export function update(body: UpdateBody): Promise<{}> {
  return knex('users')
    .where('id', body.id)
    .update({
      name: body.name,
      email: body.email,
      password: body.password
    })
    .returning('*')
    .then((data: number[]) => ({ data: data[0] }));
}

/**
 * Remove specific user
 *
 * @param  {number} id
 * @returns Promise
 */
export function removeUserById(id: number): Promise<{}> {
  console.log(id);
  return knex('users')
    .where('id', id)
    .delete()
    .then((user: {}) => ({
      message: 'User deleted successfully',
      data: {
        id: user
      }
    }));
}

export async function validateUser(user: any): {} {
  try {
    let users = await findByEmail(user.email);
    if (bcrypt.compareSync(user.password, users.toJSON().password)) {
      return users;
    } else {
      throw new Boom.notFound('Invalid password');
    }
  } catch (err) {
    throw err;
  }
}


export async function loginUser(user:any): {} {
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
        access: accessToken,
        refresh: refreshToken
      }
    };
  } catch (err) {
    throw err;
  }
}

export function validateRefreshToken(token) {
  return new Token({
    token
  }).fetch().then(token => {
    if (!token) {
      throw new Boom.notFound('Token not found');
    }

    return token;
  });
}

