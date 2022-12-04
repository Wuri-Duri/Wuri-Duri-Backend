const pool = require('../modules/pool');

module.exports = {
  createBook: async (title: String, lengthOfBook: Number, characters: String[], backgroundPlace: String, contents: String) => {
    const fields = 'title, length, characters, background, contents';
    const questions = `?, ?, ?, ?, ?`;
    const values = [title, lengthOfBook, characters, backgroundPlace, contents];
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
};
