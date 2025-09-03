## Reflection

## Folder / File / Organization

mongoose.set('runValidators', true); in connection.js

## Notes

### Redundant Checks

There may be some redundancy in code to comply with best practices.  For example, User schema requires a unique username, but it's possible duplicate entries may enter the database through direct database manipulation.  So an additional check may be made to check for duplicates when retrieving data.

### runValidators Placement

Apparently when a record is initially created through Mongoose, the data is checked against the corresponding Mongoose schema.  However, when a record is altered, as with User.findByIdAndUpdate(req.params.id, req.body, {new: true}), apaprently the Mongoose schema is not checked.

Mongoose's runValidators, as I understand it, is intended to cause even alterations of data to be matched against corresponding Mongoose schema.

I placed mongoose.set('runValidators', true) in config/database.js.  I've seen it placed in a User schema, but as it is general to mongoose, and I think validators ought always be used, I placed it where the database is first set up.  Apparently database.js is standard programming practice for the filename containing the connection from server's Mongoose to database's MongoDB, perhaps because options such as runValidators are placed there as well.  Cannot confirm as documentation is spotty.

Alternately, could use as argument, e.g. User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}).  However, that requires options for each function, and I see no reason to do that when validation should be run for everything anyways.

Possibly validators might be turned off if running a resource-intensive operation on a lot of data where the data is guaranteed to conform to the correpsonding schema(s) - in such cases, validators would be unneeded overhead. 

## Resources
https://42crunch.com/7-ways-to-avoid-jwt-pitfalls/ - note:  go back and implement fully.
https://www.passportjs.org/docs/
https://www.passportjs.org/packages/passport-jwt/
https://www.passportjs.org/packages/passport-github2/

### Deprecated Code in Lab 2

Comment for later reference:

```
// config/connection.js
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;

// server.js
const db = require('./config/connection');
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
```

useNewUrlParser and useUnifiedTopology were used in Mongoose 5.x; marked for deprecation in version 6, Mongoose currently version 8.x.

https://mongoosejs.com/docs/5.x/docs/deprecations.html#:~:text=The%20useNewUrlParser%20Option&text=DeprecationWarning%3A%20current%20URL%20string%20parser,useNewUrlParser%3A%20true%20%7D%20to%20MongoClient.

I did not use db.once, as I use separate console.logs for listener and MongoDB connection.