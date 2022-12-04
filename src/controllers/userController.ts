import { Request, Response } from 'express';
const request = require('request');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const userDB = require('../dao/user');
//const encrypt = require('../../../lib/crypto');
//const jwtHandlers = require('../../../lib/jwtHandlers');

module.exports = {
  /*
   * function name : signIn
   * feature : 회원가입/로그인
   * req : 계정 정보
   * res : user idx, jwt token
   */
  login: async (req: Request, res: Response) => {
    const { snsId, username } = req.body;

    if (!snsId) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    const alreadyUser = await userDB.getUserById(snsId);
    if (alreadyUser.length) {
      // 해당 email을 가진 유저가 이미 있을 때 - 로그인
    }

    //없으면 - 회원가입
    const user = await userDB.createUser(snsId, username);
    //const { accesstoken } = ;

    return res.status(statusCode.OK).send(
      util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {
        userIdx: user.userIdx,
        //accesstoken: accesstoken,
      }),
    );
  },
};
