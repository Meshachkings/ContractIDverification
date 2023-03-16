const express       = require('express'),
      passport      = require('passport'),
      router        = express.Router(),
      userCtrl      = require('../controller/users');
      local      = require('../auth');



router.post('/signup', userCtrl.signup);

// -------------------- LOGIN ------------------------------------------
router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login'
}));


// -------------------- LOGOUT -----------------------------------------
router.get('/logout', userCtrl.signout);

module.exports = router;