import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import s from './ProfileFavourites.module.css'
import { deleteFavouriteThunk } from '../../../redux/authReducer'
import { CloseIcon } from '../../../assets/Icons'

const ProfileFavourites = ({ favourites, isAuth, deleteFavouriteThunk, ...props }) => {
    return (
        <>
            {!isAuth && <Redirect to='/' />}
            <h2 className={s.profile__header}>Мои Избранные</h2>
            <div className={s.favourites}>
                {favourites.map((el)=>{
                    return(
                        <div key={el.id} className={s.favourite__wrapper}>
                            <button onClick={()=>{
                                deleteFavouriteThunk(el.id)
                            }} className={s.favourite__close}><CloseIcon /></button>
                            <Link to={'/item/'+el.id} className={s.favourite}>
                                <div className={s.favourite__img}><img src={el.image} alt='favourites' /></div>
                                <div className={s.favourite__right}>
                                    <div className={s.favourite__title}>{el.title}</div>
                                    <div className={s.favourite__desc}>{el.description}</div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    )

}

const mStP = (state) => ({

    isAuth: state.auth.isAuth,
    favourites: state.auth.favourites

})

export default connect(mStP, { deleteFavouriteThunk })(ProfileFavourites)