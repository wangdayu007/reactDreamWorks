import { Button } from 'antd'
import React from 'react'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from './usePublish'

export default function Sunset() {
  const {dataSource,handleDelete} = usePublish(3)
  return (
    <div>
      <NewsPublish 
      dataSource={dataSource} 
      button={(id)=><Button danger onClick={()=>handleDelete(id)}>Delete</Button>}>
      </NewsPublish>
    </div>
  )
}
