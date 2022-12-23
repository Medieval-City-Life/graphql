const defaultPagination = '{ perPage: 50, page: 1 }';

const typeDefs = `
  scalar Date

  input Pagination {
    page: Int
    perPage: Int
  }
  
  input Filter {
    q: String
  }
  
  input Sorting {
    field: String!
    order: String!
  }

  type SuccessErrorResponse {
    success: Boolean
    code: Int
    msg: String
  }

  type Skills {
    logging: Int
    farming: Int
  }

  type itemDef {
    name: String
    category: String
    img: String
  }

  type PlayerInventory {
    itemDef: itemDef
    amount: Int
  }
  
  type User {
    _id: ID!
    name: String!
    email: String!
    activationKey: String
    password: String
    newsletterActivated: Boolean
    isBanned: Boolean
    isActivated: Boolean
    languages: [String]
    wrongLoginCount: Int
    skills: Skills
    community: ID
    deleted: Boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }

  type Community {
    name: String
    crest: String
    owner: User
    level: Int
    memberCount: Int
    createdAt: Date
  }

  type Product {
    itemDef: itemDef
    rate: Int
    last_collected: Date
  }

  type Building {
    name: String
    type: String
    level: Int
    owner: User
    products: [Product]
  }
  
  type Query {
    users(sorting: Sorting, pagination: Pagination = ${defaultPagination}, filter: Filter): [User]
    myUser: User
    getInventory: [PlayerInventory]
    getMyCommunity: Community
    getBuildings: [Building]
  }
  
  type Mutation {
    createUser(name: String!, email: String!, password: String!): SuccessErrorResponse
    loginUser(name: String!, password: String!, platform: String!): SuccessErrorResponse
    createCommunity(name: String!, crest: String!): SuccessErrorResponse
  }
`;

module.exports = typeDefs;
