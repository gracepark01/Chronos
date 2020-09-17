const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const cmd = require('chronos-tracker');
require('./chronos-config'); // Bring in config file

cmd.propagate();

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
    numberOfPages: 1000,
    publisher: 'Some Publisher',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    numberOfPages: 200,
    publisher: 'Bob Poop Co.',
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String, numberOfPages: Int, publisher: String }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

app.use('/', cmd.track());

// The GraphQL endpoint
app.use('/books/getbooks', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(4545, () => {
  console.log('Go to http://localhost:4545/graphiql to run queries!');
});

// UNCOMMENT THE LINES BELOW
// const cmd = require('chronos-microservice-debugger3');
// cmd.propagate();

// const PORT = 4545;
// const express = require('express');
// const path = require('path');
// const cors = require('cors');
// const app = express();
// const bodyParser = require('body-parser');
// const controller = require('./BookController.js');

// // UNCOMMENT THE LINE BELOW AND PASS IN YOUR CHOSEN ARGUMENTS
// // app.use('/', cmd.microCom('microserviceName', 'databaseType', 'databaseURL', 'wantMicroHealth', 'queryFrequency'))

// app.use(bodyParser.json());
// app.use(cors());

// //  This route will create a new book
// app.post('/books/createbook', controller.createBook, (req, res) => {
//   res.status(200).json(res.locals.createBook);
// });

// // This route will get all the books
// app.get('/books/getbooks', controller.getBooks, (req, res) => {
//   res.status(200).json(res.locals.getBooks);
// });

// // This route will delete a book
// app.delete('/books/deletebook:id?', controller.deleteBook, (req, res) => {
//   res.status(200).json(res.locals.deleteBook);
// });

// // This route will get all the orders from the orders database
// app.get('/books/getordersinfo', controller.getorderinfo, (req, res) => {
//   res.status(200).json(res.locals.getorderinfo);
// });

// //  This is the global error handler
// function errorHandler(error, req, res, next) {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 400,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign(defaultErr, error);
//   console.log(`Here is the error object's response: ${errorObj.log}`);
//   res.status(errorObj.status).json(errorObj.message);
// }

// // Open and listen to server on specified port
// app.listen(PORT, () => {
//   console.log(`Book server running on port ${PORT} ...`);
// });
