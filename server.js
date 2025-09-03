require ('dotenv').config(); // initialize immediately at start.  Note if .env does not 'catch', may need to call this in other files.  
const connectMongooseToMongoDB = require('./config/database');
//require ('./config/database');
// require ('./config/jwtStrategy');
// require ('./config/githubStrategy');

const express = require('express');
const passport = require('passport');
// const authRouter = require ('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
const routes = require('./routes/index.js');

// remember http://localhost:3000/api/auth/github/callback is api/user here.

const app = express();
const PORT = process.env.PORT || 3001;

// similarly to require dotenv, use app.use(express.json) immediately.
app.use(express.json()); // 'Parsing' of JSON in body and sometimes header into Javascript objects, attached to req.body.  Though this is done after passport is done in example.

// for reference
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// may have something to do with conversion of url input to object
//app.use(express.urlencoded({ extended: true }));

/**
 * Github Oauth
 */

const session = require('express-session');
app.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUnitialized: false
  })
);
app.use(passport.session());

app.use(passport.initialize()); // initializing passport as middleware

// Change the structure to be similar to Lab 2.
//app.use('/api/users', userRoutes);
app.use(routes);

const startServer = async () => {
  await connectMongooseToMongoDB();
}

startServer();

//////////////////
// GitHub OAuth //
//////////////////
// const session = require('express-session');
// app.use(
//   session({
//     secret: process.env.GITHUB_CLIENT_SECRET,
//     resave: false,
//     saveUninitialized: false
//   })
// );
// app.use(passport.session());

// app.use(passport.initialize()); // initializing passport as middleware


// creates a listener that listens on the specified port, using Node's http module to create a HTTP server.
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// api/users/register creation and duplicate tests OK.  Multiple entries OK.
// have not tested JWT token on user creation.
// api/users/login wrong password test OK.  Wrong email test OK.  Note where email and password correct but username is wrong, that a token is still generated.  Look into whether JWT uses the POST data, or the database data (that is, 'Burmya' or 'Burmy').  Possibly look at logout function (revocation of JWT token) and localStorage.
