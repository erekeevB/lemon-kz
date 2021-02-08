import React from 'react'
import { Link } from 'react-router-dom'
import SliderContainer from '../Slider/Slider'
import s from './Main.module.css'

let temp = [
    {
        header: 'AAAAA',
        desc: 'Скидки до 70% до 01.01.2021',
        btn: 'Перейти',
        to: '/abfd1'
    },
    {
        header: 'BBBBB',
        desc: 'Скидки до 70% до 01.01.2021',
        btn: 'Перейти',
        to: '/abfd2'
    },
    {
        header: 'CCCCC',
        desc: 'Скидки до 70% до 01.01.2021',
        btn: 'Перейти',
        to: '/abfd3'
    },
    {
        header: 'DDDDD',
        desc: 'Скидки до 70% до 01.01.2021',
        btn: 'Перейти',
        to: '/abfd4'
    }
]

const Main = () => {

    return (
        <div className={s.main}>
            <SliderContainer period={1} afterClickPeriod={3} objects={temp} />

            <div className={s.sexSelect}>
                <Link to='/items?sex=w' className={s.sexSelect__elem}>
                    <div>Women</div>
                </Link>
                <Link to='/items?sex=m' className={s.sexSelect__elem}>
                    <div>Men</div>
                </Link>
                <Link to='/items?category=Sneakers' className={s.sexSelect__elem}>
                    <div>Sneakers</div>
                </Link>
            </div>
        </div>
    )

}

export default Main