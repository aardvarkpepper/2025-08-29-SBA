const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require ('../controllers/authController');
const verifyAuthentication = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

router.get('/', verifyAuthentication, authController.getUser);
router.get('/admin', verifyAuthentication, adminOnly, authController.getUser);
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  authController.getUser
);

/**
 * Github OAuth
 */

router.get(
  '/github', 
  passport.authenticate('github', {
    failureRedirect: '/login', // Where to redirect if user denies
    session: false // we are using tokens not sessions.  Or are we?
  }),
  (req, res) => {
    const token = signToken(req.user);
    res.redirect(`http://localhost:3001?token=${token}`)
  }
);

router.get(
  '/github/callback',
  passport.authenticate('github'),
  // following runs only if authentication succeeded.  req.user is now populated by Passport with user data.
  (req, res) => {
    res.redirect('/api/auth/welcome');
  }
);

router.get('/welcome', (req, res) => {
  if (!req.user) return res.status(401).json({error: 'You must be logged in to see this.'});
  res.send(`Welcome ${req.user.username}!`);
});

module.exports=router;