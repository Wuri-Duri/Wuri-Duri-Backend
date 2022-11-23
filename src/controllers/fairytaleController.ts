import express, { Request, Response } from 'express';
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const fairytaleDao = require('../dao/fairytale');

module.exports = {
  /*
   * function name : trimNewSentence
   * feature : KoGPT에서 생성한 문자열을 받아 온점, 물음표, 느낌표를 기준으로 split하여 첫 문장을 반환합니다.
   * req : API로부터 생성된 문장
   * res : split 처리 된 첫번째 문장
   */
  trimNewSentence: async (req: Request, res: Response) => {
    //req로 변경 필요. 여기서 바로 API 호출할 수 있나?
    const createdText = ' 백설공주에게는 난쟁이 친구가 있었어요. 피터팬은 늘 백설공주와 함께 놀고 싶어했어요! 그래서 둘은 다투기도 하고 또 서로를';

    if (!createdText) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    const splitedText = createdText.split(/(\!|\.|\?)/); //., ?, !로 문장 split
    const finalText = splitedText[0].trimStart() + splitedText[1];

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.OK, finalText));
  },

  /*
   * function name : createSentences
   * feature : KoGPT를 call합니다. 이전에 실행된 문장이 있을 경우 누적하여 input sentence를 생성해 넘깁니다.
   * req : 이전 턴에 AI가 만든 문장과 사용자가 만든 문장 (프론트에서 누적해서 보내줌)
   * res : trimNewSentence res
   */
  createSentences: async (req: Request, res: Response) => {
    //첫번째 입력일 경우 키워드 선택 결과 받아서 문장 생성
    //
    //
    //두 번째 이상 입력일 경우 (프론트에서 AI에게 받은 문장과 내가 만든 문장을 더해서 보내줄 것임)
    //DB에서 텍스트를 GET해와서 -> 받은 문장 누적해서 더하고 -> 그 문장 DB에 POST하고 -> 그 문장들로 trimNewSentence 호출
    //
    //
    //동화책 길이만큼 반복이 끝났다면 결과 함수 호출(누적해서 더한 문장을 DB에 POST하고 전체 내용을 반환)
  },
};
