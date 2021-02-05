import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { HeartIcon, HeartIconFilled, MinusIcon, PlusIcon } from '../../assets/Icons';
import { toggleFavouriteThunk } from '../../redux/authReducer';
import { addCardItemThunk } from '../../redux/cartReducer';
import { getSetItemThunk } from '../../redux/itemReducer';
import SignInWarning from '../SignInWarning/SignInWarning';
import s from './ItemPage.module.css'

const ItemPage = ({ 
    id, item, isFetching, favourites, isAuth, cart,
    getSetItemThunk, toggleFavouriteThunk, addCardItemThunk }) => {

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

    useLayoutEffect(() => {
        getSetItemThunk(id)
        setQuantity(1)
    }, [id])

    return (
        <>
            {isFetching ? <div>Loading...</div> :
                <>
                    <SignInWarning
                        state={isLikeClickedAndNotAuth}
                        setState={setIsLikeClickedAndNotAuth}
                        text={'Add Items to Favourite!'}
                    />
                    <div className={s.item__wrapper}>
                        <div className={s.item__category}>
                            <Link to={'/category/' + item.category}>{item.category}</Link> / {id}
                        </div>

                        <div className={s.item}>
                            <div>
                                <h2 className={s.item__title}>{item.title}</h2>
                                <div className={s.item__image}>
                                    <img src={item.image} />
                                </div>
                            </div>
                            <div className={s.item__right}>
                                <div className={s.item__price__wrapper}>
                                    <div className={s.item__price}>${item.price.toFixed(2)}</div>
                                    <div className={s.item__overall__price__wrapper}>
                                        Overall Price:
                                        <div className={s.item__overall__price}>
                                            ${(item.price * quantity).toFixed(2)}
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
                                {cart.some(el=>el.id===item.id) ? 
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
                                        {!favourites.some((el) => el.id === item.id) || !isAuth ?
                                            <><HeartIcon />Add To Favourite</> :
                                            <><HeartIconFilled />Remove From Favourites</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={s.item__desc}>
                            <p>Description</p>
                            {item.description}
                        </div>
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