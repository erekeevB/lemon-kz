import React, { useState } from 'react'
import { DownCarot } from '../../assets/Icons'
import s from './Paginator.module.css'

const Paginator = ({currentPage, pages, onPageClick}) => {

    return (
        <div className={s.paginator}>
            <button className={s.paginator__prev} disabled={currentPage===1}><DownCarot /></button>
            {pages < 5 ? 
                [...Array(pages)].map((_, index)=>{
                    return(
                        <button 
                            className={currentPage === index+1 && s.paginator__button_active}
                            disabled={currentPage === index+1}
                            onClick={()=>onPageClick(index+1)}
                        >
                            {index+1}
                        </button>
                    )
                })
            :
                [...Array(5)].map((_, index)=>{
                    let tempPage
                    if(currentPage<3){
                        tempPage = index+1
                    }else if(currentPage>pages-3){
                        tempPage = index+pages-4
                    }else{
                        tempPage = index+currentPage-2
                    }
                    return(
                        <button
                            className={currentPage === tempPage && s.paginator__button_active}
                            disabled={currentPage === tempPage}
                            onClick={()=>onPageClick(tempPage)}
                        >
                            {tempPage}
                        </button>
                    )
                })
            }
            <button className={s.paginator__next} disabled={currentPage===pages}><DownCarot /></button>
        </div>
    )

}

export default Paginator