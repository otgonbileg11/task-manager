// const {MongoClient} = require('mongodb')
const mongoose = require('mongoose')

const uri = 'mongodb://localhost:27017/task-manager'

const connectToDb = (cb) => {
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to database");
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  };
  
  const getDb = () => mongoose.connection;
  
  module.exports = {
    connectToDb,
    getDb,
  };

// module.exports = {
//     connectToDb: (cb) => {
//         MongoClient.connect(uri)
//             .then((client) => {
//                 dbConnection = client.db()
//                 return cb()
//             })
//             .catch(err => {
//                 console.log(err)
//                 return cb(err)
//             })
//     },
//     getDb: () => dbConnection
// }