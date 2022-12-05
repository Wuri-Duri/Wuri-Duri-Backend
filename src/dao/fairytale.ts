import pool from '../modules/pool';

interface ResultFromPOST {
  fieldCount?: number;
  affectedRows?: number;
  insertId?: number;
  serverStatus?: number;
  warningCount?: number;
  message?: string;
  protocol41?: boolean;
  changedRows?: number;
}

const createBook = async (userIdx: Number, lengthOfBook: Number, charList: String, backgroundPlace: String) => {
  const fields = 'user_idx, length, characters, background';
  const questions = `?, ?, ?, ?`;
  const values = [userIdx, lengthOfBook, charList, backgroundPlace];
  const query = `INSERT INTO Book (${fields}) VALUES (${questions})`;

  //여기서 생성된 문장도 Content 테이블에 넣어야 함. 추가 필요!

  try {
    const result: any = await pool.queryParamArr(query, values); //오류 해결하기
    const insertId = result.insertId;
    return insertId;
  } catch (err) {
    console.log('createBook ERROR : ', err);
    throw err;
  }
};

const saveSentences = async (bookIdx: Number, inputSentence: String, outputSentence: String) => {
  const fields = 'book_idx, sentences';
  const questions = `?, ?`;
  const values1 = [bookIdx, inputSentence];
  const values2 = [bookIdx, outputSentence];
  const query = `INSERT INTO Content (${fields}) VALUES (${questions})`;

  try {
    //더 좋은 방법 고민해보기.. 흠.
    const result1 = await pool.queryParamArr(query, values1);
    const result2 = await pool.queryParamArr(query, values2);
    return true;
  } catch (err) {
    console.log('saveSentences ERROR : ', err);
    throw err;
  }
};

const updateBookTitle = async (bookIdx: Number, title: String) => {
  const query = `UPDATE Book SET title = '${title}', is_finished = TRUE WHERE id = ${bookIdx}`;

  try {
    const result = await pool.queryParam(query);
    return true;
  } catch (err) {
    console.log('updateBookTitle ERROR : ', err);
    throw err;
  }
};

// readUserInfo: async () => {},
// readBook: async () => {},

export default {
  createBook,
  saveSentences,
  updateBookTitle,
};
