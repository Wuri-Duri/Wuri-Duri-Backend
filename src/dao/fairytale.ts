const pool = require('../modules/pool');

module.exports = {
  createBook: async (userIdx: Number, title: String, lengthOfBook: Number, charList: String, backgroundPlace: String, contents: String) => {
    const fields = 'user_idx, title, length, characters, background, contents';
    const questions = `?, ?, ?, ?, ?, ?`;
    const values = [userIdx, title, lengthOfBook, charList, backgroundPlace, contents];
    const query = `INSERT INTO Books (${fields}) VALUES (${questions})`;

    try {
      const result = await pool.queryParamArr(query, values);
      const insertId = result.insertId;
      return insertId;
    } catch (err) {
      console.log('createBook ERROR : ', err);
      throw err;
    }
  },

  readUserInfo: async () => {},
  readBook: async () => {},
};
