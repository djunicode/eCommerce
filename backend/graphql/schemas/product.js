export const ProductSchema = `
    type Product {
        _id: ID!
        name: String!
        discount: Float!
        price: Float!
        options: [options!]
        user: User!
        image: String!
        brand: Brand!
        category: Category!
        subcategory: SubCategory!
        new: Boolean!
        countInStock: Int!
        avgRating: Float!
        numReviews: Int!
        reviews: [productReview!]
        questions: [productQ]
        description: String!
    }

    type options {
        name: String!
        discount: Float!
        price: Float!
        countInStock: Int!
    }
    
    type productReview {
        name: String!
        rating: Int!
        comment: String!
        user: ID!
    }

    type productQ {
        question: String
        answer: String
    }

    type Content {
        product: Product
        isOptionSelected: Boolean
        optionName: String
        price: Float
        quantity: Int
    }

    type Cart {
        _id: ID!
        user: User!
        contents: [Content]
    }

    input ProductInput {
        name: String!
        discount: Float
        price: Float!
        options: [optionsInput!]
        image: String!
        brand: ID!
        category: ID!
        subcategory: ID!
        new: Boolean!
        countInStock: Int!
        numReviews: Int
        description: String!
    }

    input updateProduct {
        name: String
        discount: Float
        price: Float
        options: [optionsInput!]
        image: String
        brand: ID
        category: ID
        subcategory: ID
        countInStock: Int
        description: String
    }

    input optionsInput {
        name: String!
        discount: Float!
        price: Float!
        countInStock: Int!
    }
    
    input ProductReview {
        name: String!
        rating: Int!
        comment: String!
    }

    input ProductQ {
        question: String
        answer: String
    }

    input ContentInput {
        product: ID!
        isOptionSelected: Boolean!
        optionName: String!
        price: Float!
        quantity: Int!
    }
`;
