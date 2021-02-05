import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation($username: String!, $password: String!){
        tokenAuth(username: $username, password:$password){
            token
            user{
                id
                email
                isStaff
                username
                firstName
                lastName
            }
        }
    }
`

export const REGISTER = gql`
    mutation($username: String!, $password1: String!, $password2: String!,$email:String!){
        register(email: $email, username: $username, password1: $password1, password2:$password2){
            message
            errors
        }
    }
`

export const GET_ME = gql`
    query{
        user{
                id
                email
                isStaff
                username
                firstName
                lastName
            }
    }
`