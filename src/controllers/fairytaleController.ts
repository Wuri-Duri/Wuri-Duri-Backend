import { Request, Response } from 'express';
const request = require('request');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const fairytaleDao = require('../dao/fairytale');
const appKey = require('../config/apiConfig.ts');

interface Generations {
  text: String;
  tokens: Number;
}

interface Sentence {
  id: String;
  generations: Generations[];
  usage: Object;
}

module.exports = {
  /*
   * function name : trimNewSentence
   * feature : KoGPT를 호출해 생성한 문자열을 받아 온점, 물음표, 느낌표를 기준으로 split하여 첫 문장을 반환합니다.
   * req : input 문장
   * res : split 처리 된 첫번째 문장
   */
  trimNewSentence: async (req: Request, res: Response) => {
    const sentence = '백설공주와 피터팬은 친한 친구였어요.'; //클라이언트에서 받은 것으로 교체 필요

    const options = {
      uri: 'https://api.kakaobrain.com/v1/inference/kogpt/generation',
      method: 'POST',
      body: {
        prompt: sentence,
        max_tokens: 50,
        temperature: 0.6,
        n: 1,
      },
      json: true,
      headers: {
        Authorization: 'KakaoAK ' + appKey.KoGPT,
      },
    };
    request.post(options, function (err: Error, response: Response, body: Sentence) {
      if (response.statusCode !== 200) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.KoGPT_ERROR));
      }

      const createdText = body.generations[0].text;
      const splitedText = createdText.split(/(\!|\.|\?)/); //., ?, !로 문장 split
      const finalText = splitedText[0].trimStart() + splitedText[1];

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.OK, finalText));
    });
  },
};
