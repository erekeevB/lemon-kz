import React from 'react';
import { NavLink } from 'react-router-dom';
import CategoryList from './CategoryList';
import s from './CategoryList.module.css'

const CategoryListRouter = ({ param, isAll }) => {

    return (
        <div className={s.category__wrapper}>
            <div className={s.category}>
                <div className={s.filters}>
                    <NavLink to='/category' />
                </div>
                <CategoryList param={param} isAll={isAll} />
            </div>
        </div>
    )

}

export default CategoryListRouter