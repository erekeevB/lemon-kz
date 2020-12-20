import React from 'react'
import { Down } from '../../assets/Icons'
import s from './Main.module.css'

const Slider = () => {

    return (

        <div className={s.slider__wrapper}>
            <div className={s.slider}>
                <span className={s.slider__arrowWrappers + ' ' + s.slider__left}>
                    <span className={s.slider__arrows + ' ' + s.slider__left}>
                        <Down />
                    </span>
                </span>
                <span className={s.slider__arrowWrappers + ' ' + s.slider__right}>
                    <span className={s.slider__arrows + ' ' + s.slider__right}>
                        <Down />
                    </span>
                </span>
                <h1>Интернет Магазин</h1>
            </div>
        </div>

    )

}

const Main = () => {

    return (
        <div className={s.main}>
            <Slider />
        </div>
    )

}

export default Main