const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('req.user:', req.user);
  if(req.isAuthenticated() && req.user.clearance_level >= 18) {
    pool
    .query('SELECT * FROM "secret";')
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403)
  }

});

module.exports = router;
