import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getSetCategoryResultThunk } from '../../redux/categoryReducer';
import s from './CategoryList.module.css'

const CategoryList = ({param, isAll, error, result, isFetching}) => {

    let [a, setA] = useState('a')

    useEffect(()=>{
        setA('b')
        // getSetCategoryResultThunk(isAll, param.name)
    }, [param])

    return (
        <>
            {isFetching?
                <div>Loading</div> :
                <div>
                    {a}
                    {result.map((el)=>{
                        return(
                            <div>
                                <div>{el.name}</div>
                                <div><img src={el.photo}/></div>
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
    isFetching: state.category.isFetching

})

export default connect(mStP, {getSetCategoryResultThunk})(CategoryList)