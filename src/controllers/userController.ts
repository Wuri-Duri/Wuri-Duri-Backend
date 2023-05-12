import { Request, Response } from 'express';
import util from '../modules/util';
import statusCode from '../modules/statusCode';
import resMessage from '../modules/responseMessage';
import userDB from '../model/user';
const request = require('request');
//const encrypt = require('../../../lib/crypto');
//const jwtHandlers = require('../../../lib/jwtHandlers');

/*
 * function name : login
 * feature : 회원가입/로그인
 * req : 계정 정보
 * res : user idx, jwt token
 */

const login = async (req: Request, res: Response) => {
  const { snsId, username }: { snsId?: String; username: String } = req.body;

  if (!snsId || !username) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
  }

  let userIdx = await userDB.getUserById(snsId);
  if (!userIdx) {
    userIdx = await userDB.createUser(snsId, username); //없으면 회원가입
  }

  const accesstoken = '토큰 작업중';

  return res.status(statusCode.OK).send(
    util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {
      userIdx: userIdx,
      accesstoken: accesstoken,
    }),
  );
};

export default {
  login,
};
