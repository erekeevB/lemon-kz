import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { HeartIcon, HeartIconFilled, MinusIcon, PlusIcon } from '../../assets/Icons';
import { GET_SINGLE_ITEM } from '../../GRAPHQL/items';
import { toggleFavouriteThunk } from '../../redux/authReducer';
import { addCardItemThunk } from '../../redux/cartReducer';
import { getSetItemThunk } from '../../redux/itemReducer';
import SignInWarning from '../SignInWarning/SignInWarning';
import s from './ItemPage.module.css'

const ItemPage = ({ 
    id, item, isAuth, toggleFavouriteThunk, addCardItemThunk }) => {

    let {data, loading} = useQuery(GET_SINGLE_ITEM, {
        variables: {id: id},
        onCompleted: data => {
            debugger
            console.log(data)
        },
        onError: err => {
            debugger
            console.log(err.message)
        }
    })

    const [isLikeClickedAndNotAuth, setIsLikeClickedAndNotAuth] = useState(false)

    const [quantity, setQuantity] = useState(1)

    const handleFavouriteButton = (el) => {
        if (isAuth) {
            toggleFavouriteThunk(el)
        } else {
            setIsLikeClickedAndNotAuth(true)
        }
    }

    const handleAddCartItem = () => {

        addCardItemThunk(item, quantity)

    }

    return (
        <>
            {loading ? <div>Loading...</div> :
                <>
                    <SignInWarning
                        state={isLikeClickedAndNotAuth}
                        setState={setIsLikeClickedAndNotAuth}
                        text={'Add Items to Favourite!'}
                    />
                    <div className={s.item__wrapper}>
                        <div className={s.item__category}>
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
                                        onClick={handleAddCartItem}
                                    >
                                        Add To Card
                                    </button>    }
                                    
                                    <button onClick={() => handleFavouriteButton(item)} className={s.item__favourite}>
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
                        {data.singleItem.review}
                    </div>
                </>
            }
        </>
    )

}

let mStP = (state) => ({
    isFetching: state.item.isFetching,
    item: state.item.item,
    favourites: state.auth.favourites,
    isAuth: state.auth.isAuth,
    cart: state.cart.cart
})



export default connect(mStP, { getSetItemThunk, toggleFavouriteThunk, addCardItemThunk })(ItemPage)