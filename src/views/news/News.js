import React from 'react'
import ClientHeader from '../../components/client-header'
import NewsHome from './News.module.css'
import bg from '../../assets/logo.jpg'

export default function News() {
  return (
    <div className={NewsHome.wrap}>
      <ClientHeader></ClientHeader>
      <div className={NewsHome.banner}>
        <div className={NewsHome.desc}>
            <div className={NewsHome.line}></div>
            <p>Before all masters, necessity is the one most listened to, and who teaches the best.</p>
            <h1>Dayu Pro</h1><h1>DREAMWORKS</h1>
        </div>
      </div>
      <div className={NewsHome.content}>
        <img src={bg} alt='Fancy Dreamer'/>
      </div>
    </div>
  )
}
