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
input Libroinput{
    titolo: String!
    descrizione: String!
    autore : String!
}
input Autoreinput{
    nome: String!
}

type Query {
    tutti_libri:[Libro] @cypher(
        statement:"""
        MATCH (a:Libro) - [:STATO_SCRITTO_DA] -> (b:Autore)
        return a,b
    
    """)
    autori:[Autore] @cypher(
        statement:"""
        MATCH (a:Autore) - [:HA_SCRITTO] -> (b:Libro)
        return (a),(b)
    
    """)

}
type Mutation {
    aggiungi_libro(libroinput: Libroinput) :Libro @cypher(
        statement:"""
        MERGE (a:Libro {titolo: $libroinput.titolo, descrizione: $libroinput.descrizione})
        MERGE (b:Autore {nome: $libroinput.autore})
        MERGE (a) <- [:HA_SCRITTO] - (b)
        MERGE (b) <- [:STATO_SCRITTO_DA] - (a)
        return a,b
    """)
    aggiungi_autore(autoreinput: Autoreinput) : Autore @cypher(
        statement:"""
        MERGE (b:Autore {nome: $autoreinput.nome})
        return (b)
    """)
    
}
`;
