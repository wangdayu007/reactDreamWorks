import { Table,Button,Modal,Tree } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  DeleteOutlined, EditOutlined,ExclamationCircleOutlined
} from '@ant-design/icons';
const {confirm} =Modal

export default function RoleList() {
  const [dataSource,setdataSource] = useState([])
  const [rightList,setrightList] = useState([])
  const [currentRight,setcurrentRight] = useState([])
  const [currentId,setcurrentId] = useState([])
  const [isModalVisible,setisModalVisible] = useState(false)
  const columns=[
    {
      title:'ID',
      dataIndex:'id',
      render:(id)=>{
        return <b>{id}</b>
      }
    },
    {
      title:'Role Name',
      dataIndex:'roleName',
      render:(roleName)=>{
        return <b>{roleName}</b>
      }
    },{
      title: 'Operation',
      render:(item)=> {
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined/>} 
          onClick={()=>confirmMethod(item)}></Button>
            <Button type="primary" style={{marginLeft:'10px'}} 
            shape="circle" 
            icon={<EditOutlined/>} onClick={()=>{
              setcurrentRight(item.rights)
              setisModalVisible(true)
              setcurrentId(item.id)
            }
            }> 
            </Button>
        </div>
       },
    }
  ]
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
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.delete(`/roles/${item.id}`)
  }

  useEffect(()=>{
    axios.get("/roles").then(res=>{
      setdataSource(res.data)
    })
  },[])

  useEffect(()=>{
    axios.get("/rights?_embed=children").then(res=>{
      setrightList(res.data)
    })
  },[])

  const handleOk = ()=>{
    setisModalVisible(false)
    setdataSource(dataSource.map(item=>{
      if(item.id===currentId){
        return {
          ...item,
          rights:currentRight
        }
      }
      return item
    }))
    axios.patch(`/roles/${currentId}`,{
      rights:currentRight
    })
  }

  const handleCancel = ()=>{
    setisModalVisible(false)
  }
  const onCheck = (checkedKeys)=>{
    setcurrentRight(checkedKeys.checked)
  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns}
      rowKey={(item)=>item.id}></Table>

      <Modal title="Permission Distribution" visible={isModalVisible}
        onOk={handleOk} 
        onCancel={handleCancel}>
        <Tree
              fieldNames={{title:'label'}}
              checkable
              checkedKeys={currentRight}
              onCheck={onCheck}
              checkStrictly={true}
              treeData={rightList}
            />
      </Modal>
    </div>
  )
}
