import { gql } from "@apollo/client";

const cartItem = `
    cartItems{
        id
        brand{
            name
        }
        name
        thumbnail
        description
        price
        qty
    }
`

export const GET_CART_ITEMS = gql`
    query{
        user{
            ${cartItem}
        }
    }
`

export const ADD_TO_CART = gql`
    mutation($id: ID!, $qty: Int!){
        mutateCart(itemId: $id, qty: $qty){
            cartQty
        }
    }
`

export const REMOVE_FROM_CART = gql`
    mutation($id: ID!){
        mutateCart(itemId: $id, add: false){
            cartQty
        }
    }
`

export const MUTATE_CART_ITEM_QTY = gql`
    mutation($id: ID!, $qty: Int!){
        mutateCartItemQty(id: $id, qty: $qty){
            id
            qty
        }
    }
`