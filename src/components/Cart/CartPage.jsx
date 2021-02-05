import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MinusIcon, PlusIcon } from '../../assets/Icons';
import { changeAmountThunk, deleteCardItemThunk } from '../../redux/cartReducer';
import s from './CartPage.module.css'

const CartPage = ({cart, changeAmountThunk, deleteCardItemThunk}) => {

    return (
        <div className={s.cartPage}>
            <div className={s.cartPage__header}>
                <h2>My Cart</h2>
            </div>
            {cart.length ? 
                <><div className={s.carts}>
                    {cart.map(el=>{
                        return (
                            <div key={el.id} className={s.cart}>
                                <div className={s.cart__image}><img src={el.image} alt=''/></div>
                                <Link className={s.cart__title} to={'/item/'+el.id}>
                                    {el.title}
                                </Link>
                                <div className={s.cart__price}>${el.price}</div>
                                <div className={s.cart__buttons}>
                                    <button 
                                        className={s.cart__button} 
                                        onClick={()=>{
                                            if(el.amount>1){
                                                changeAmountThunk(el.id, false)
                                            }else if(el.amount===1){
                                                deleteCardItemThunk(el.id)
                                            }}}
                                    ><MinusIcon /></button>
                                    <div className={s.cart__amount}>{el.amount}</div>
                                    <button 
                                        className={s.cart__button} 
                                        onClick={()=>{
                                            if(el.amount<10){
                                                changeAmountThunk(el.id, true)
                                        }}}
                                    ><PlusIcon /></button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={s.checkout}>
                    <div className={s.checkout__amount}>
                        <div>Total Price</div>
                        <div className={s.checkout__price}>
                            ${cart.reduce((total, curr)=>total+(curr.amount*curr.price), 0).toFixed(2)}
                        </div>
                    </div>
                    <button className={s.checkout__button}>Checkout</button>
                </div></> :
            <div className={s.empty}>
                <div className={s.empty__text}>Cart is Empty :(</div>
                <Link className={s.empty__button} to='/category/all' >Shop Now</Link>
            </div>}
        </div>
    )

}

const mStP = (state) => ({

    cart: state.cart.cart

})

export default connect(mStP, {changeAmountThunk, deleteCardItemThunk})(CartPage)