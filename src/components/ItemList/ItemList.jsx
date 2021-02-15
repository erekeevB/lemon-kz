import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { HeartIcon, HeartIconFilled } from '../../assets/Icons';
import { GET_FAV_ITEMS, GET_ITEMS, TOGGLE_FAV } from '../../GRAPHQL/items';
import SignInWarning from '../SignInWarning/SignInWarning';
import s from './ItemList.module.css';

const CategoryList = ({isAuth, query}) => {

    const {data, loading, refetch} = useQuery(GET_ITEMS, {
        variables: {...query}
    })

    const [toggleFavourite] = useMutation(TOGGLE_FAV, {
        onCompleted: data=>{
            if(data?.toggleFav.success){
                refetch()
            }
        },
        refetchQueries: [{query: GET_FAV_ITEMS}]
    })

    const [isLikeClickedAndNotAuth, setIsLikeClickedAndNotAuth] = useState(false)


    useEffect(()=>{
        refetch()
    }, [isAuth])

    const handleFavouriteButton = (id) => {
        if(isAuth){
            toggleFavourite({variables: {id}})
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
                                <Link to={'/item/'+el.id} className={s.item}>
                                    <div className={s.item__image}>
                                        <img src={el.thumbnail} alt={el.brand.name+' '+el.name} />
                                    </div>
                                    <div className={s.item__bottom}>
                                        <div className={s.item__price}>${el.price}</div>
                                        <div className={s.item__title}>{el.brand.name} {el.name}</div>
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
    
    isAuth: state.auth.isAuth

})

export default connect(mStP, {})(CategoryList)