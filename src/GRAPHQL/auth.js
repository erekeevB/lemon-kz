import { gql } from "@apollo/client";

const user = `
    user{
        id
        email
        isStaff
        username
        firstName
        lastName
        sex
        phoneNumber
        cartQty
    }
`

export const LOGIN = gql`
    mutation($username: String!, $password: String!){
        tokenAuth(username: $username, password:$password){
            token
            ${user}
        }
    }
`

export const REGISTER = gql`
    mutation($username: String!, $password1: String!, $password2: String!,$email:String!){
        register(email: $email, username: $username, password1: $password1, password2:$password2){
            message
        }
    }
`

export const GET_ME = gql`
    query{
        ${user}
    }
`

export const UPDATE_USER = gql`
    mutation(
        $username: String, 
        $firstName: String, 
        $lastName: String, 
        $email: String, 
        $sex: String, 
        $phoneNumber: String
    ){
        updateUser(
            username: $username, 
            firstName: $firstName, 
            lastName: $lastName, 
            email: $email, 
            sex: $sex,
            phoneNumber: $phoneNumber
        ){
            ${user}
        }
    }
`