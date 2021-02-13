export const QuestionSchema = `
    type Question {
        _id: ID
        msg: String
        info: String
        level: String
        index: String
    }

    type Response {
        msg: String!
    }

    input QuestionInput {
        msg: String
        info: String
        level: String
        index: String
    }
`;
