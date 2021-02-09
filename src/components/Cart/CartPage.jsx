import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { CloseIcon } from '../../assets/Icons';
import { GET_CART_ITEMS, REMOVE_FROM_CART } from '../../GRAPHQL/cart';
import { setQty } from '../../redux/authReducer';
import s from './CartPage.module.css'

const CartPage = ({ isAuth, setQty }) => {

    const {refetch} = useQuery(GET_CART_ITEMS, {
        onCompleted: data => {
            debugger
            setCart(() => {
                if (!data?.user.cartItems) {
                    return null
                }
                return data.user.cartItems.map(el => {
                    return {
                        ...el,
                        brand: { ...el.brand }
                    }
                })
            })
            setLoading(false)
        },
        onError: err => {
            debugger
            console.log(err.message)
        }
    })

    const [removeCartItem, { loading: isFetchingRemove }] = useMutation(REMOVE_FROM_CART, {
        onCompleted: data => {
            debugger
            setCart(() => {
                if (!data?.mutateCart.cartItems) {
                    return null
                }
                return data.mutateCart.cartItems.map(el => {
                    return {
                        ...el,
                        brand: { ...el.brand }
                    }
                })
            })
            setQty(data.mutateCart.cartQty)
            refetch()
        }
    })

    let [loading, setLoading] = useState(true)

    let [cart, setCart] = useState(null)

    let history = useHistory()

    useEffect(() => {
        if (!isAuth) {
            history.goBack()
        }
    }, [isAuth])

    return (
    <>
    <div className={s.cartPage}>
        <div className={s.cartPage__header}>
            <h2>My Cart</h2>
        </div>
        {!loading ?
        <>
            {cart?.length ?
            <><div className={s.carts}>
                {cart.map(el => {
                    return (
                        <div key={el.id} className={s.cart}>
                            <Link to={'/item/' + el.id}>
                                <div className={s.cart__image}><img src={el.thumbnail} alt='' /></div>
                            </Link>
                            <div className={s.cart_info}>
                                <Link className={s.cart__title} to={'/item/' + el.id}>
                                    {el.brand.name} {el.name}
                                </Link>
                                <div className={s.cart__price}>${el.price}</div>
                                <select>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <button
                                    onClick={() => {
                                        removeCartItem({ variables: { id: el.id } })
                                    }}
                                    disabled={isFetchingRemove}
                                    className={s.cart__delete}
                                >
                                    {!isFetchingRemove ?
                                        <CloseIcon />
                                        :
                                        <span>...</span>
                                    }
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={s.checkout}>
                <div className={s.checkout__amount}>
                    <div>Total Price</div>
                    <div className={s.checkout__price}>
                        ${cart.reduce((total, curr) => {
                        return total + (curr.qty * curr.price)
                    }, 0).toFixed(2)
                        }
                    </div>
                </div>
                <button className={s.checkout__button}>Checkout</button>
            </div></> :
            <div className={s.empty}>
                <div className={s.empty__text}>Cart is Empty :(</div>
                <Link className={s.empty__button} to='/category/all' >Shop Now</Link>
            </div>}
        </>
        :
        <div>Loading</div>
        }
    </div>
    </>
    )

}

const mStP = (state) => ({

    isAuth: state.auth.isAuth

})

export default connect(mStP, { setQty })(CartPage)