const {Neo4jGraphQL} = require ('@neo4j/graphql');
const{ApolloServer, gql} = require('apollo-server');
const neo4j = require ('neo4j-driver');
const typeDefs = require('./schema/typedefs')
const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", "password")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });
const server = new ApolloServer({
    schema: neoSchema.schema,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});