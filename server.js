const express = require('express');
const app = express();
// const userRoutes = require('./routes/userRoutes');

const connectMongooseToMongoDB = require('./config/connection');

const PORT = process.env.PORT || 3000;

// for reference
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// may have something to do with conversion of url input to object
//app.use(express.urlencoded({ extended: true }));

app.use(express.json()); // 'Parsing' of JSON in body and sometimes header into Javascript objects, attached to req.body.
// app.use('/api/users', userRoutes);

const startServer = async () => {
  await connectMongooseToMongoDB();
}

startServer();

// creates a listener that listens on the specified port, using Node's http module to create a HTTP server.
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));