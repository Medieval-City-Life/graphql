const { ApolloServer } = require('apollo-server');
const dotenv = require('dotenv');

const auth = require('./middleware/authentification');
const functions = require('./utils/functions');

dotenv.config();

functions.connectToDatabase();

const port = process.env.APP_PORT;

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const tracing = true,
  debug = true;

const apolloServer = new ApolloServer({
  cors: false,
  typeDefs,
  resolvers,
  context: auth,
  introspection: true,
  tracing, // only true for local development
  playground: false,
  debug,
});

apolloServer.listen({ port }).then(({ url, server }) => {
  /*server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;*/
  console.log(`🚀 Server ready at ${url}`);
});

// const Item = require('./models/ItemDef')

// const createItems = async () => {
//   console.log('test');
//     const res = await Item.create(
//       {
//         name: 'water',
//         category: 'food'
//       },
//       {
//         name: 'apple',
//         category: 'food'
//       },
//       {
//         name: 'wood',
//         category: 'foresting'
//       }
//     )  

//     console.log(res);
// }

// createItems();