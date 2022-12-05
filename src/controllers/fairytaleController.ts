import { Request, Response } from 'express';
import util from '../modules/util';
import statusCode from '../modules/statusCode';
import resMessage from '../modules/responseMessage';
import kogpt from '../modules/kogpt';
import fairytaleDB from '../dao/fairytale';
const _ = require('lodash');

/*
 * 첫 문장 생성 함수
 */
const createFirstSentence = async (req: Request, res: Response) => {
  const { userIdx, numOfPeople, backgroundPlace, lengthOfBook } = req.body;

  if (!userIdx || !numOfPeople || !backgroundPlace || !lengthOfBook) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
  }

  const listOfCharacters = ['피터팬', '신데렐라', '콩쥐', '백설공주', '앨리스', '라푼젤', '헨젤', '흥부'];
  const char = _.sampleSize(listOfCharacters, numOfPeople); //랜덤 캐릭터 최대 2인
  const charList = char.join();
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

  try {
    const bookIdx = await fairytaleDB.createBook(userIdx, lengthOfBook, charList, backgroundPlace);
    const saveDB = await fairytaleDB.saveSentence(bookIdx, firstSentence);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(
      util.success(statusCode.OK, resMessage.OK, {
        bookIdx: bookIdx,
        firstSentence: firstSentence,
      }),
    );
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.NULL_ERROR));
  }
};

/*
 * 2~마지막 문장 생성 함수
 */

const createNewSentence = async (req: Request, res: Response) => {
  const { bookIdx, inputSentence } = req.body;

  if (!bookIdx || !inputSentence) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
  }

  try {
    const outputSentence = await kogpt.makeNewSentence(inputSentence);
    let saveDB = await fairytaleDB.saveSentence(bookIdx, inputSentence); //DB에 더 접근을 줄일 수 있는 방법 생각해보기
    saveDB = await fairytaleDB.saveSentence(bookIdx, outputSentence as string); //타입 해결하기

    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.OK, outputSentence as string));
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.KoGPT_ERROR));
  }
};

/*
 * 창작 반복 끝난 후 제목 입력 받고 해당 책에 제목/완료상태 업데이트
 */
const createNewBook = async (req: Request, res: Response) => {
  const { bookIdx, title } = req.body;

  if (!bookIdx || !title) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
  }

  try {
    const bookID = await fairytaleDB.updateBookTitle(bookIdx, title);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.OK, bookID as Boolean)); //data 삭제하기
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.NULL_ERROR));
  }
};

/*
 * 메인뷰 진입시 전체 책 목록 받아오는 함수
 */
const readUserInfo = async (req: Request, res: Response) => {
  //main view에 들어왔을 때 user_id를 받아 전체 책 목록을 로드
  const userIDX = req.params;

  if (!userIDX) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
  }

  try {
    //const totalBookList = await fairytaleDB.readUserInfo(userIDX);
    //res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.OK, totalBookList));
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.NULL_ERROR));
  }
};

/*
 * 책 클릭 시 내용 받아오는 함수
 */
const readBook = async (req: Request, res: Response) => {
  //book 하나를 눌렀을 때 콘텐츠 받아오기
  const bookIDX = req.params;

  if (!bookIDX) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
  }

  try {
    //const selectedBook = await fairytaleDB.readUserInfo(bookIDX);
    //res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.OK, selectedBook));
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.NULL_ERROR));
  }
};

export default {
  createFirstSentence,
  createNewSentence,
  createNewBook,
  readUserInfo,
  readBook,
};
