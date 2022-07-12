import React,{useState,useEffect,useRef} from 'react'
import {Table,Button,Modal,Switch} from "antd"
import {
  DeleteOutlined, EditOutlined,ExclamationCircleOutlined
} from '@ant-design/icons';
import axios from 'axios'
import UserForm from '../../../components/user-manage/UserForm';
const {confirm} = Modal

export default function UserList() {
  const [dataSource,setdataSource] = useState([])
  const [roleList,setroleList] = useState([])
  const [regionList,setregionList] = useState([])
  const [isAddVisible,setisAddVisible] = useState(false)
  const [isUpdateVisible,setisUpdateVisible] = useState(false)
  const [isUpdateDisabled,setisUpdateDisabled] = useState(false)
  const [currentData,setcurrentData] = useState(null)
  const addForm = useRef(null)
  const updateForm = useRef(null)

  const {roleId,region,username} = JSON.parse(localStorage.getItem('token'))
  const roleObj = {
    "1":'superadmin',
    '2':'admin',
    '3':'editor'
  }
  useEffect(()=>{
    axios.get('/users?_expand=role').then(res=>{
      const list = res.data
      setdataSource(roleObj[roleId]==='superadmin'?list:[
        ...list.filter(item=>item.username===username),
        ...list.filter(item=>item.region===region&&roleObj[item.roleId]==='editor')
      ])
    })
  },[])

  useEffect(()=>{
    axios.get('/regions').then(res=>{
      setregionList(res.data)
    })
  },[])

  useEffect(()=>{
    axios.get('/roles').then(res=>{
      setroleList(res.data)
    })
  },[roleId,region,username])


  const columns = [
    {
      title: 'area',
      dataIndex: 'region',
      filters:[
        ...regionList.map(item=>({
          text:item.label,
          value:item.value
        })),
        {
          text:'global',
          value:'global'
        }
      ],
      onFilter:(value,item)=>{
        if(value==='global'){
          return item.region===""
        }
        return item.region===value
      },
      render:(region)=> {
       return <b>{region===""?'global':region}</b>
      },
    },{
      title: 'Role Name',
      dataIndex: 'role',
      render:(role)=>{
        return role?.roleName
      }
    },{
      title: 'UserName',
      dataIndex: 'username',
    },{
      title: 'User Status',
      dataIndex: 'roleState',
      render:(roleState,item)=>{
        return <Switch onChange={()=>handleChange(item)} checked={roleState} disabled={item.default}></Switch>
      }
    },{
      title: 'Operation',
      render:(item)=> {
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined/>} 
          onClick={()=>confirmMethod(item)} disabled={item.default}>
          </Button>
            
            <Button type="primary" style={{marginLeft:'10px'}} shape="circle" icon={<EditOutlined/>}
            disabled={item.default} onClick={()=>handleUpdate(item)}>
            </Button>
        </div>
       },
    }
  ]

  const handleUpdate = (item)=>{
    setisUpdateVisible(true)
    setTimeout(()=>{
      if(item.roleId===1){
        setisUpdateDisabled(true)
      }else{
        setisUpdateDisabled(false)
      }
      updateForm.current?.setFieldsValue(item)
    },0)
    setcurrentData(item)
  }
  const updateFormOk=()=>{
    updateForm.current.validateFields().then(value=>{
      updateForm.current.resetFields()
      setisUpdateVisible(false)
      setdataSource(dataSource.map(item=>{
        if(item.id===currentData.id){
          return{
            ...item,
            ...value,
            role:roleList.filter(data=>data.id===value.roleId)[0]
          }
        }
        return item
      }))
      setisUpdateDisabled(!isUpdateDisabled)
      axios.patch(`/users/${currentData.id}`,
        value)
    })
  }

  const handleChange = (item)=>{
    setdataSource([...dataSource])
    axios.patch(`/user/${item.id}`,{
      roleState:item.roleState
    })
  }

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
    })
  }

  const deleteMethod = (item)=>{
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.delete(`/users/${item.id}`)
  }
  const addFormOk=()=>{
    addForm.current.validateFields().then(value=>{
      setisAddVisible(false)
      addForm.current.resetFields()
      axios.post('/users',{
        ...value,
        "roleState":true,
        "default":false
      }).then(res=>{
        console.log(res.data)
        setdataSource([...dataSource,{
          ...res.data,
          role:roleList.filter(item=>item.id===value.roleId)[0]
        }])
      })
    }).catch(e=>{
      console.log(e)
    })
  }

  return (
    <div>
      <Button type='primary' onClick={()=>{setisAddVisible(true)}}>添加用户</Button>
      <Table dataSource={dataSource} columns={columns} 
      pagination={{pageSize:5}} rowKey={item=>item.id}/>
      <Modal
      visible={isAddVisible}
      title="Add Role"
      okText="Create"
      cancelText="Cancel"
      onCancel={()=>{
        setisAddVisible(false)
      }}
      onOk={() => addFormOk()}
    >
      <UserForm ref={addForm} regionList={regionList} roleList={roleList}></UserForm>
    </Modal>

    <Modal
      visible={isUpdateVisible}
      title="Update Role"
      okText="Create"
      cancelText="Cancel"
      onCancel={()=>{
        setisUpdateVisible(false)
        setisUpdateDisabled(!isUpdateDisabled)
      }}
      onOk={() => updateFormOk()}
    >
      <UserForm ref={updateForm} regionList={regionList} 
      roleList={roleList} isUpdateDisabled={isUpdateDisabled} isUpdate={true}></UserForm>
    </Modal>
    </div>
  )
}
