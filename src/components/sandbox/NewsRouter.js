import React, { useEffect ,useState} from 'react'
import Home from '../../views/sandbox/home/Home'
import UserList from '../../views/sandbox/user-manage/UserList'
import RoleList from '../../views/sandbox/right-manage/RoleList'
import RightList from '../../views/sandbox/right-manage/RightList'
import NoPermission from '../../views/sandbox/nopermission/NoPermission'
import NewsAdd from '../../views/sandbox/news-manage/NewsAdd'
import NewsDraft from '../../views/sandbox/news-manage/NewsDraft'
import NewsCatogery from '../../views/sandbox/news-manage/NewsCategory'
import Audit from '../../views/sandbox/audit-manage/Audit'
import AuditList from '../../views/sandbox/audit-manage/AuditList'
import Unpublished from '../../views/sandbox/publish-manage/Unpublished'
import Published from '../../views/sandbox/publish-manage/Published'
import Sunset from '../../views/sandbox/publish-manage/Sunset'
import NewsPreview from '../../views/sandbox/news-manage/NewsPreview'
import NewsUpdate from '../../views/sandbox/news-manage/NewsUpdate'
import { Spin } from 'antd'

import {Switch,Route,Redirect} from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

const LocalRouterMap = {
    "/home":Home,
    '/user-manage/list':UserList,
    '/right-manage/role/list':RoleList,
    '/right-manage/right/list':RightList,
    '/news-manage/add':NewsAdd,
    '/news-manage/draft':NewsDraft,
    '/news-manage/category':NewsCatogery,
    '/news-manage/preview/:id':NewsPreview,
    '/news-manage/update/:id':NewsUpdate,
    '/audit-manage/audit':Audit,
    '/audit-manage/list':AuditList,
    '/publish-manage/unpublished':Unpublished,
    '/publish-manage/published':Published,
    '/publish-manage/sunset':Sunset,
} 

function NewsRouter(props) {

  const [BackRouteList,setBackRouteList] = useState([])
  useEffect(()=>{
    Promise.all([
      axios.get('/rights'),
      axios.get('/children'),
    ]).then(res=>{
      setBackRouteList([...res[0].data,...res[1].data])
      console.log([...res[0].data,...res[1].data])
    })
    
  },[])

  const {role:{rights}} = JSON.parse(localStorage.getItem('token'))
  
  const checkRoute=(item)=>{
    return LocalRouterMap[item.key] && 
    (item.pagepermisson || item.routepermisson)
  }

  const checkUserPermission=(item)=>{
    return rights.includes(item.key)
  }

  return (
    <Spin size="large" spinning={props.isLoading}>
      <Switch>
        {
          BackRouteList.map(item=>{
            if(checkRoute(item)&&checkUserPermission(item)){
              return <Route exact path={item.key} 
                      key={item.key} 
                      component={LocalRouterMap[item.key]}/>
            }
            return null
          })
        }
      <Redirect from="/MoneyPro" to="/home" exact/>
      {
        BackRouteList.length>0 && <Route path="*" component={NoPermission}/>
      }
    </Switch>
  </Spin>
  )
}

const mapStateToProps=state=>{
  return{
    isLoading:state.LoadingReducer.isLoading
  }
}


export default connect(mapStateToProps)(NewsRouter)
