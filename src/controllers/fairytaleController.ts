import { Request, Response } from 'express';
import util from '../modules/util';
import statusCode from '../modules/statusCode';
import resMessage from '../modules/responseMessage';
import fairytaleDB from '../model/fairytale';

//s3 고치면서 interface 경로 만들기 - ts 쓰기로 해놓고 코드 이게 뭐야!

/*
 * 내 서재 - 전체 티켓 정보 받아오기
 */

const readAllBooks = async (req: Request, res: Response) => {
  const { userIDX }: { userIDX?: String } = req.params;

  if (!userIDX) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
  }

  try {
    const allBookList = await fairytaleDB.readAllBooks(userIDX);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_BOOKLIST_SUCCESS, allBookList as Object));
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.NULL_ERROR));
  }
};

/*
 * 사전 설정 - 등장인물, 배경장소, 길이 선택
 */

const createNewTicket = async (req: Request, res: Response) => {
  const {
    userIdx,
    characters,
    bgPlace,
    length,
  }: {
    userIdx: Number;
    characters: String[];
    bgPlace: String;
    length: Number;
  } = req.body;

  if (!userIdx || !characters || !bgPlace || !length) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
  }

  const charList = characters.join();

  try {
    const ticketIdx = await fairytaleDB.createNewTicket(userIdx, charList, bgPlace, length);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CREATE_TICKET_SUCCESS, ticketIdx as Number)); //data 삭제하기
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.NULL_ERROR));
  }
};


/*
 * 커버 등록 - 티켓 제목, 이미지 선택
 */

const addCoverInfo = async (req: Request, res: Response) => {
  const {
    ticketIdx,
    title,
    coverImage
  }: {
    ticketIdx: Number;
    title: String;
    coverImage: String;
  } = req.body;

  if (!ticketIdx || !title || !coverImage) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
  }

  try {
    const result = await fairytaleDB.addCoverInfo(ticketIdx, title, coverImage);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ADD_COVER_SUCCESS, true));
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, resMessage.NULL_ERROR));
  }

};

export default {
  readAllBooks,
  createNewTicket,
  addCoverInfo
};
