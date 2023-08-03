import {ApolloServer} from "@apollo/server"
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer"
import {expressMiddleware} from "@apollo/server/express4"

import express from "express"
import http from "http"
import cors from "cors"
import bodyParser from "body-parser"

import {typeDefs, resolvers} from "./typedefs/typedefs.js"
import helmet from "helmet"

import {mongoose} from "mongoose";
import "dotenv/config"

//Set up
const uri = process.env.MONGO_URI;
const port = process.env.PORT;

const app = express();
const httpServer = http.createServer(app);


const Main = async () => {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugin: [ApolloServerPluginDrainHttpServer({httpServer})],
})

//Start server and mongoose
Main().then(console.log("Connection complete")).catch((err) =>{console.error(err)});
await server.start();




app.use(
    '/',
    cors(),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
  
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);

  
  app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
