import { Request, Response } from 'express';
const _ = require('lodash');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const kogpt = require('../modules/kogpt');
const fairytaleDB = require('../dao/fairytale');

module.exports = {
  createFirstSentence: async (req: Request, res: Response) => {
    const { numOfPeople, backgroundPlace, lengthOfBook } = req.body;

    if (!numOfPeople || !backgroundPlace || !lengthOfBook) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    const listOfCharacters = ['피터팬', '신데렐라', '콩쥐', '백설공주', '앨리스', '라푼젤', '헨젤', '흥부'];
    const char = _.sampleSize(listOfCharacters, numOfPeople); //랜덤 캐릭터 최대 2인
    const lastNamesGrammer = [];

    for (let i = 0; i < char.length; i++) {
      if ((char[i].charAt(char[i].length - 1).charCodeAt(0) - 44032) % 28 > 0) lastNamesGrammer.push(['이', '은', '을']);
      else lastNamesGrammer.push(['가', '는', '를']);
    }

    let firstSentence = `어느 한 마을에 ${char[0] + lastNamesGrammer[0][0]} 살았어요. ${char[0] + lastNamesGrammer[0][1]} `;
    try {
      const result = await kogpt.makeNewSentence(firstSentence);
      firstSentence += result;
    } catch (err) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.KoGPT_ERROR));
    }

    if (numOfPeople >= 2) {
      firstSentence += ` 하루는 ${char[0] + lastNamesGrammer[0][1]} ${char[1] + lastNamesGrammer[1][2]} 만나러 ${backgroundPlace}에 갔어요.`;
    } else {
      firstSentence += ` 하루는 ${char[0] + lastNamesGrammer[0][1]} ${backgroundPlace}에 갔어요.`;
    }

    return res.status(statusCode.OK).send(
      util.success(statusCode.OK, resMessage.OK, {
        characters: char,
        length: lengthOfBook,
        background: backgroundPlace,
        firstSentence: firstSentence,
      }),
    );
  },

  createNewSentence: async (req: Request, res: Response) => {
    const { inputSentence } = req.body;

    try {
      const result = await kogpt.makeNewSentence(inputSentence);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.OK, result));
    } catch (err) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.KoGPT_ERROR));
    }
  },

  createNewBook: async (req: Request, res: Response) => {
    const { title, lengthOfBook, characters, backgroundPlace, contents } = req.body;

    if (!title || !lengthOfBook || !characters || !backgroundPlace || !contents) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    try {
      const bookID = await fairytaleDB.createBook(title, lengthOfBook, characters, backgroundPlace, contents);
      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.OK, bookID));
    } catch (err) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.NULL_ERROR));
    }
  },

  readUserInfo: async (req: Request, res: Response) => {
    //main view에 들어왔을 때 user_id를 받아 전체 책 목록을 로드
    const userIDX = req.params;

    if (!userIDX) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    try {
      const totalBookList = await fairytaleDB.readUserInfo(userIDX);
      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.OK, totalBookList));
    } catch (err) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.NULL_ERROR));
    }
  },

  readBook: async (req: Request, res: Response) => {
    //book 하나를 눌렀을 때 콘텐츠 받아오기
    const bookIDX = req.params;

    if (!bookIDX) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    try {
      const selectedBook = await fairytaleDB.readUserInfo(bookIDX);
      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.OK, selectedBook));
    } catch (err) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.NULL_ERROR));
    }
  },
};
