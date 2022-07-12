import React, { useEffect, useState } from 'react'
import { PageHeader, Descriptions } from 'antd';
import moment from 'moment';
import axios from 'axios';
import {HeartTwoTone} from '@ant-design/icons'

export default function Details(props) {
  const [newsInfo,setnewsInfo] = useState(null)
  useEffect(()=>{
    axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`).then(res=>{
        setnewsInfo({
          ...res.data,
          view:res.data.view+1
        })
        return res.data
    }).then(res=>{
      axios.patch(`/news/${props.match.params.id}`,{
        view:res.view+1
      })
    })
  },[props.match.params.id])

  const handleStar = ()=>{
    setnewsInfo({
      ...newsInfo,
      star:newsInfo.star+1
    })
    axios.patch(`/news/${props.match.params.id}`,{
      star:newsInfo.star+1
    })
  }
  return (
    <div>
        {
            newsInfo&&<div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title={newsInfo.title}
                    subTitle={<div>
                      {newsInfo.category.label}
                      <HeartTwoTone twoToneColor="#eb2f96" style={{marginLeft:'10px',cursor:'pointer'}} onClick={()=>handleStar()}></HeartTwoTone>
                    </div>}
                    >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="creator">{newsInfo.author}</Descriptions.Item>
                        <Descriptions.Item label="creat time">{moment(newsInfo.createTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
                        <Descriptions.Item label="region">{newsInfo.region}</Descriptions.Item>
                        <Descriptions.Item label="number of visits">{newsInfo.view}</Descriptions.Item>
                        <Descriptions.Item label="number of likes">{newsInfo.star}</Descriptions.Item>
                        <Descriptions.Item label="number of comments">0</Descriptions.Item>
                    </Descriptions>
                </PageHeader>
 
                <div dangerouslySetInnerHTML={{
                    __html:newsInfo.content
                }} style={{border:'1px solid #dcdcdc',margin:'0 24px'}}>
                </div>
            </div>
        }
    </div>
  )
}
