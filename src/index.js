const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');

const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');

const auth = require('./middleware/authentification');
const functions = require('./utils/functions');

dotenv.config();

functions.connectToDatabase();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const tracing = true, debug = true;

async function startApolloServer() {
  const configurations = {
    // Note: You may need sudo to run on port 443
    production: { ssl: true, port: 443, hostname: 'trade-of-kings.com' },
    development: { ssl: false, port: 4000, hostname: 'localhost' },
  };

  const environment = process.env.APP_ENV || 'development';
  const config = configurations[environment];

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: auth,
    introspection: true,
    tracing, // only true for local development
    playground: true,
    debug,
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  // Create the HTTPS or HTTP server, per configuration
  let httpServer;
  if (config.ssl) {
    // Assumes certificates are in a .ssl folder off of the package root.
    // Make sure these files are secured.
    httpServer = https.createServer(
      {
        key: fs.readFileSync(`/etc/letsencrypt/live/api.trade-of-kings.com/privkey.pem`),
        cert: fs.readFileSync(`/etc/letsencrypt/live/api.trade-of-kings.com/fullchain.pem`),
      },
      app,
    );
  } else {
    httpServer = http.createServer(app);
  }

  console.log('server ready');
  // await new Promise((resolve) => server.listen({ port: config.port }, resolve));
  // console.log(
  //   '🚀 Server ready at',
  //   `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${
  //     server.graphqlPath
  //   }`,
  // );
  // return { server, app };
}

startApolloServer();

// const typeDefs = require('./graphql/typeDefs');
// const resolvers = require('./graphql/resolvers');

// const tracing = true,
//   debug = true;

// const apolloServer = new ApolloServer({
//   cors: true,
//   typeDefs,
//   resolvers,
//   context: auth,
//   introspection: true,
//   tracing, // only true for local development
//   playground: false,
//   debug,
// });

// apolloServer.listen({ port }).then(({ url, server }) => {
//   /*server.keepAliveTimeout = 65000;
//   server.headersTimeout = 66000;*/
//   console.log(`🚀 Server ready at ${url}`);
// });

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
