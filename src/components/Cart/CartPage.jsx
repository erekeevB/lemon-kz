import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { CloseIcon } from '../../assets/Icons';
import { GET_CART_ITEMS, MUTATE_CART_ITEM_QTY, REMOVE_FROM_CART } from '../../GRAPHQL/cart';
import { GET_SINGLE_ITEM } from '../../GRAPHQL/items';
import { setQty } from '../../redux/authReducer';
import s from './CartPage.module.css'

const CartPage = ({ isAuth, setQty }) => {

    let history = useHistory()

    if(!isAuth){
        history.push('/')
    }

    const {data, refetch} = useQuery(GET_CART_ITEMS, {
        onCompleted: (data) => {
            debugger
            setLoading(false)
        },
        onError: () =>{
            setLoading(false)
        }
    })

    const [removeCartItem] = useMutation(REMOVE_FROM_CART, {
        onCompleted: data => {
            debugger
            refetch()
            setQty(data.mutateCart.cartQty)
            setIsRemoveFetching(-1)
        },
        onError: ()=>{
            setIsRemoveFetching(-1)
        }
    })

    // useEffect(()=>{
    //     refetch()
    // }, [])

    const [mutateItemQty] = useMutation(MUTATE_CART_ITEM_QTY, {
        update(cache, {data, errors}){
            if(!errors){
                let item = cache.readQuery({
                    query: GET_SINGLE_ITEM, 
                    variables: {id: data.mutateCartItemQty.id}})
                if(item && item.singleItem){
                    cache.writeQuery({
                        query: GET_SINGLE_ITEM, 
                        variables: {id: data.mutateCartItemQty.id}, 
                        data: {
                            singleItem: {...item.singleItem, qty: data.mutateCartItemQty.qty}
                        }})
                }
                let user = cache.readQuery({query: GET_CART_ITEMS})
                if (user && user.user){
                    cache.writeQuery({
                        query: GET_CART_ITEMS, 
                        data: {
                            user: {
                                cartItems: user.user.cartItems.map(el=>{
                                    if(el.id === data.mutateCartItemQty.id){
                                        return {...el, qty: data.mutateCartItemQty.qty}
                                    }
                                    return el
                                })
                            }
                        }})
                }else{
                    refetch()
                }
            }
        }
    })

    let [loading, setLoading] = useState(true)

    let [isRemoveFetching, setIsRemoveFetching] = useState(-1)

    const handleSelect = (id, qty) => {
        mutateItemQty({variables: {id, qty}})
    }

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
                                <select onChange={(e)=>{handleSelect(el.id, e.target.value)}} value={el.qty}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
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