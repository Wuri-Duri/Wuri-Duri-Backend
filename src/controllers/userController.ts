import { Request, Response } from 'express';
const request = require('request');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const userDao = require('../dao/user');

module.exports = {
  /*
   * function name : signIn
   * feature : 회원가입/로그인
   * req : 계정 정보
   * res : jwt token
   */
  signIn: async (req: Request, res: Response) => {},
};
