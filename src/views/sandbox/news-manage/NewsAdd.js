import React, { useEffect, useState,useRef } from 'react'
import {Button, PageHeader,Steps,Form,Input,Select, message, notification } from 'antd'
import style from './News.module.css'
import axios from 'axios';
import NewsEditor from '../../../components/news-manage/NewsEditor';
const {Option} = Select

const { Step } = Steps;

export default function NewsAdd(props) {
  const [current,setCurrent] = useState(0)
  const [categoryList,setcategoryList] = useState([])
  const [fromInfo,setfromInfo] = useState({})
  const [content,setContent] = useState("")
  const user = JSON.parse(localStorage.getItem('token'))


  useEffect(()=>{
    axios.get(`/categories`).then(res=>{
      setcategoryList(res.data)
    })
  },[])

  const NewsForm = useRef(null)

  const handleNext=()=>{
    if(current===0){
      NewsForm.current.validateFields().then(res=>{
        setfromInfo(res)
        setCurrent(current+1)
      }).catch(err=>{
        console.log(err)
      })
    }else{
      if(content==="" || content.trim()==="<p></p>"){
        message.error("Blog content shouldn't be null!")
      }else{
        setCurrent(current+1)
      }
    }
  }

  const handlePrevious=()=>{
    setCurrent(current-1)
  }
  const handleSave=(auditState)=>{
    axios.post('/news',{
      ...fromInfo,
      "content":content,
      "region":user.region?user.region:'global',
      "author":user.username,
      'roleId':user.roleId,
      'auditState':auditState,
      'publishState':0,
      'createTime':Date.now(),
      'star':0,
      'view':0,
      // 'publishTime':0
    }).then(res=>{
      props.history.push(auditState===0?'/news-manage/draft':'/audit-manage/list')
      notification.info({
        message:'Notice',
        description:
        `you can see your Blog in Drafts or Review List`,
        placement:"bottomRight"
      })
    })
  }
  return (
    <div>
      <PageHeader
          className="site-page-header"
          title="create a Blog"
          subTitle="Blog/Life/Games"
      />

      <Steps current={current}>
          <Step title="Basic info" description="Blog title,Blog type." />
          <Step title="Blog content" description="Blog main content" />
          <Step title="Waiting" description="waiting for publishing." />
      </Steps>
 
      <div style={{marginTop:'50px'}}>
        <div className={current===0?'':style.active}>
        <Form
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          ref={NewsForm}
        >
          <Form.Item
            label="Blog title"
            name="title"
            rules={[{ required: true, message: 'Please input title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Blog type"
            name="categoryId"
            rules={[{ required: true, message: 'Please select type!' }]}
          >
            <Select>
              {
                categoryList.map(item=>{
                  return <Option value={item.id} key={item.id}>{item.label}</Option>
                })
              }
            </Select>
          </Form.Item>
        </Form>
        </div>
        <div className={current===1?'':style.active}>
          <NewsEditor getContent={(value)=>{
            setContent(value)
          }}></NewsEditor>
        </div>
        <div className={current===2?'':style.active}>
        </div>
      </div>


      <div style={{marginTop:'50px'}}>
        {
          current===2 && 
          <span>
            <Button type='primary' onClick={()=>handleSave(0)}>Save to draft</Button>
            <Button danger onClick={()=>handleSave(1)}>Submit for review</Button>
          </span>
        }
        {
          current<2 && 
          <Button type='primary' onClick={handleNext}>
            Next step
          </Button>
        }
        {
          current>0 && <Button onClick={handlePrevious}>
            Last step
            </Button>
        }
      </div>
    </div>
  )
}
