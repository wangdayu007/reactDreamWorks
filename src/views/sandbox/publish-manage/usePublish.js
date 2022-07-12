import axios from 'axios'
import { useEffect, useState } from 'react'
import {notification} from 'antd'

function usePublish(type){
    const [dataSource,setdataSource] = useState([])
    const {username} = JSON.parse(localStorage.getItem('token'))
    useEffect(()=>{
      axios.get(`/news?author=${username}&publishState=${type}&_expand=category`).then(res=>{
        console.log('ggggggggggs',res.data)
        setdataSource(res.data)
      })
    },[username])

    const handlePublish=(id)=>{
      setdataSource(dataSource.filter(item=>item.id!==id))
      axios.patch(`/news/${id}`,{
        'publishState':2,
        'publishTime':Date.now()
      }).then(res=>{
        notification.info({
          message:'Notice',
          description:
          `you can check your Blog in Published Module`,
          placement:"bottomRight"
        })
      })
    }
    const handleDelete=(id)=>{
      setdataSource(dataSource.filter(item=>item.id!==id))
      axios.delete(`/news/${id}`).then(res=>{
        notification.info({
          message:'Notice',
          description:
          `you have deleted your Offline Blog`,
          placement:"bottomRight"
        })
      })
    }
    const handleSunset=(id)=>{
      setdataSource(dataSource.filter(item=>item.id!==id))
      axios.patch(`/news/${id}`,{
        'publishState':3
      }).then(res=>{
        notification.info({
          message:'Notice',
          description:
          `you can check your Blog in Offline Module`,
          placement:"bottomRight"
        })
      })
    }
      
    return {dataSource,handlePublish,handleDelete,handleSunset}
}

export default usePublish