import React from 'react'
import { Button } from 'antd'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from './usePublish'

export default function Unpublished() {
  const {dataSource,handlePublish} = usePublish(1)
  return (
    <div>
      <NewsPublish 
      dataSource={dataSource} 
      button={(id)=><Button type='primary' onClick={()=>handlePublish(id)}>Publish</Button>}>
      </NewsPublish>
    </div>
  )
}
