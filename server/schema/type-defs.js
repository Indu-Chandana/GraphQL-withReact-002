const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        natianality: Nationality!
        friends: [User]
        favoriteMovies: [Movie]
    }

    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!
    }

    type Query {
        # users: [User!]!
        users: UserResult # we add union to this Now get data or error message.
        user(id: ID!) : User!
        movies: [Movie!]!
        movie(name: String!): Movie!
    }

    input CreateUserInput {
        name: String!
        username: String!
        age: Int = 18 
        natianality: Nationality = BRAZIL
    }
    
    # when we update we want to get the Id
    input UpdateUsernameInput {
        id: ID!
        newUsername: String!
    }

    type Mutation {
        createUser(input: CreateUserInput!): User
        updateUsername(input: UpdateUsernameInput!) : User 
        deleteUser(id: ID!): User 
    }

    enum Nationality {
        CANADA
        BRAZIL
        INDIA
        GERMANY
        CHILE
    }

    type UsersSuccessfullResult {
        users: [User!]!
    }

    type UsersErrorResult {
        message: String!
    }

    union UserResult = UsersSuccessfullResult | UsersErrorResult

`;

module.exports = { typeDefs };