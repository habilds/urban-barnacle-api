const express = require('express');
const router = express.Router();
const companies = require('../services/company');

/* GET companies listing. */
router.get('/', async function(req, res, next) {
  const token = req.headers.authorization;
  const originalToken = 'eyJhbGciOiJIUzUxMiJ9.eyJtbGQiOiJra24iLCJpc3N1ZXIiOiJtb29ubGF5IiwidmxkIjoiYmJjIn0.7h2cI7Dw46MLqImAmUSSKwMwCkGRM_yzPaoPtwxuG5Y_NqpMQvE_b0CNCji7BGgIKRSXNq3uYpKy9EM3nQulGw';

  if (token !== `Bearer ${originalToken}`) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  try {
    res.json(await companies.findAll());
  } catch (err) {
    console.error(`Error while getting companies `, err.message);
    next(err);
  }
});

/* POST company. */
router.post('/', async function(req, res, next) {
  const token = req.headers.authorization;
  const originalToken = 'eyJhbGciOiJIUzUxMiJ9.eyJtbGQiOiJra24iLCJpc3N1ZXIiOiJtb29ubGF5IiwidmxkIjoiYmJjIn0.7h2cI7Dw46MLqImAmUSSKwMwCkGRM_yzPaoPtwxuG5Y_NqpMQvE_b0CNCji7BGgIKRSXNq3uYpKy9EM3nQulGw';

  if (token !== `Bearer ${originalToken}`) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const { type, founded_at } = req.body;
  console.log(req.body);
  const dateNow = new Date();
  const dateFounded = new Date(Date.parse(founded_at));
  const data = {
    type,
    founded_at,
    late_status: null,
    biaya_pendaftaran: 3000000,
  };

  if (companies.monthDiff(dateNow, dateFounded) > 1) {
    data.late_status = 'TERLAMBAT';
  }

  if (type === 'Perseorangan') {
    data.biaya_pendaftaran = 1000000;
  }

  try {
    res.json(await companies.create(data));
  } catch (err) {
    console.error(`Error while getting companies `, err.message);
    next(err);
  }
});

module.exports = router;
