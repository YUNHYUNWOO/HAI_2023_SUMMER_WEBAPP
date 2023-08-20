var express = require('express');
var router = express.Router({mergeParams:true});
var usersRouter = require('./users');
var historyRouter = require('./history');
var apiRouter = require('./api');
var authRouter = require('./auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users/', usersRouter);
router.use('/auth/', authRouter);
router.use('/history', historyRouter)
router.use('/api/', apiRouter);

module.exports = router;
