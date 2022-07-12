import React, { useRef, useState } from 'react'
import ClientHeader from '../../../components/client-header'
import project from './Project.module.css'
import Icon, { HomeOutlined,AntCloudOutlined,RedditOutlined,SketchOutlined } from '@ant-design/icons';

export default function Project() {
  
  const [currentMenu,setcurrentMenu] = useState(1)
  const flatRef = useRef(null)
  const handleMenu = (index)=>{
    setcurrentMenu(index)
    flatRef.current.style.left =60 + (index-1)*100 + 'px'
  }


  return (
    <div className={project.wrap}>
        <ClientHeader></ClientHeader>
        <div className={project.proContainer}>
            <ul className={project.nav}>
                <span className={project.btn} ref={flatRef}></span>
                <li>
                    <a className={currentMenu===1?project.aActive:''} onClick={()=>handleMenu(1)}>
                        <Icon component={HomeOutlined} style={{fontSize:'30px'}}/>
                        <span className={project.title}>UI/UX</span>
                    </a>
                </li>
                <li>
                    <a className={currentMenu===2?project.aActive:''} onClick={()=>handleMenu(2)}>
                    <Icon component={AntCloudOutlined} style={{fontSize:'30px'}}/>
                        <span className={project.title}>Systems</span>
                    </a>
                </li>
                <li>
                    <a className={currentMenu===3?project.aActive:''} onClick={()=>handleMenu(3)}>
                    <Icon component={RedditOutlined} style={{fontSize:'30px'}}/>
                        <span className={project.title}>JSGames</span>
                    </a>
                </li>
                <li>
                    <a className={currentMenu===4?project.aActive:''} onClick={()=>handleMenu(4)}>
                    <Icon component={SketchOutlined} style={{fontSize:'30px'}}/>
                        <span className={project.title}>ThreeJS</span>
                    </a>
                </li>
            </ul>
            {/* 毛玻璃css效果 */}
            <div className={project.groundGlass}>

            </div>
        </div>
    </div>
  )
}
