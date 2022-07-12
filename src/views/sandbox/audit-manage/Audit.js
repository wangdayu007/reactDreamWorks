import React, { useEffect, useState } from 'react'
import { Table,Button, notification } from 'antd'
import axios from 'axios'

export default function Audit(props) {
  const [dataSource,setdataSource] = useState([])
  const {roleId,region,username} = JSON.parse(localStorage.getItem('token'))
  const roleObj = {
    "1":'superadmin',
    '2':'admin',
    '3':'editor'
  }
  useEffect(()=>{
    axios.get(`/news?auditState=1&_expand=category`).then(res=>{
      const list = res.data
      setdataSource(roleObj[roleId]==='superadmin'?list:[
        ...list.filter(item=>item.author===username),
        ...list.filter(item=>item.region===region&&roleObj[item.roleId]==='editor')
      ])
    })
  },[roleId,region,username])

  const columns = [
    {
      title: 'Blog Title',
      dataIndex: 'title',
      render:(title,item)=> {
       return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
      },
    },{
      title: 'Author',
      dataIndex: 'author'
    },{
      title: 'Blog Type',
      dataIndex: 'category',
      render:(category)=> {
        return <div>{category.label}</div>
       },
    },{
      title: 'Operation',
      render:(item)=> {
        return <div>
          <Button type="primary" onClick={()=>handleAudit(item,2,1)}>pass</Button>
          <Button danger style={{marginLeft:'10px'}} onClick={()=>handleAudit(item,3,0)}>Reject</Button>
        </div>
       },
    }
  ];

  const handleAudit=(item,auditState,publishState)=>{
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.patch(`/news/${item.id}`,{
      auditState,
      publishState
    }).then(res=>{
      notification.info({
        message:'Notice',
        description:'you can check your Blog Audit State in Audit Manage/List',
        placement:'bottomRight'
      })
    })
  }
  return (
    <div>
       <Table dataSource={dataSource} columns={columns} 
      pagination={{pageSize:5}}/>
    </div>
  )
}
