import React, { useEffect, useState } from 'react'
import { PageHeader, Descriptions } from 'antd';
import moment from 'moment';
import axios from 'axios';

export default function NewsPreview(props) {
  const [newsInfo,setnewsInfo] = useState(null)
  useEffect(()=>{
    axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`).then(res=>{
        setnewsInfo(res.data)
    })
  },[props.match.params.id])

  const auditList =['Not audited','To be audited','passed','Failed']
  const publishList =['Not published','To be published','published','Offline']
  const colorList = ['black','orange','green','red']
  return (
    <div>
        {
            newsInfo&&<div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title={newsInfo.title}
                    subTitle={newsInfo.category.label}
                    >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="creator">{newsInfo.author}</Descriptions.Item>
                        <Descriptions.Item label="creat time">{moment(newsInfo.createTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
                        <Descriptions.Item label="publish time">{
                            newsInfo.publishTime?moment(newsInfo.publishTime).format('YYYY-MM-DD HH:mm:ss'):'-'
                        }</Descriptions.Item>
                         <Descriptions.Item label="region">{newsInfo.region}</Descriptions.Item>
                        <Descriptions.Item label="audit state"><span style={{color:colorList[newsInfo.auditState]}}>{auditList[newsInfo.auditState]}</span></Descriptions.Item>
                        <Descriptions.Item label="publish state"><span style={{color:colorList[publishList.publishState]}}>{publishList[newsInfo.publishState]}</span></Descriptions.Item>
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
