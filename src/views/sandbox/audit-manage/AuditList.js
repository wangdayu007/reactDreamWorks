import React, { useEffect, useState } from 'react'
import { Table,Button,Tag, notification } from 'antd'
import axios from 'axios'

export default function AuditList(props) {
  const [dataSource,setdataSource] = useState([])
  const {username} = JSON.parse(localStorage.getItem('token'))
  useEffect(()=>{
    axios.get(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res=>{
      setdataSource(res.data)
    })
  },[username])

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
      title: 'Audit State',
      dataIndex: 'auditState',
      render:(auditState)=> {
        const colorList=['','orange','green','red']
        const auditList = ['draft','auditing','passed','not passed']
        return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
       },
    },{
      title: 'Operation',
      render:(item)=> {
        return <div>
          {
          item.auditState === 1&&<Button danger onClick={()=>handleRevert(item)}>revoke</Button>
          }
          {
          item.auditState === 2&&<Button onClick={()=>handlePublish(item)}>publish</Button>
          }
          {
          item.auditState === 3&&<Button type='primary' onClick={()=>handleUpdate(item)}>update</Button>
          }   
        </div>
       },
    }
  ];
  const handlePublish=(item)=>{
    axios.patch(`/news/${item.id}`,{
      'publishState':2,
      'publishTime':Date.now()
    }).then(res=>{
      props.history.push('/publish-manage/published')
      notification.info({
        message:'Notice',
        description:
        `you can check your Blog in Published Module`,
        placement:"bottomRight"
      })
    })
  }
  const handleUpdate=(item)=>{
    props.history.push(`/news-manage/update/${item.id}`)
  }
  const handleRevert = (item)=>{
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.patch(`/news/${item.id}`,{
      auditState:0
    }).then(res=>{
      notification.info({
        message:'Notice',
        description:'you can check your Blog in Drafts',
        placement:"bottomRight"
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
