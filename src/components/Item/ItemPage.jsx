import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSetItemThunk } from '../../redux/itemReducer';
import s from './ItemPage.module.css'

const ItemPage = ({id, item, getSetItemThunk}) => {

    useEffect(()=>{
        getSetItemThunk(id)
    }, [id])

    return (
        <div className={s.item__wrapper}>
            <div className={s.item__category}>
                <Link to={'/category/'+item.category}>{item.category}</Link> / {id}
            </div>
            <h2 className={s.item__title}>{item.title}</h2>
            <div className={s.item}>
                <div className={s.item__left}>
                    <div className={s.item__image}>
                        <img src={item.image} />
                    </div>
                </div>
                <div className={s.item__right}>
                    <div className={s.item__price}>{item.price}$</div>
                    <button className={s.item__card}>Add To Card</button>
                </div>
            </div>
            <div className={s.item__desc}>{item.description}</div>
        </div>
    )

}

let mStP = (state) => ({
    item: state.item.item
})

export default connect(mStP, {getSetItemThunk})(ItemPage)