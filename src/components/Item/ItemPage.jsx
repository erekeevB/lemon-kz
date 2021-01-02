import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { HeartIcon, HeartIconFilled, MinusIcon, PlusIcon } from '../../assets/Icons';
import { toggleFavouriteThunk } from '../../redux/authReducer';
import { getSetItemThunk } from '../../redux/itemReducer';
import s from './ItemPage.module.css'

const ItemPage = ({id, item, favourites, isAuth, getSetItemThunk, toggleFavouriteThunk}) => {

    const [quantity, setQuantity] = useState(0)

    useEffect(()=>{
        getSetItemThunk(id)
        setQuantity(0)
    }, [id])

    return (
        <div className={s.item__wrapper}>
            <div className={s.item__category}>
                <Link to={'/category/'+item.category}>{item.category}</Link> / {id}
            </div>
            
            <div className={s.item}>
                <div>
                    <h2 className={s.item__title}>{item.title}</h2>
                    <div className={s.item__image}>
                        <img src={item.image} />
                    </div>
                </div>
                <div className={s.item__right}>
                    <div className={s.item__price}>${item.price}</div>
                    <div className={s.item__quantity__wrapper}>
                        Quantity
                        <div className={s.item__quantity}>
                            <button onClick={()=>setQuantity(count=>{
                                if(count>0){
                                    return count-1
                                }else{
                                    return count
                                }
                                })}><MinusIcon /></button>
                            <div>{quantity}</div>
                            <button onClick={()=>setQuantity(count=>{
                                if(count>=10){
                                    return count
                                }else{
                                    return count+1
                                }
                                })}><PlusIcon /></button>
                        </div>
                    </div>
                    <div className={s.item__buttons}>
                        <button className={s.item__card}>Add To Card</button>
                        <button onClick={()=>{
                            if(isAuth){
                                debugger
                                toggleFavouriteThunk(item)
                            }
                        }} className={s.item__favourite}>
                            {!favourites.some((el)=>el.id===item.id) || !isAuth ? 
                            <><HeartIcon />Add To Favourite</>:
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
    )

}

let mStP = (state) => ({
    item: state.item.item,
    favourites: state.auth.favourites,
    isAuth: state.auth.isAuth
})

export default connect(mStP, {getSetItemThunk, toggleFavouriteThunk})(ItemPage)