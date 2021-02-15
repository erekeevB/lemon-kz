import { gql } from "@apollo/client";

export const GET_ITEMS_ADMIN = gql`
    query($category: [String], $brand: [String], $sex: String, $page: Int, $size: Int, $minPrice: Float, $maxPrice: Float){
        itemList(category: $category, brand: $brand, sex: $sex, page: $page, size: $size, minPrice: $minPrice, maxPrice: $maxPrice){
            items{
                id
                name
                description
                price
                category{
                    id
                    name
                }
                brand{
                    id
                    name
                }
                sex{
                    id
                    name
                }
                thumbnail
            }
            hasNext
        }
    }
`