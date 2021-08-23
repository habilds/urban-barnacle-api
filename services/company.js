const db = require('./db');

async function findAll(){
  const data = await db.query('SELECT * FROM companies');

  return {
    data
  };
};

async function create(data) {
  const result = await db.query(
    'INSERT INTO companies (type, founded_at, late_status, biaya_pendaftaran) VALUES (?, ?, ?, ?)',
    [data.type, data.founded_at, data.late_status, data.biaya_pendaftaran]);

  if (result.affectedRows) {
    return {
      message: 'Success'
    };
  }

  return {
    message: 'Failed'
  };
};

function monthDiff(dateFrom, dateTo) {
  return dateTo.getMonth() - dateFrom.getMonth() + 
    (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
 };

module.exports = {
  findAll,
  create,
  monthDiff,
};
