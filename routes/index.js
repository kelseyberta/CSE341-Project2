const express = require('express');
const passport = require('passport');

const router = express.Router();

router.use('/', require('./swagger.js'));
router.use('/recipes', require('./recipes'));
router.use('/users', require('./users'))

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;