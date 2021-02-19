import { buildSchema } from 'graphql';
import { UserSchema } from './user.js';
import { CategorySchema } from './category.js';
import { ProductSchema } from './product.js';
import { OrderSchema } from './order.js';
import { QuestionSchema } from './question.js';
import { ProductFilterSchema } from './productFilter.js';

export default buildSchema(`
    ${UserSchema}

    ${CategorySchema}

    ${ProductSchema}

    ${OrderSchema}

    ${QuestionSchema}

    ${ProductFilterSchema}

    type rootQuery {
        orders: [Order!]!
        myorders: [Order!]!
        orderById(orderId: ID!): Order!
        questions: [Question]
        question(level: String!, index: String!): Question

        getCategories: [Category!]!
        
        getSubCategories(categoryId: ID!): [SubCategory!]!
        
        authUser(email: String!, password: String!): User!
        getUserProfile: User!
        getUsers: [User!]!
        getUserById(userId: ID!): User!
        
        getProductByCategory(categoryId: ID!): [Product!]!
        getProductBySubCategory(subCategoryId: ID!): [Product!]!
        getProductById(id: ID!): [Product!]!
        getNewProducts: [Product!]!
        deleteProduct(id: ID!): Product!
        getProductReviews(productId: ID!): [productReview]!

        isDeliverable(shippingAddressInput: ShippingAddressInput): Boolean!,
        
        searchProduct(searchTerm: String!): [Product!]!
        filterProducts(filters: FilterInput): [Product!]!
    }
    type rootMutation {
        createOrder(orderInput: OrderInput): Order!
        updateOrderToPaid(orderId: ID!, paymentResult: PaymentResultInput!): Order!
        updateOrderToDelivered(orderId: ID!): Order!

        editQuestions(details: [QuestionInput]!): Response!

        createCategory(name: String!): Category!
        updateCategory(name: String!, newName: String!): Response!
        deleteCategory(name: String!): Response!

        createSubCategory(name: String!, category: ID!): SubCategory!
        updateSubCategory(subCategoryId: ID!, name: String): Response!
        deleteSubCategory(subCategoryId: ID!): Response!

        registerUser(userInput: UserInput!): User!
        updateUserProfile(userInput: UpdateUserInput!): User!
        updateUser(userId: ID!, userInput: UpdateUserInput!): User!
        deleteUser(userId: ID!): Response!

        createProduct(productInput: ProductInput):  Product!
        updateProduct(productId: ID!, updateProduct: updateProduct): Product!
        createProductReview(productId: ID!, productReview: ProductReview!): Product!
    }
    schema {
        query: rootQuery
        mutation: rootMutation
    }
`);
