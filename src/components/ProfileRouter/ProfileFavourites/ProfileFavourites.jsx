import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import s from './ProfileFavourites.module.css'
import { HeartIconFilled } from '../../../assets/Icons'
import { useMutation, useQuery } from '@apollo/client'
import { GET_FAV_ITEMS, TOGGLE_FAV } from '../../../GRAPHQL/items'

const ProfileFavourites = ({ isAuth }) => {

    const {data, loading, refetch} = useQuery(GET_FAV_ITEMS)

    const [toggleFavourite] = useMutation(TOGGLE_FAV, {
        onCompleted: data=>{
            if(data?.toggleFav.success){
                refetch()
            }
        }
    })

    useEffect(()=>{
        if(isAuth){
            refetch()
        }
    }, [isAuth])

    return (
        <>
            {!isAuth && <Redirect to='/' />}
            <h2 className={s.profile__header}>My Favourites</h2>
            <div className={s.favourites}>
                {loading ? <div>Loading</div> :
                <>
                    {data?.user.favouriteItems.length ? data?.user.favouriteItems.map((el)=>{
                        return(
                            <div key={el.id} className={s.favourite__wrapper}>
                                <button onClick={()=>{
                                    toggleFavourite({variables: {id: el.id}})
                                }} className={s.favourite__heart}><HeartIconFilled /></button>
                                <div className={s.favourite}>
                                    <Link 
                                        to={'/item/'+el.id} 
                                        className={s.favourite__img}
                                    >
                                        <img src={el.thumbnail} alt='favourites' />
                                    </Link>
                                    <div className={s.favourite__right}>
                                        <Link 
                                            to={'/item/'+el.id} 
                                            className={s.favourite__title}
                                        >
                                            {el.brand.name} {el.name}
                                        </Link>
                                        <Link 
                                            to={'/item/'+el.id} 
                                            className={s.favourite__desc}
                                        >
                                            {el.description}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }):
                    <div>Empty :((((((((((((((((((((((((((((((((((((((</div>}
                </>
                }
            </div>
        </>
    )

}

const mStP = (state) => ({

    isAuth: state.auth.isAuth

})

export default connect(mStP, {})(ProfileFavourites)