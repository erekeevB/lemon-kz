import React from 'react';
import CategoryList from './ItemList';
import s from './ItemList.module.css'

const CategoryListRouter = () => {

    return (
        <div className={s.category__wrapper}>
            <div className={s.category}>
                <div className={s.filters}>
                </div>
                <CategoryList />
            </div>
        </div>
    )

}

export default CategoryListRouter