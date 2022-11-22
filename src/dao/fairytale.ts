const pool = require('../modules/pool');

module.exports = {
  //예시입니다.
  //DB에 접근해야 하는 기능마다 함수를 생성합니다. req 타입 정확히 명시하세요.

  //1. value 없을 경우
  exampleWithoutValue: async (hey: String) => {
    const query = `SELECT * FROM 테이블이름 WHERE 컬럼이름 = "${hey}"`; //쿼리 작성

    try {
      const result = await pool.queryParam(query);
      return result;
    } catch (err) {
      console.log('함수 이름 ERROR : ', err);
      return false;
    }
  },

  //2. value 있을 경우 (새로운 row를 create하는 경우겠죠)
  exampleWithValue: async (hey: String, hey2: String) => {
    const fields = 'name, nickname';
    const questions = `?, ?`;
    const values = [hey, hey2];
    const query = `INSERT INTO 테이블이름 (${fields}) VALUES (${questions})`;

    try {
      const result = await pool.queryParamArr(query, values);
      return result;
    } catch (err) {
      console.log('함수 이름 ERROR : ', err);
      return false;
    }
  },
};
