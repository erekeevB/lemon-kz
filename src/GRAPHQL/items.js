import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
    query($category: [String], $brand: [String], $sex: String, $page: Int, $size: Int, $minPrice: Float, $maxPrice: Float){
        itemList(category: $category, brand: $brand, sex: $sex, page: $page, size: $size, minPrice: $minPrice, maxPrice: $maxPrice){
            items{
                id
                name
                price
                brand{
                    name
                }
                thumbnail
                isFavourite
            }
            hasNext
        }
    }
`

export const GET_SINGLE_ITEM = gql`
    query($id: ID!){
        singleItem(id: $id){
            id
            name
            description
            price
            category{
                name
            }
            brand{
                name
            }
            sex{
                name
            }
            itemimgSet{
                img
                isThumbnail
            }
            reviewSet{
                author{
                    username
                }
                star
                text
            }
            isFavourite
            qty
            thumbnail
        }
    }
`