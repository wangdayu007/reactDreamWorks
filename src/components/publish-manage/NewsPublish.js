import React from 'react'
import {Table} from "antd"

export default function NewsPublish(props) {

  const columns = [
    {
      title: 'Blog Title',
      dataIndex: 'title',
      render:(title,item)=> {
       return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
      },
    },{
      title: 'Author',
      dataIndex: 'author'
    },{
      title: 'Blog Type',
      dataIndex: 'category',
      render:(category)=> {
        return <div>{category.label}</div>
       },
    },{
      title: 'Operation',
      render:(item)=> {
        return <div>
          {props.button(item.id)}
        </div>
       },
    }
  ];

  return (
    <div>
      <Table dataSource={props.dataSource} columns={columns} 
      pagination={{pageSize:5}} rowKey={item=>item.id}/>
    </div>
  )
}
