import React, { forwardRef,useState,useEffect } from 'react'
import {Form,Input,Select} from "antd"
const {Option} = Select

const UserForm = forwardRef((props,ref)=> {
  const [isDisabled,setisDisabled] = useState(false) 
  useEffect(()=>{
    setisDisabled(props.isUpdateDisabled) 
  },[props.isUpdateDisabled])
  const {roleId,region} = JSON.parse(localStorage.getItem('token'))
  const roleObj = {
    "1":'superadmin',
    '2':'admin',
    '3':'editor'
  }
  const checkRegionDisabled = (item)=>{
    if(props.isUpdate){
      //如果更新
      if(roleObj[roleId]==='superadmin'){
        return false
      }else{
        return true
      }
    }else{
      //如果创建
      if(roleObj[roleId]==='superadmin'){
        return false
      }else{
        return  item.value!==region
      }
    }
  }

  const checkRoleDisabled = (item)=>{
    if(props.isUpdate){
      //如果更新
      if(roleObj[roleId]==='superadmin'){
        return false
      }else{
        return true
      }
    }else{
      //如果创建
      if(roleObj[roleId]==='superadmin'){
        return false
      }else{
        return  item.id!==3
      }
    }
  }

  return (
    <Form
    ref={ref}
    layout="vertical"
  >
    <Form.Item
      name="username"
      label="username"
      rules={[{ required: true, message: 'Please input the username!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="password"
      label="password"
      rules={[{ required: true, message: 'Please input the password!' }]}
    >
      <Input />
    </Form.Item> 
    <Form.Item
      name="region"
      label="region"
      rules={isDisabled?[]:[{ required: true, message: 'Please input the role!' }]}
    >
      <Select disabled={isDisabled}>
        {
          props.regionList.map(item=>{
            return <Option value={item.value} key={item.id} disabled={checkRegionDisabled(item)}>
              {item.title}
            </Option>
          })
        }
      </Select>
    </Form.Item>
    <Form.Item
      name="roleId"
      label="role"
      rules={[{ required: true, message: 'Please input the role!' }]}
    >
        <Select onChange={(value)=>{
            if(value===1){
                setisDisabled(true)
                ref.current.setFieldsValue({
                    region:""
                })
            }else{
                setisDisabled(false)
            }
        }}>
        {
          props.roleList.map(item=>{
            return <Option value={item.id} key={item.id} disabled={checkRoleDisabled(item)}>
              {item.roleName}
            </Option>
          })
        }
      </Select>
    </Form.Item>
  </Form>
  )
})

export default UserForm;
