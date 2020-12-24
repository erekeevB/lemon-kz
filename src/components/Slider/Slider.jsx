import React, { createRef, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Down } from '../../assets/Icons'
import s from './Slider.module.css'

const SliderElem = ({
    img, imgAlt, imgClassName,
    header, headerClassName,
    desc, descClassName,
    to
    }) => {

    return(

        <Link to={to} className={s.sliderElem}>
            <div className ={s.sliderElem__wrapper}>
                {header && <h2 className={s.sliderElem__header + ' ' + headerClassName}>{header}</h2>}
                {img && <img className={s.sliderElem__img + ' ' + imgClassName} src={img} alt={imgAlt ? imgAlt : ''} />}
                {desc && <div className={s.sliderElem__desc + ' ' + descClassName}>{desc}</div>}
            </div>
        </Link>

    )

}

const SliderContainer = ({objects, className, period}) => {

    let [currEl, setCurrEl] = useState(0)

    let [isTouched, setIsTouched] = useState(false)

    let timerId = useRef()

    useEffect(()=>{
        debugger
        timerId.current = setInterval(()=>{
            debugger
            setNext()
        }, period*1000)

    }, [])

    useEffect(()=>{
        clearInterval(timerId.current)
    }, [isTouched])

    const setPrev = () => {

        if(currEl === 0){
            setCurrEl(objects.length-1)
        }else{
            setCurrEl(currEl - 1)
        }

    }

    const setNext = () => {

        if(currEl === objects.length - 1){
            setCurrEl(0)
        }else{
            setCurrEl(currEl + 1)
        }

    }

    return (
        <div className={s.slider__wrapper + ' ' + className}>
            <div className={s.slider}>
                <button 
                    className={s.slider__arrowWrappers + ' ' + s.slider__left} 
                    onClick={
                        ()=>{
                            setIsTouched(true)
                            setPrev()
                        }}>
                    <span className={s.slider__arrows + ' ' + s.slider__left}>
                        <Down />
                    </span>
                </button>
                <button 
                    className={s.slider__arrowWrappers + ' ' + s.slider__right} 
                    onClick={
                        ()=>{
                            setIsTouched(true)
                            setNext()
                        }}>
                    <span className={s.slider__arrows + ' ' + s.slider__right}>
                        <Down />
                    </span>
                </button>
                <div className={s.slider__bottomNav}>
                    {objects.map((el, index)=>{
                        return(
                            <button 
                                onClick={()=>setCurrEl(index)} 
                                className={index===currEl ? s.slider__bottomNav__button+ ' ' + s.active :
                                s.slider__bottomNav__button}
                            ></button>
                        )
                    })}
                </div>
                <SliderElem {...objects[currEl]} />
            </div>
        </div>
    )

}

export default SliderContainer