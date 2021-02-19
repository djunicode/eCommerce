export const ProductSchema = `
    type Product {
        _id: ID!
        name: String!,
        discount: Float!,
        price: Float!,
        discountedPrice: Float!,
        user: User!,
        image: String!,
        brand: Brand!,
        category: Category!,
        subcategory: SubCategory!,
        new: Boolean!,
        countInStock: Int!,
        numReviews: Int!,
        reviews: [productReview!],
        description: String!
    }

    
    type productReview {
        name: String!,
        rating: Int!,
        comment: String!,
        user: ID!,
    }

    input ProductInput {
        name: String!,
        discount: Float!,
        price: Float!,
        user: ID!,
        image: String!,
        brand: String!,
        category: ID!,
        subcategory: ID!,
        new: Boolean!,
        countInStock: Int!,
        numReviews: Int,
        description: String!
    }

    input updateProduct {
        name: String,
        price: Float,
        image: String,
        brand: String,
        category: ID,
        subcategory: ID,
        countInStock: Int,
        description: String,
    }

    input ProductReview {
        name: String!,
        rating: Int!,
        comment: String!,
        user: ID!,
    }
`;
