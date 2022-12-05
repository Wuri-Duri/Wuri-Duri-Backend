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

  try {
    const result: any = await pool.queryParamArr(query, values); //오류 해결하기
    const insertId = result.insertId;
    return insertId;
  } catch (err) {
    console.log('createBook ERROR : ', err);
    throw err;
  }
};

const saveSentence = async (bookIdx: Number, sentence: String) => {
  const fields = 'book_idx, sentences';
  const questions = `?, ?`;
  const values = [bookIdx, sentence];
  const query = `INSERT INTO Content (${fields}) VALUES (${questions})`;

  try {
    const result = await pool.queryParamArr(query, values);
    return true;
  } catch (err) {
    console.log('saveSentence ERROR : ', err);
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
  saveSentence,
  updateBookTitle,
};
