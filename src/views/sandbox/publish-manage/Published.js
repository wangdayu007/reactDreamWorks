import React from 'react'
import { Button } from 'antd'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from './usePublish'

export default function Published() {

  const {dataSource,handleSunset} = usePublish(2)

  return (
    <div>
      <NewsPublish 
      dataSource={dataSource} 
      button={(id)=><Button danger onClick={()=>handleSunset(id)}>Offline</Button>}></NewsPublish>
    </div>
  )
}
