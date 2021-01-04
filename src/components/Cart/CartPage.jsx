import React from 'react';
import { connect } from 'react-redux';

const CartPage = ({cart}) => {

    return (
        <div>
            <div>
                <h2>My Cart</h2>
            </div>
            <div>
                {cart.map(el=>{
                    return (
                        <div>
                            <div><img src={el.image} alt=''/></div>
                            <div>{el.title}</div>
                            <div>
                                <button>-</button>
                                <div>{el.amount}</div>
                                <button>+</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>
                <button>Checkout</button>
            </div>
        </div>
    )

}

const mStP = (state) => ({

    cart: state.cart.cart

})

export default connect(mStP, {})(CartPage)