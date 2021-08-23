const db = require('./db');

async function login(username, password) {
  const user = await db.query(
    'SELECT * FROM users WHERE username=? AND password=?',
    [username, password]);

  if (user.length > 0) {
    return {
      status: 200,
      token: 'eyJhbGciOiJIUzUxMiJ9.eyJtbGQiOiJra24iLCJpc3N1ZXIiOiJtb29ubGF5IiwidmxkIjoiYmJjIn0.7h2cI7Dw46MLqImAmUSSKwMwCkGRM_yzPaoPtwxuG5Y_NqpMQvE_b0CNCji7BGgIKRSXNq3uYpKy9EM3nQulGw',
    };
  }

  return {
    status: 401,
    message: 'Username and password not match',
  };
};

module.exports = {
  login
};
