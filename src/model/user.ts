import pool from '../modules/pool';

const getUserById = async (snsId: String) => {
  const query = `SELECT id FROM User WHERE sns_id = '${snsId}'`;

  try {
    let result: any = await pool.queryParam(query);

    if (result.length) {
      result = result[0].id;
    } else {
      result = 0;
    }

    return result;
  } catch (err) {
    console.log('getUserById ERROR : ', err);
    throw err;
  }
};

const createUser = async (snsId: String, username: String) => {
  const date = new Date();
  const fields = 'sns_id, created_at, username';
  const questions = `?, ?, ?`;
  const values = [snsId, date, username];
  const query = `INSERT INTO User (${fields}) VALUES (${questions})`;

  try {
    const result: any = await pool.queryParamArr(query, values);
    return result.insertId;
  } catch (err) {
    console.log('createUser ERROR : ', err);
    throw err;
  }
};

export default {
  createUser,
  getUserById,
};
