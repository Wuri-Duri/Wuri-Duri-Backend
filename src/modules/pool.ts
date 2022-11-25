const poolPromise = require('../config/dbConfig');

module.exports = {
  queryParam: async (query: String) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await poolPromise;
        const connection = await pool.getConnection();
        try {
          const result = await connection.query(query);
          pool.releaseConnection(connection);
          resolve(result);
        } catch (err) {
          pool.releaseConnection(connection);
          reject(err);
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  queryParamArr: async (query: String, value: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await poolPromise;
        const connection = await pool.getConnection();
        try {
          const result = await connection.query(query, value);
          pool.releaseConnection(connection);
          resolve(result);
        } catch (err) {
          pool.releaseConnection(connection);
          reject(err);
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  // Transaction: async (...args) => {
  //     return new Promise(async (resolve, reject) => {
  //         try {
  //             const pool = await poolPromise;
  //             const connection = await pool.getConnection();
  //             try {
  //                 await connection.beginTransaction();
  //                 args.forEach(async (it) => await it(connection));
  //                 await connection.commit();
  //                 pool.releaseConnection(connection);
  //                 resolve(result);
  //             } catch (err) {
  //                 await connection.rollback()
  //                 pool.releaseConnection(connection);
  //                 reject(err);
  //             }
  //         } catch (err) {
  //             reject(err);
  //         }
  //     });
  // }
};
