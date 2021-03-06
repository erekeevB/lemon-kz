import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { HeartIcon, HeartIconFilled, MinusIcon, PlusIcon } from '../../assets/Icons';
import { ADD_TO_CART, GET_CART_ITEMS } from '../../GRAPHQL/cart';
import { GET_FAV_ITEMS, GET_SINGLE_ITEM, TOGGLE_FAV } from '../../GRAPHQL/items';
import SignInWarning from '../SignInWarning/SignInWarning';
import s from './ItemPage.module.css'

const ItemPage = ({ id, isAuth }) => {

    const [quantity, setQuantity] = useState(1)

    const {data, loading, refetch} = useQuery(GET_SINGLE_ITEM, {
        variables: {id: id},
        onCompleted: data=>{
            debugger
            if(data.singleItem.qty>1){
                setQuantity(data.singleItem.qty)
            }
        },
        onError: err=>{
            debugger
            console.log(err.message)
        }
    })

    const [toggleFavourite] = useMutation(TOGGLE_FAV, {
        variables: {id},
        onCompleted: data=>{
            if(data?.toggleFav.success){
                refetch()
            }
        },
        refetchQueries: [{query: GET_FAV_ITEMS}]
    })

    const [addToCart, {loading: buttonIsFetching}] = useMutation(ADD_TO_CART, {
        refetchQueries: [{query: GET_CART_ITEMS}],
        awaitRefetchQueries: true,
        update(cache, {data}){
            if(!data?.mutateCart.error){
                let data = cache.readQuery({query: GET_SINGLE_ITEM, variables: {id: id}})
                if(data && data.singleItem){
                    cache.writeQuery({
                        query: GET_SINGLE_ITEM, 
                        variables: {id: id}, 
                        data: {
                            ...data,
                            singleItem: {
                                ...data.singleItem,
                                qty: quantity
                            }
                        }})
                }
            }
        }
    })

    const [isLikeClickedAndNotAuth, setIsLikeClickedAndNotAuth] = useState(false)

    const [text, setText] = useState('')

    useEffect(()=>{
        refetch()
    }, [isAuth])

    const handleFavouriteButton = () => {
        if (isAuth) {
            toggleFavourite()
        } else {
            setText('Add Items to Favourite!')
            setIsLikeClickedAndNotAuth(true)
        }
    }

    const handleAddCartItem = (id, qty) => {
        if (isAuth) {
            addToCart({variables: {id, qty}})
        } else {
            setText('Add Items to Cart!')
            setIsLikeClickedAndNotAuth(true)
        }
    }

    return (
        <>
            {loading ? <div>Loading...</div> :
                <>
                    <SignInWarning
                        state={isLikeClickedAndNotAuth}
                        setState={setIsLikeClickedAndNotAuth}
                        text={text}
                    />
                    <div className={s.item__wrapper}>
                        <div className={s.item__category}>
                            <Link to={'/items'}>Items</Link> / 
                            <Link to={'/items?category=' + data.singleItem.category.name}>
                                {data.singleItem.category.name}
                            </Link> / {id}
                        </div>
                        <div className={s.item__header}>
                            <h2 className={s.item__title}>{data.singleItem.brand.name} {data.singleItem.name}</h2>
                        </div>
                        <div className={s.item}>
                            <div>
                                <div className={s.item__image}>
                                    {data.singleItem.thumbnail ?
                                    <img 
                                        src={data.singleItem.thumbnail} 
                                        alt={data.singleItem.brand.name+' '+data.singleItem.name}/>
                                    :
                                    <div>No photo available</div>
                                    }
                                </div>
                            </div>
                            <div className={s.item__right}>
                                <div className={s.item__price__wrapper}>
                                    <div className={s.item__price}>${data.singleItem.price.toFixed(2)}</div>
                                    <div className={s.item__overall__price__wrapper}>
                                        Overall Price:
                                        <div className={s.item__overall__price}>
                                            ${(data.singleItem.price * quantity).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                                <div className={s.item__quantity__wrapper}>
                                    Quantity
                                    <div className={s.item__quantity}>
                                        <button onClick={() => setQuantity(count => {
                                            if (count > 1) {
                                                return count - 1
                                            } else {
                                                return count
                                            }
                                        })}><MinusIcon /></button>
                                        <div>{quantity}</div>
                                        <button onClick={() => setQuantity(count => {
                                            if (count >= 10) {
                                                return count
                                            } else {
                                                return count + 1
                                            }
                                        })}><PlusIcon /></button>
                                    </div>
                                </div>
                                <div className={s.item__buttons}>
                                {data.singleItem.qty>0 ? 
                                    <button 
                                        className={s.item__card + ' ' + s.item__card_disabled} 
                                        disabled
                                    >
                                        Item Already in Cart
                                    </button>:
                                    <button 
                                        className={s.item__card} 
                                        onClick={()=>{handleAddCartItem(data.singleItem.id, quantity)}}
                                    >
                                        Add To Card
                                    </button>    }
                                    
                                    <button onClick={() => handleFavouriteButton()} className={s.item__favourite}>
                                        {!data.singleItem.isFavourite || !isAuth ?
                                            <><HeartIcon />Add To Favourite</> :
                                            <><HeartIconFilled />Remove From Favourites</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={s.item__desc}>
                            <p>Description</p>
                            {data.singleItem.description}
                        </div>
                        <div className={s.item__desc}>
                            <p>Reviews</p>
                            {data.singleItem.reviewSet.length? 
                                <div>
                                    {data.singleItem.reviewSet.map((el)=>{
                                        return(
                                            <div>
                                                <p>{el.author.username}</p>
                                                <div>{el.star} Stars</div>
                                                <div>{el.text}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            :
                                <div>No Reviews</div>
                            }
                        </div>
                        {data.singleItem.review}
                    </div>
                </>
            }
        </>
    )

}

let mStP = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mStP, {})(ItemPage)