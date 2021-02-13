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

const createOrderQuery = {
    query : `
    mutation{
        createOrder(orderInput: {
          orderItems: {
            name: "Airpods Wireless Bluetooth Headphones",
            qty: 2,
            image: "111",
            price: 100,
            product: "600e9bf7ab74de2680fa32dd",
          },
          shippingAddress: {
            address: "111",
            city: "111",
            postalCode:"111",
            country:"ind",
          },
          paymentMethod: "cash",
          paymentResult: {
            id: "1000000",
            status: "qq",
            update_time: "1-1-1",
            email_address: "www",
          },
          taxPrice: 11,
          shippingPrice: 10,
          totalPrice: 11,
          isPaid: true,
          paidAt: "11-11-1",
          isDelivered: false,
          deliveredAt: "11-1",
        }) {
          shippingPrice
        }
      }
    `
}

const getOrderQuery = {
    query: `
        {
            orderById(
                orderId: "6017fd1dc588e444842c2626") { 
                    totalPrice
                }
        }
    `
}

const updateOrderToPaidQuery = {
    query: `
        mutation{
            updateOrderToPaid(orderId: "600fbbee409090058ccc6509", paymentResult: {
                id: "600e9bf7ab74de2680fa32da",
                status: "done",
                update_time: "1-1-1",
                email_address: "a@a.com"
            }) {
                isPaid
            }
        }
    `
}

const updateOrderToDeliveredQuery = {
    query: `
        mutation{
            updateOrderToDelivered(orderId: "600fbbee409090058ccc6509") {
                isDelivered
            }
        }
    `
}

const getAllOrdersQuery = {
    query: ` 
        {
            orders{
                totalPrice
            }
        }
        
    `
}

const getMyOrdersQuery = {
    query: `
        {
            myorders(userId: "600e9bf7ab74de2680fa32dc") {
                totalPrice
            }
        }
    `
}

export {
    authUserQuery,
    createOrderQuery,
    getOrderQuery,
    updateOrderToDeliveredQuery,
    updateOrderToPaidQuery,
    getMyOrdersQuery,
    getAllOrdersQuery
}