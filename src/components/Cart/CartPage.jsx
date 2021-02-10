import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { CloseIcon } from '../../assets/Icons';
import { GET_CART_ITEMS, REMOVE_FROM_CART } from '../../GRAPHQL/cart';
import { GET_SINGLE_ITEM } from '../../GRAPHQL/items';
import { setQty } from '../../redux/authReducer';
import s from './CartPage.module.css'

const CartPage = ({ isAuth, setQty }) => {

    const {data, refetch} = useQuery(GET_CART_ITEMS, {
        onCompleted: () => {
            setLoading(false)
        },
        onError: () =>{
            setLoading(false)
        }
    })

    const [removeCartItem] = useMutation(REMOVE_FROM_CART, {
        onCompleted: data => {
            refetch()
            setQty(data.mutateCart.cartQty)
            setIsRemoveFetching(-1)
        },
        onError: ()=>{
            setIsRemoveFetching(-1)
        }
    })

    let [loading, setLoading] = useState(true)

    let [isRemoveFetching, setIsRemoveFetching] = useState(-1)

    let history = useHistory()

    useEffect(() => {
        if(!isAuth){
            history.push('/')
        }else{
            refetch()
        }
    }, [isAuth])

    return (
    <>
    <div className={s.cartPage}>
        <div className={s.cartPage__header}>
            <h2>My Cart</h2>
        </div>
        {!loading && isAuth?
        <>
            {data && data.user && data.user.cartItems.length ?
            <><div className={s.carts}>
                {data.user.cartItems.map(el => {
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
                                        setIsRemoveFetching(el.id)
                                        removeCartItem({ 
                                            variables: { id: el.id },
                                            update(cache, ){
                                                let item = cache.readQuery({
                                                    query: GET_SINGLE_ITEM, 
                                                    variables: {id: el.id}
                                                })
                                                if(item){
                                                    cache.writeQuery({
                                                        query: GET_SINGLE_ITEM,
                                                        variables: {id: el.id},
                                                        data: {
                                                            singleItem: {...item, qty: 0}
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }}
                                    disabled={isRemoveFetching > 0}
                                    className={s.cart__delete}
                                >
                                    {isRemoveFetching!==el.id ?
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
                        ${data && data.user.cartItems.reduce((total, curr) => {
                        return total + (curr.qty * curr.price)
                    }, 0).toFixed(2)
                        }
                    </div>
                </div>
                <button className={s.checkout__button}>Checkout</button>
            </div></> :
            <div className={s.empty}>
                <div className={s.empty__text}>Cart is Empty :(</div>
                <Link className={s.empty__button} to='/items' >Shop Now</Link>
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