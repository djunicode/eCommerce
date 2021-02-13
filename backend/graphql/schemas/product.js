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
        numReviews: Int,
        description: String!
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
`;
