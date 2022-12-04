import { Request, Response } from 'express';
const request = require('request');
const util = require('./util');
const statusCode = require('./statusCode');
const resMessage = require('./responseMessage');
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
  makeNewSentence: async (sentence: String) => {
    return new Promise(async (resolve, reject) => {
      try {
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
          const createdText = body.generations[0].text;
          const splitedText = createdText.split(/(\!|\.|\?)/); //., ?, !로 문장 split
          const finalText = splitedText[0].trimStart() + splitedText[1];

          resolve(finalText);
        });
      } catch (err) {
        reject(err);
      }
    });
  },
};
