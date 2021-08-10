const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
    image: String
    description: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    category: Category
  }  

  type User {
    _id: ID
    userame: String
    email: String
    street: String
    townCity: String
    postCode: String
    firstName: String
    lastName: String
  }

  type Checkout {
    session: ID
  }
  
  type Auth {
    token: ID
    user: User
  }

  type Query {
    
    user(_id: ID!): User
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String, email: String, street: String, townCity: String, postCode: String, firstName: String, lastName:String): User
    login(email: String!, password: String!): Auth
    updateProduct(_id: ID!): Product
  }
`;

module.exports = typeDefs;
