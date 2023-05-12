import pool from '../modules/pool';

const readAllBooks = async (userIDX?: String) => {
  const query = `SELECT idx, title, length, coverImage FROM Ticket WHERE user_idx = ${userIDX} AND is_finished = TRUE`;

  try {
    const result = await pool.queryParam(query);
    return result;
  } catch (err) {
    console.log('readAllBooks ERROR : ', err);
    throw err;
  }
};

const createNewTicket = async (userIdx: Number, characters: String, bgPlace: String, length: Number) => {
  const fields = 'user_idx, characters, bgPlace, length';
  const questions = `?, ?, ?, ?`;
  const values = [userIdx, characters, bgPlace, length];
  const query = `INSERT INTO Ticket (${fields}) VALUES (${questions})`;

  try {
    const result: any = await pool.queryParamArr(query, values);
    const insertId = result.insertId;
    return insertId;
  } catch (err) {
    console.log('createNewTicket ERROR : ', err);
    throw err;
  }
};

const addCoverInfo = async (ticketIdx: Number, title: String, coverImage: String) => {
  const query = `UPDATE Ticket SET title = "${title}", coverImage = "${coverImage}", is_finished = TRUE WHERE idx = "${ticketIdx}"`;

  try{
    const result = await pool.queryParam(query);
    return result;
  }catch(err){
    console.log('addCoverInfo ERROR : ', err);
    throw err;
  }
};

export default {
  readAllBooks,
  createNewTicket,
  addCoverInfo,
};