import React from 'react'
import s from './Footer.module.css'

const Footer = () => {

    return (
        <footer className={s.footer__wrapper}>
            <div className={s.footer}>
                <ul>
                    <li><a href='/'>Контакты</a></li>
                    <li><a href='/'>О компании</a></li>
                    <li><a href='/'>Наши партнеры</a></li>
                    <li><a href='/'>Как стать партнером</a></li>
                    <li><a href='/'>F.A.Q. - Частые вопросы</a></li>
                </ul>
            </div>
        </footer>
    )

}

export default Footer