var express = require('express');
var router = express.Router();
const auth = require('../services/auth');

/* POST login. */
router.post('/', async function(req, res, next) {
  const { username, password } = req.body;

  try {
    const response = await auth.login(username, password);

    res.status(response.status).json(response);
  } catch (err) {
    console.error(`Error while login `, err.message);
    next(err);
  }
});

module.exports = router;
