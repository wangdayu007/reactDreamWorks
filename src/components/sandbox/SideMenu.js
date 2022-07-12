import React from 'react'
import { Layout,Menu  } from 'antd';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './index.css'
const { Sider } = Layout;

function SideMenu(props) {

  const menu = [
    {
      "id": 1,
      "label": "Introduction",
      "key": "/home",
      "pagepermisson": 1,
      "grade": 1,
      "children": ""
    },
    {
      "id": 2,
      "label": "User Manage",
      "key": "/user-manage",
      "pagepermisson": 1,
      "grade": 1,
      "children": [
        {
          "id": 6,
          "label": "User List",
          "key": "/user-manage/list",
          "pagepermisson": 1,
          "grade": 2
        }
      ]
    },
    {
      "id": 7,
      "label": "Rights Manage",
      "key": "/right-manage",
      "pagepermisson": 1,
      "grade": 1,
      "children": [
        {
          "id": 8,
          "label": "Role List",
          "key": "/right-manage/role/list",
          "pagepermisson": 1,
          "grade": 2
        },
        {
          "id": 9,
          "label": "Rights List",
          "key": "/right-manage/right/list",
          "pagepermisson": 1,
          "grade": 2
        }
      ]
    },
    {
      "id": 14,
      "label": "Blog Manage",
      "key": "/news-manage",
      "pagepermisson": 1,
      "grade": 1,
      "children": [
        {
          "id": 16,
          "label": "Write A Blog",
          "key": "/news-manage/add",
          "grade": 2,
          "pagepermisson": 1
        },
        {
          "id": 19,
          "label": "Drafts",
          "key": "/news-manage/draft",
          "pagepermisson": 1,
          "grade": 2
        },
        {
          "id": 20,
          "label": "Blog Type",
          "key": "/news-manage/category",
          "pagepermisson": 1,
          "grade": 2
        }
      ]
    },
    {
      "id": 21,
      "label": "Audit Manage",
      "key": "/audit-manage",
      "pagepermisson": 1,
      "grade": 1,
      "children": [
        {
          "id": 22,
          "label": "Audit Blog",
          "key": "/audit-manage/audit",
          "pagepermisson": 1,
          "grade": 2
        },
        {
          "id": 23,
          "label": "Audit List",
          "key": "/audit-manage/list",
          "pagepermisson": 1,
          "grade": 2
        }
      ]
    },
    {
      "id": 24,
      "label": "Publish Manage",
      "key": "/publish-manage",
      "pagepermisson": 1,
      "grade": 1,
      "children": [
        {
          "id": 25,
          "label": "To be Published",
          "key": "/publish-manage/unpublished",
          "pagepermisson": 1,
          "grade": 2
        },
        {
          "id": 26,
          "label": "Published",
          "key": "/publish-manage/published",
          "pagepermisson": 1,
          "grade": 2
        },
        {
          "id": 27,
          "label": "Offline",
          "key": "/publish-manage/sunset",
          "pagepermisson": 1,
          "grade": 2
        }
      ]
    }
  ]


  const handleClick =(item)=>{
    props.history.push(item.key)
  }
  const selectkeys = [props.location.pathname]
  const openKeys = ["/"+props.location.pathname.split("/")[1]]
  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
      <div style={{display:"flex",height:'100%',"flexDirection":"column"}}> 
        <div className='logo'>Dayu Pro</div>
        <div style={{flex:1,"overflow":"auto"}}>
          <Menu
              theme="dark"
              mode="inline"
              items={menu}
              onClick={handleClick}
              selectedKeys={selectkeys}
              defaultOpenKeys={openKeys}
              key={menu.id}
            />
        </div>
      </div>
      </Sider>
  )
}

const mapStateToProps=state=>{
  return{
    isCollapsed:state.CollApsedReducer.isCollapsed
  }
}


export default connect(mapStateToProps,)(withRouter(SideMenu))