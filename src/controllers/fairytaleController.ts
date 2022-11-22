import express, { Request, Response } from 'express';
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const fairytaleDao = require('../dao/fairytale');

module.exports = {
  //예시입니다.
  //기능 별로 example처럼 함수를 만듭니다.
  example: async (req: Request, res: Response) => {
    //example은 아래의 조건문에 따른 분기처리를 확인하기 위한 임시 변수입니다.
    const example = false;

    //fail이 뜨게 하는 코드입니다. example을 바꿔가며 확인해보세요.
    if (example) {
      //statusCode와 resMessage는 상황에 맞게 사용하세요.
      return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.NULL_VALUE));
    }

    //fail이 뜰 조건들을 모두 통과했을 경우(문제가 없을 경우) success를 뜨게 하는 코드입니다.
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.OK, '결과값을 반환할 수 있어요.'));
  },
};
