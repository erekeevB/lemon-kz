import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { HeartIcon, HeartIconFilled } from '../../assets/Icons';
import { GET_ITEMS } from '../../GRAPHQL/items';
import { toggleFavouriteThunk } from '../../redux/authReducer';
import { getSetCategoryResultThunk } from '../../redux/categoryReducer';
import SignInWarning from '../SignInWarning/SignInWarning';
import queryString from 'query-string';
import s from './ItemList.module.css';

const CategoryList = ({isAuth}) => {

    let location = useLocation()

    let [query, setQuery] = useState(queryString.parse(location.search))

    useEffect(()=>{
        setQuery(queryString.parse(location.search))
        debugger
    }, [location])

    let {data, loading} = useQuery(GET_ITEMS, {
        variables: {...query},
        onCompleted: data=>{
            debugger
            console.log(data)
        },
        onError: err=>{
            debugger
            console.log(err.message)
        }
    })

    const [isLikeClickedAndNotAuth, setIsLikeClickedAndNotAuth] = useState(false)

    const handleFavouriteButton = (id) => {
        if(isAuth){
            
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
            {loading ?
                // MUST BE PRELOADER
                <div>Loading...</div> :
                <div className={s.items}>
                    {data && data.itemList.items.map((el) => {
                        debugger
                        return (
                            <div key={el.id} className={s.item__wrapper}>
                                <div className={s.item__favourite}>
                                    <button onClick={() => {
                                        handleFavouriteButton(el.id)
                                    }}>
                                        {
                                            el.isFavourite ? 
                                            <HeartIconFilled /> :
                                            <HeartIcon />
                                        }
                                    </button>
                                </div>
                                {/* <button className={s.item__openHere}>Open Here</button> */}
                                <Link to={'/item/'+el.id} className={s.item}>
                                    <div className={s.item__image}>
                                        <img src={el.thumbnail} alt={el.brand.name+' '+el.name} />
                                    </div>
                                    <div className={s.item__bottom}>
                                        <div className={s.item__price}>${el.price}</div>
                                        <div className={s.item__title}>{el.brand.name} {el.name}</div>
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