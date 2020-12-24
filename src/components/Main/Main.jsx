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
            <SliderContainer period={1} objects={temp} />

            <div className={s.sexSelect}>
                <Link className={s.sexSelect__elem}>
                    <div></div>
                </Link>
                <Link className={s.sexSelect__elem}>
                    <div></div>
                </Link>
                <Link className={s.sexSelect__elem}>
                    <div></div>
                </Link>
            </div>
        </div>
    )

}

export default Main