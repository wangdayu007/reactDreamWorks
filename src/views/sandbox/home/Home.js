import React, { useEffect, useRef, useState } from "react";
import { Card, Row, Col, List, Avatar, Drawer } from "antd";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import axios from "axios";
import * as Echarts from "echarts";
import _ from "lodash";

const { Meta } = Card;
export default function Home() {
  const [viewList, setViewList] = useState([]);
  const [starList, setStarList] = useState([]);
  const [allList, setallList] = useState([]);
  const [visible, setvisible] = useState(false);
  const [pieChart,setpieChart] = useState(null)
  const pieRef = useRef();

  useEffect(() => {
    axios.get("/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6").then((res) => {
        setViewList(res.data);
    });
    axios.get("/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6").then((res) => {
        setStarList(res.data);
    });

    // axios.get("/news?publishState=2&_expand=category").then((res) => {
      // renderBarView(_.groupBy(res.data, (item) => item.category.title));
      // setallList(res.data)
    // });

    return () => {
      //组件销毁时，删除onresize事件
      window.onresize = null;
    };
  }, []);

  const renderPieView = ()=>{
    // var currentList = allList.filter(item=>item.author===username)
    var myChart;
    if(!pieChart){
      myChart = Echarts.init(pieRef.current)
      setpieChart(myChart)
    }else{
      myChart = pieChart
    }
    var pieOption = {
      backgroundColor: '#2c343c',
      title: {
        text: 'Customized Pie',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            { value: 335, name: 'Direct' },
            { value: 310, name: 'Email' },
            { value: 274, name: 'Union Ads' },
            { value: 235, name: 'Video Ads' },
            { value: 400, name: 'Search Engine' }
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(pieOption);
      window.onresize = () => {
        myChart.resize();
      };
  }

  const {region,username,role: { roleName },} = JSON.parse(localStorage.getItem("token"));

  return (
    <div>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Most Watched List" bordered={true}>
              <List
                bordered
                dataSource={viewList}
                renderItem={(item) => (
                  <List.Item>
                    <a href={`#/news-manage/preview/${item.id}`}>
                      {item.title}
                    </a>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Most Liked List" bordered={true}>
              <List
                bordered
                dataSource={starList}
                renderItem={(item) => (
                  <List.Item>
                    <a href={`#/news-manage/preview/${item.id}`}>
                      {item.title}
                    </a>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <SettingOutlined
                  key="setting"
                  onClick={() => {
                    setvisible(true)
                    setTimeout(()=>{
                      renderPieView()
                    },0)
                  }}
                />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={username}
                description={
                  <div>
                    <b style={{ marginRight: "10px" }}>
                      {region === "" ? "Global" : region}
                    </b>
                    <span>{roleName}</span>
                  </div>
                }
              />
            </Card>
          </Col>
        </Row>
        <Drawer title="My Blog Types" width="500px" placement="right" onClose={()=>{setvisible(false)}} visible={visible}>
          <div
          ref={pieRef}
          style={{ marginTop: "30px", width: "100%", height: "400px" }}
          ></div>
        </Drawer>
      </div>
    </div>
  );
}
