import React from 'react'
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
import News from '../views/news/News'
import Blog from '../views/news/blog/Blog'
import Project from '../views/news/projects/Project'
import ContactMe from '../views/news/contactMe/ContactMe'

export default function IndexRouter() {
  return (
    <HashRouter>
        <Switch>
            {/* 前端首页 */}
            <Route exact path="/DayuPro" component={News}/>
            {/* 后台登录页 */}
            <Route path="/MonkeyPro" component={Login}/>
            {/* 前端博客页 */}
            <Route path="/blog" component={Blog}/>
            {/* 前端项目页 */}
            <Route path="/projects" component={Project}/>
            {/* 前端联系我 */}
            <Route path="/contactme" component={ContactMe}></Route>
            <Route path="/" render={()=>
                localStorage.getItem('token')?
                <NewsSandBox></NewsSandBox>:
                <Redirect to="/MonkeyPro"/>
            }/>
        </Switch>
    </HashRouter>
  )
}


