const chronos = require('chronos-tracker');
process.env.MONGO_URI =
  'mongodb+srv://gpk:gpk@cluster0.vej9l.mongodb.net/dummy?retryWrites=true&w=majority';

chronos.use({
  microservice: 'books',
  interval: 2000,
  // dockerized: true,
  database: {
    type: 'MongoDB',
    URI: process.env.MONGO_URI,
    // URI: "mongodb+srv://chronos:chronos@cluster0.tpeie.mongodb.net/chronos?retryWrites=true&w=majority"
  },
  notifications: [],
});
