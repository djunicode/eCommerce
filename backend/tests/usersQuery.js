const registerUserQuery = {
    query : `
        mutation { 
            registerUser(userInput: {
                name: "tanay1",
                email: "tall1q",
                phoneNo: 911877,
                password: "1111",
                isAdmin: false
            }) {
            name
            }
        }
    `
}

const authUserQuery = {
    query: `
        {
            authUser(email : "admin@example.com", password : "123456") {
                name,
                token
            }
        }   
    `
}

const getUserProfileQuery = {
    query: `
        {
            getUserProfile{
                name
            }
        }
    `
}

const getUsersQuery = {
    query: `
        {
            getUsers {
                name
            }
        }
    `
}

const getUserByIdQuery = {
    query: `
        {
            getUserById(userId: "60180e83e8c7272ca09fa574") {
                name
            }
        }
    `
}

const deleteUserQuery = {
    query: `
        mutation {
            deleteUser(userId: "60181cadfbea5b464c690e43"){
                msg
            }
        }
    `
}

const updateUserProfileQuery = {
    query: `
        mutation{
                updateUserProfile(userInput: {
                name: "qwerty",
                phoneNo: 911877
            }) {
                name
            }
        }
    `
}

const updateUserQuery = {
    query: `
        mutation {
            updateUser(
                userId: "60180e83e8c7272ca09fa574",
                userInput: {
                    name: "qwerty",
                    phoneNo: 911877
                }
            ) {
                name
            }
        }
    `
}

export {
    registerUserQuery,
    authUserQuery,
    getUserProfileQuery,
    getUsersQuery,
    getUserByIdQuery,
    deleteUserQuery,
    updateUserProfileQuery,
    updateUserQuery
}