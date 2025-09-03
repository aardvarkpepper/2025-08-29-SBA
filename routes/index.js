/**
 * Reuse and Refine: Adapt the local authentication routes you built in Lab 1.
Create a POST /api/users/register endpoint.
Create a POST /api/users/login endpoint that, on success, returns a signed JWT.
You can reuse much of your utils/auth.js logic for signing tokens and for middleware.

Implement OAuth Routes: Add the GitHub OAuth routes from Lesson 4 to your user routes file.
GET /api/users/auth/github: This route will kick off the OAuth flow by redirecting the user to GitHub.
GET /api/users/auth/github/callback: This is your callback URL. It should use passport.authenticate, and upon successful authentication, it should sign a JWT for the user and return it to the client (e.g., via a redirect with a query parameter).

http://localhost:3001/api/users/auth/github/callback

Build CRUD Endpoints: Create a new router file for your Bookmark resources (/api/bookmarks). Implement full CRUD functionality (POST, GET All, GET One, PUT, DELETE).
Apply Security Middleware: This is the most critical part of the assessment.
All bookmark endpoints must be protected by authentication middleware (authMiddleware from Lesson 3). Only logged-in users should be able to interact with them.
The endpoints must also be protected by authorization logic. Users should only be able to view, update, or delete their own bookmarks. This will require you to adapt the ownership-checking logic from Lab 2.
 */

const router = require('express').Router();
const apiRoutes = require('./api/index');
 
//router.use('/api', authenticationMiddleware, apiRoutes);
router.use('/api', apiRoutes);
 
router.use((req, res) => {
  res.status(404).send('<h1>404 Error</h1> <div>Please visit http://localhost:3001/api</div>');
});
// Triggers on anything not starting with /api, I suppose.
 
module.exports = router;