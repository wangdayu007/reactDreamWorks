import React,{useState,useEffect} from 'react'
import {Table,Button,Modal,notification} from "antd"
import {
  DeleteOutlined, EditOutlined,ExclamationCircleOutlined,UploadOutlined
} from '@ant-design/icons';
import axios from 'axios'
const {confirm} =Modal

export default function NewsDraft(props) {
  const [dataSource,setdataSource] = useState([])
  const {username} = JSON.parse(localStorage.getItem('token'))

  useEffect(()=>{
    axios.get(`/news?author=${username}&auditState=0&_expand=category`).then(res=>{
      setdataSource(res.data)
    })
  },[username])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id)=> {
       return <b>{id}</b>
      },
    },{
      title: 'Blog title',
      dataIndex: 'title',
      render:(title,item)=>{
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
      }
    },{
      title: 'Author',
      dataIndex: 'author',
    },{
      title: 'Type',
      dataIndex: 'category',
      render:(category)=>{
        return category.label
      }
    },{
      title: 'Operation',
      render:(item)=> {
        return <div>
            <Button danger shape="circle" icon={<DeleteOutlined/>} 
            onClick={()=>confirmMethod(item)}></Button>
            <Button shape='circle' style={{marginLeft:'10px'}} 
            icon={<EditOutlined/>}
            onClick={()=>{props.history.push(`/news-manage/update/${item.id}`)}}></Button>
            <Button type="primary" 
            onClick={()=>{handleCheck(item.id)}}
            style={{marginLeft:'10px'}} shape="circle" icon={<UploadOutlined/>}>
            </Button>
        </div>
       },
    }
  ];
  const confirmMethod=(item)=>{
    confirm({
      title: 'Do you Want to delete this items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        // console.log('OK');
        deleteMethod(item)
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }

  const handleCheck=(id)=>{
    axios.patch(`/news/${id}`,{
      auditState:1
    }).then(res=>{
      props.history.push('/audit-manage/list')
      notification.info({
        message:'Notice',
        description:
        `you can see your Blog in Drafts or Review List`,
        placement:"bottomRight"
      })
    })
  }

  const deleteMethod = (item)=>{
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.delete(`/news/${item.id}`)
  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} 
      pagination={{pageSize:5}} rowKey={item=>item.id}/>
    </div>
  )
}
