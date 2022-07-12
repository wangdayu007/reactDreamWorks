import React from 'react'
import ClientHeader from '../../../components/client-header'
import './Blog.css'
import demon from '../../../assets/demo.png'
import canoe from '../../../assets/canoe.png'
import dragon from '../../../assets/dragon.png'
import wizard from '../../../assets/wizard.png'
import fireDragon from '../../../assets/fireDragon.png'
import goblin from '../../../assets/goblin.png'
import Tilt from 'react-parallax-tilt'

const BlogList = [
  {id:1,img:demon,type:'LEVEL 5',title:'The Giant',
  content:'Slow,fjdslfafdhn,dalfjdsakljfds,afdsmafjdisajfkdsmaf,dsafjkdlsjafkdmsafmd,safdsflsajfkdsjafjdslajfkldjfklsa',
  view:2,liked:12,share:13
  },{id:2,img:canoe,type:'LEVEL 4',title:'The Canoe',
  content:'Slow,fjdslfafdhn,dalfjdsakljfds,afdsmafjdisajfkdsmaf,dsafjkdlsjafkdmsafmd,safdsflsajfkdsjafjdslajfkldjfklsa',
  view:2,liked:12,share:13
  },{id:3,img:dragon,type:'LEVEL 3',title:'The Dragon',
  content:'Slow,fjdslfafdhn,dalfjdsakljfds,afdsmafjdisajfkdsmaf,dsafjkdlsjafkdmsafmd,safdsflsajfkdsjafjdslajfkldjfklsa',
  view:2,liked:12,share:13
  },{id:4,img:wizard,type:'LEVEL 3',title:'The Wizard',
  content:'Slow,fjdslfafdhn,dalfjdsakljfds,afdsmafjdisajfkdsmaf,dsafjkdlsjafkdmsafmd,safdsflsajfkdsjafjdslajfkldjfklsa',
  view:2,liked:12,share:13
  },{id:5,img:fireDragon,type:'LEVEL 3',title:'The FireDragon',
  content:'Slow,fjdslfafdhn,dalfjdsakljfds,afdsmafjdisajfkdsmaf,dsafjkdlsjafkdmsafmd,safdsflsajfkdsjafjdslajfkldjfklsa',
  view:2,liked:12,share:13
  },{id:6,img:goblin,type:'LEVEL 3',title:'The Goblin',
  content:'Slow,fjdslfafdhn,dalfjdsakljfds,afdsmafjdisajfkdsmaf,dsafjkdlsjafkdmsafmd,safdsflsajfkdsjafjdslajfkldjfklsa',
  view:2,liked:12,share:13
  }
]

export default function Blog() {
  return (
    <div className='blog_wrap'>
    <ClientHeader></ClientHeader>
      <div className='blog_container'>
          {
            BlogList.map(item=>{
              return <Tilt key={item.id}>
              <div className='card-item'>
                <div className='role'>
                  <img style={{width:'300px',height:'300px'}} src={item.img} alt='demo'/>
                </div>
                <div className='des'>
                  <h6>{item.type}</h6>
                  <h2>{item.title}</h2>
                  <p>
                    {item.content}<span style={{color:'#9370DB',cursor:'pointer'}}>...Read More</span>
                  </p>
                </div>
                <div className='btn-list'>
                  <div className='btn'><h3>{item.view}</h3><span>VIEW</span></div>
                  <div className='btn'><h3>{item.liked}</h3><span>LIKE</span></div>
                  <div className='btn'><h3>{item.share}</h3><span>SHARE</span></div>
                </div>
              </div>
            </Tilt>
            })
          }
      </div>
    </div>
  )
}
