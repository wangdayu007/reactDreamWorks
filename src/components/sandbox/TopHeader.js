import React from 'react'
import { Layout,Dropdown,Menu,Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
const { Header } = Layout;

function TopHeader(props) {
  const changeCollapsed = ()=>{
    props.changeCollapsed()
  }

  const {role:{roleName},username} = JSON.parse(localStorage.getItem('token'))

  const onClick = ({ key }) => {
    localStorage.removeItem('token')
    props.history.replace('/MonkeyPro')
  };
  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          key: '1',
          label: roleName,
        },
        {
          key: '2',
          danger: true,
          label: 'sign out',
        }
      ]}
    />
  );
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
    {
      props.isCollapsed?<MenuUnfoldOutlined onClick={changeCollapsed}/>:
      <MenuFoldOutlined onClick={changeCollapsed}/>
    }
    <div style={{float:'right'}}>
      welcome back,<span style={{color:'blue'}}>{username}</span>
      <Dropdown overlay={menu}>
        <Avatar size="large" icon={<UserOutlined />} style={{marginLeft:'15px'}}/>
      </Dropdown>
    </div>
  </Header>
  )
}
const mapStateToProps=state=>{
  return{
    isCollapsed:state.CollApsedReducer.isCollapsed
  }
}

const mapDispatchToProps = {
  changeCollapsed(){
    return{
      type:'change_collapsed'
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TopHeader))
