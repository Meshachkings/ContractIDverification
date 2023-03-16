const User          = require('../models/users'),
      passport      = require('passport');


const signup = (req, res, next) => {
  console.log(req.body.username)
    User.register(new User({
        username: req.body.username,
        }), 
        req.body.password, (err, user) => {
        if(err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
        }
        else {
        passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Successful!'});
        });
        }
    });
}

/* -------------------------------------------
***************** SIGN IN ********************
-------------------------------------------- */
const signin = (req, res) => {
    res.redirect('/admin');
}


/* -------------------------------------------
***************** SIGN OUT ********************
-------------------------------------------- */
const signout = (req, res) => {
    if (req.session) {
      req.session.destroy();
      res.clearCookie('session-id');
      res.redirect('/');
    }
    else {
      var err = new Error('You are not logged in!');
      err.status = 403;
      next(err);
    }
  }




module.exports = {
    signup, signin, signout
}