const router = require('express').Router();
const userRoutes = require('./userRoutes');
const noteRoutes = require('./noteRoutes');
 
router.use('/users', userRoutes);
router.use('/notes', noteRoutes);
//there won't be a <h1> stating 404 if nonexistent route called, as in routes/index.js?

module.exports = router;

/**
 * So I do this:
 * 
 * Say in routes/index.js (the main file that gets passed to server.js, say server has const routes = require('./routes/index.js'); then invoked with app.use(routes) has
 * 
 * const apiRoutes = require('./api/index')
 * router.use('/api', authenticateUser); // the middleware (must be listed first)
 * router.use('/api', apiRoutes); // the routes (must be listed last after all middlewares)
 * 
 * Then in *this* file, apiRoutes, routes/api/index.js, I have
 * 
 * router.use('/users', userRoutes) ...
 * I don't have to use authenticateUser again because 
 *  . . 
 * 
 * At any rate, we see that it MOSTLY works, but if I'm require router then maybe not.
 * 
 * Remember in class, we did like router.get('./api', authMiddleware, userRoutesWhatever).  That is, NOT with .use, but with .get, .put, whatever.  .use is middleware, .get is sorta . . . not?  ANyways.
 * 
 * 
 * if router.use('/users', userRoutes) is really for /api/users, and it passes *through* the router that has router.use('/api', authenticateUser); then I don't need to 
 * 
 * app.use('/api', authenticateUser); // applies middleware to all routes that start with /api so long as this router gets exported to them for use.  
 * 
 * 2 27 49
 * const router = require('express').Router({mergeParams: true});
 */