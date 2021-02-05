import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { HeartIcon, HeartIconFilled } from '../../assets/Icons';
import { toggleFavouriteThunk } from '../../redux/authReducer';
import { getSetCategoryResultThunk } from '../../redux/categoryReducer';
import SignInWarning from '../SignInWarning/SignInWarning';
import s from './CategoryList.module.css'

const CategoryList = ({ 
    param, 
    isAll, 
    error, 
    result, 
    isFetching, 
    favourites,
    isAuth,
    getSetCategoryResultThunk, 
    toggleFavouriteThunk 
}) => {

    const [isLikeClickedAndNotAuth, setIsLikeClickedAndNotAuth] = useState(false)

    let a = useHistory()

    useLayoutEffect(() => {
        getSetCategoryResultThunk(isAll, param)
    }, [param, isAll])

    const handleFavouriteButton = (el) => {
        if(isAuth){
            toggleFavouriteThunk(el)
        }else{
            setIsLikeClickedAndNotAuth(true)
        }
    }

    return (
        <>
            <SignInWarning 
                state={isLikeClickedAndNotAuth}
                setState={setIsLikeClickedAndNotAuth}
                text = {'Add Items to Favourite!'}
            />
            {isFetching ?
                // MUST BE PRELOADER
                <div>Loading...</div> :
                <div className={s.items}>
                    {result.map((el) => {
                        return (
                            <div key={el.id} className={s.item__wrapper}>
                                <div className={s.item__favourite}>
                                    <button onClick={() => {
                                        handleFavouriteButton(el)
                                    }}>
                                        {
                                            favourites.some(item=>item.id===el.id) ? 
                                            <HeartIconFilled /> :
                                            <HeartIcon />
                                        }
                                    </button>
                                </div>
                                <button className={s.item__openHere}>Open Here</button>
                                <Link to={'/item/'+el.id} className={s.item}>
                                    <div className={s.item__image}><img src={el.image} /></div>
                                    <div className={s.item__bottom}>
                                        <div className={s.item__price}>${el.price}</div>
                                        <div className={s.item__title}>{el.title}</div>
                                        {/* <div className={s.item__buttons}>
                                            <button>More</button>
                                            <button>Add to Card</button>
                                        </div> */}
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            }
        </>
    )

}

const mStP = (state) => ({

    error: state.category.error,
    result: state.category.result,
    isFetching: state.category.isFetching,
    favourites: state.auth.favourites,
    isAuth: state.auth.isAuth

})

export default connect(mStP, { getSetCategoryResultThunk, toggleFavouriteThunk })(CategoryList)