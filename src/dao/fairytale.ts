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

const createBook = async (userIdx: Number, title: String, lengthOfBook: Number, charList: String, backgroundPlace: String, contents: String) => {
  const fields = 'user_idx, title, length, characters, background, contents';
  const questions = `?, ?, ?, ?, ?, ?`;
  const values = [userIdx, title, lengthOfBook, charList, backgroundPlace, contents];
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

// readUserInfo: async () => {},
// readBook: async () => {},

export default {
  createBook,
};
