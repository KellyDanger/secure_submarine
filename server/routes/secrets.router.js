const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user:', req.user);
  if(req.user.clearance_level >= 18) {
    pool
    .query('SELECT * FROM "secret";')
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
  } else if(req.user.clearance_level < 11 && req.user.clearance_level > 5){
    pool
    .query(`SELECT * FROM "secret" WHERE "secrecy_level" <= 10;`)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    }) 
  } else if(req.user.clearance_level < 5 && req.user.clearance_level > 3) {
    pool
    .query(`SELECT * FROM "secret" WHERE "secrecy_level" <= 4;`)
    .then((results)=> res.send(results.rows))
    .catch((error)=> {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500)
    })
  }else {
    res.sendStatus(403)
  }
 
});

module.exports = router;


// else if(req.isAuthenticated()){
//   pool.query(`SELECT * FROM "secret" JOIN "user" on ${req.user.clearance_level} >= "secret"."secrecy_level";`)
//   .then((results) => res.send(results.rows))
//   .catch((error)=> {
//     console.log('error in making select for secrets', error);
//     res.sendStatus(500);
//   })