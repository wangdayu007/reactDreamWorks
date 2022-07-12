import React,{useState,useEffect} from 'react'
import {Table,Tag,Button,Modal,Popover,Switch} from "antd"
import {
  DeleteOutlined, EditOutlined,ExclamationCircleOutlined
} from '@ant-design/icons';
import axios from 'axios'
const {confirm} =Modal

export default function RightList() {
  const [dataSource,setdataSource] = useState([])

  useEffect(()=>{
    axios.get('/rights?_embed=children').then(res=>{
      const list = res.data
      list.forEach(item=>{
        if(item.children.length===0){
          item.children=""
        } 
      })
      setdataSource(list)
    })
  },[])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id)=> {
       return <b>{id}</b>
      },
    },{
      title: 'Permission Name',
      dataIndex: 'label'
    },{
      title: 'Permission Path',
      dataIndex: 'key',
      render:(key)=> {
        return <Tag color="orange">{key}</Tag>
       },
    },{
      title: 'Operation',
      render:(item)=> {
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined/>} 
          onClick={()=>confirmMethod(item)}></Button>
          <Popover content={<div style={{textAlign:'center'}}>
            <Switch checked={item.pagepermisson} onChange={()=>switchMethod(item)}></Switch>
            </div>} title="document Config" trigger={item.pagepermisson===undefined?'':'click'}>
            <Button type="primary" style={{marginLeft:'10px'}} shape="circle" icon={<EditOutlined/>}
            disabled={item.pagepermisson===undefined}>
            </Button>
          </Popover>
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

  const deleteMethod = (item)=>{
    console.log(item)
    if(item.grade===1){
      setdataSource(dataSource.filter(data=>data.id!==item.id))
      axios.delete(`/rights/${item.id}`)
    }else{
      let list = dataSource.filter(data=>data.id===item.rightId)
      list[0].children = list[0].children.filter(data=>data.id!==item.id)
      setdataSource([...dataSource])
      axios.delete(`/children/${item.id}`)
    }
  }
  const switchMethod = (item)=>{
    item.pagepermisson = item.pagepermisson===1?0:1
    setdataSource([...dataSource])
    if(item.grade===1){
      axios.patch(`/rights/${item.id}`,{
        pagepermisson:item.pagepermisson
      })
    }else{
      axios.patch(`/children/${item.id}`,{
        pagepermisson:item.pagepermisson
      })
    }
  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} 
      pagination={{pageSize:5}}/>
    </div>
  )
}
