import { message } from 'antd'
import React,{useRef, useState} from 'react'
import login from './Login.module.css'
import logo from '../../assets/logo.jpg'
import Copyright from '../../components/copyright'

const token = {"id":1,"username":"DayuPro","password":"qwe@#123456","roleState":true,"default":true,"region":"","roleId":1,"role":{"id":1,"roleName":"超级管理员","roleType":1,"rights":["/user-manage/add","/user-manage/delete","/user-manage/update","/right-manage","/right-manage/right/list","/right-manage/role/update","/right-manage/right/update","/news-manage","/news-manage/list","/news-manage/add","/news-manage/update/:id","/news-manage/preview/:id","/news-manage/draft","/news-manage/category","/audit-manage","/audit-manage/audit","/audit-manage/list","/publish-manage","/publish-manage/unpublished","/publish-manage/published","/publish-manage/sunset","/user-manage","/user-manage/list","/right-manage/role/list","/right-manage/role/delete","/right-manage/right/delete","/home"]}}
export default function Login(props) {
  const [username,setusername] = useState('DayuPro')
  const [password,setpassword] = useState(null)
  const unameRef =  useRef()
  const pwdRef =  useRef()
  const onFinish = ()=>{
    if(username==='DayuPro'&&password==='qwe@#123456'){
      message.success('welcome!')
      localStorage.setItem('token',JSON.stringify(token))
      props.history.push('/home')
    }else if(username===null || password === null){
      message.error('please complete the information')
    }else{
      message.error("sorry,you aren't Dayu Pro Member,please confirm your account again!")
    }
  }
  return (
    <div className={login.wrap} style={{height:'100%'}}>
      <div className={login.form}>
        <div className={login.left}>
          <img src={logo} alt='logo'/>
        </div>
        <div className={login.right}>
          <div className={login.rightIcon}>
            <h1 className={login.title}>Dayu Pro Log In</h1>
            <h3 className={login.frmLabel}>NAME</h3>
            <input ref={unameRef} defaultValue='DayuPro' className={login.text} type="text" onChange={()=>{setusername(unameRef.current.value)}}></input>
            <h3 className={login.frmLabel}>PASSWORD</h3>
            <input ref={pwdRef} className={login.text} type="password" onChange={()=>{setpassword(pwdRef.current.value)}}></input>
            <input className={login.btn} type="submit" value="login" onClick={()=>onFinish()}/>
          </div>
        </div>
      </div>
      <Copyright></Copyright>
    </div>
  )
}
