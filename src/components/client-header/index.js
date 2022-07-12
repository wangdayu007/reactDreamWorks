import React,{useState} from 'react'
import clientHeader from './header.module.css'
import { withRouter } from 'react-router-dom'

function ClientHeader(props) {
  const selectkeys = props.location.pathname

  const gotoMenu=(value)=>{
    if (value===0) props.history.push('/DayuPro')
    if (value===2) props.history.push('/projects')
    if (value===3) props.history.push('/blog')
    if (value===4) props.history.push('/contactme')
  }  
  return (
    <div>
      <div className={clientHeader.nav}>
        <div className={clientHeader.logo}>
          <p onClick={()=>gotoMenu(0)} style={{cursor:'pointer'}}>Dayu Pro</p>
        </div>
        <div className={clientHeader.menu}>
          <ul>
            <li className={selectkeys==='/DayuPro'?clientHeader.active:''} onClick={()=>gotoMenu(0)}>Home</li>
            <li className={selectkeys==='/stdio'?clientHeader.active:''} >Studio</li>
            <li className={selectkeys==='/projects'?clientHeader.active:''} onClick={()=>gotoMenu(2)}>Projects</li>
            <li className={selectkeys==='/blog'?clientHeader.active:''}  onClick={()=>gotoMenu(3)}>Blog</li>
            <li className={selectkeys==='/contactme'?clientHeader.active:''} onClick={()=>gotoMenu(4)}>Contact Me</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default withRouter(ClientHeader)
