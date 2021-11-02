const {gql} = require('apollo-server');
module.exports= gql`
    type Movie {
        title: String
        actors: [Actor] @relationship(type: "ACTED_IN", direction: IN)

    }
    
    type Actor {
        name: String
        movies: [Movie] @relationship(type: "ACTED_IN", direction: OUT)
    }

`;