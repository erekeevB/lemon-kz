import React, { useEffect, useState } from 'react';
import ItemList from './ItemList';
import s from './ItemList.module.css'
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

const ItemListRouter = () => {

    let history = useHistory()

    const [query, setQuery] = useState(queryString.parse(history.location.search))

    useEffect(()=>{
        setQuery(queryString.parse(history.location.search))
    }, [history.location.search])

    useEffect(()=>{

        history.push('/items?' + queryString.stringify(query))

    }, [query.page])

    const handleFilter = () => {
        setQuery(prev=>{
            return{
                ...prev,
                page: 1
            }
        })
    }

    return (
        <div className={s.filters__wrapper}>
            <div className={s.filter}>
                <div className={s.filters}>
                    <h2>Filters</h2>
                    <div className={s.filter__wrapper}>
                        <p className={s.filter__title}>Category</p>
                        <div className={s.filter__filter}>
                            <label>
                                <input 
                                    className={s.filter__radio} 
                                    name='Category' 
                                    type='radio' 
                                    value='All'
                                    onChange={(e)=>{setQuery(prev=>{
                                        let {category, ...temp} = prev
                                        return {...temp}
                                    })}}
                                />
                                <div className={s.filter__name}>All</div>
                            </label>
                            <label>
                                <input 
                                    className={s.filter__radio} 
                                    name='Category' 
                                    type='radio' 
                                    value='Sneakers'
                                    onChange={(e)=>{setQuery(prev=>({...prev, category: e.target.value}))}}
                                />
                                <div className={s.filter__name}>Sneakers</div>
                            </label>
                            <label>
                                <input 
                                    className={s.filter__radio}
                                    name='Category'
                                    type='radio'
                                    value='Pants'
                                    onChange={(e)=>{setQuery(prev=>({...prev, category: e.target.value}))}}
                                />
                                <div className={s.filter__name}>Pants</div>
                            </label>
                            <label>
                                <input className={s.filter__radio} name='Category' type='radio' value='Clothes' />
                                <div className={s.filter__name}>Clothes</div>
                            </label>
                        </div>
                    </div>
                    <div className={s.filter__wrapper}>
                        <p className={s.filter__title}>Brand</p>
                        <div className={s.filter__filter}>
                            <label>
                                <input 
                                    className={s.filter__radio} 
                                    name='Brand' 
                                    type='radio'
                                    value='All'
                                    onChange={(e)=>{setQuery(prev=>{
                                        let {brand, ...temp} = prev
                                        return {...temp}
                                    })}}
                                />
                                <div className={s.filter__name}>All</div>
                            </label>
                            <label>
                                <input 
                                    className={s.filter__radio} 
                                    name='Brand' 
                                    type='radio'
                                    value='Adidas'
                                    onChange={(e)=>{setQuery(prev=>({...prev, brand: e.target.value}))}}
                                />
                                <div className={s.filter__name}>Adidas</div>
                            </label>
                            <label>
                                <input 
                                    className={s.filter__radio} 
                                    name='Brand' 
                                    type='radio' 
                                    value='Nike'
                                    onChange={(e)=>{setQuery(prev=>({...prev, brand: e.target.value}))}}    
                                />
                                <div className={s.filter__name}>Nike</div>
                            </label>
                        </div>
                    </div>
                    <div className={s.filter__wrapper}>
                        <p className={s.filter__title}>Sex</p>
                        <div className={s.filter__filter}>
                            <label>
                                <input 
                                    className={s.filter__radio} 
                                    name='Sex' 
                                    type='radio'
                                    value='All'
                                    onChange={(e)=>{setQuery(prev=>{
                                        let {sex, ...temp} = prev
                                        return {...temp}
                                    })}}
                                />
                                <div className={s.filter__name}>All</div>
                            </label>
                            <label>
                                <input 
                                    className={s.filter__radio} 
                                    name='Sex' 
                                    type='radio'
                                    value='m'
                                    onChange={(e)=>{setQuery(prev=>({...prev, sex: e.target.value}))}}
                                />
                                <div className={s.filter__name}>M</div>
                            </label>
                            <label>
                                <input 
                                    className={s.filter__radio} 
                                    name='Sex' 
                                    type='radio' 
                                    value='w'
                                    onChange={(e)=>{setQuery(prev=>({...prev, sex: e.target.value}))}}    
                                />
                                <div className={s.filter__name}>W</div>
                            </label>
                        </div>
                    </div>
                    <div className={s.filter__wrapper}>
                        <p className={s.filter__title}>Price:</p>
                        <label>
                            <div className={s.filter__name}>Max Price {query.maxPrice && query.maxPrice + '$'}</div>
                            <input 
                                type='range' 
                                onChange={(e)=>{setQuery(prev=>({...prev, maxPrice: e.target.value}))}}
                                value={query.maxPrice ? query.maxPrice : 1} 
                                max='500' 
                                min='1' 
                            />
                        </label>
                        <label>
                            <div className={s.filter__name}>Min Price {query.minPrice && query.minPrice  + '$'}</div>
                            <input 
                                type='range' 
                                onChange={(e)=>{setQuery(prev=>({...prev, minPrice: e.target.value}))}}
                                value={query.minPrice ? query.minPrice : 1} 
                                max='500' 
                                min='1' 
                            />
                        </label>
                    </div>
                    <button className={s.filter__search} onClick={handleFilter}>Search</button>
                </div>
                <ItemList query={queryString.parse(history.location.search)} setQuery={setQuery} />
            </div>
        </div>
    )

}

export default ItemListRouter