import React, { useEffect, useState, useRef } from "react";
// import { useEffect, useState } from "react";
import { Button, Col, Pagination, Row } from "antd";
import { Card, List, Image } from "antd";
import ReactPaginate from "react-paginate";
// import {envApi} from './api'
import { productApi } from "./api";
// axios call api
import axios from "axios";
function product() {
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState([]);
  const pageSize = 8;
  useEffect(() => {
    callapi();
  }, []);

  const callapi = () => {
    const data = axios
      .get(productApi)
      .then((res) => {
        console.log(res.data);
        setData(res.data.content);
      })
      .catch((err) => console.log(err));

    return () => data;
  };

  // Hàm này sẽ được gọi khi người dùng thay đổi trang
  const handlePageChange = (pageNumber) => {
    setCurrent(pageNumber);
  };

  return (
    <div>
     
      <Row>
        
        <Col span={20} offset={2}>
        <List
        itemLayout="horizontal"
        dataSource={data.slice((current - 1) * pageSize, current * pageSize)}
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 4 }}
        renderItem={(item) => (
          <Row style={{paddingBottom:'10%'}}>
            <Col span={20}>
            <Row justify="center">
              <Image className="image-css" src={item.imageUrl} />
              </Row>
            </Col>
            <Col span={20}>
            <Row justify="center">
              <h4 className="h3-css" align="center">
                {item.name}
              </h4>
              </Row>
            </Col>
            <Col span={20}>
            <Row justify="center">
              <h5>Giá: {item.priceM}</h5>
              </Row>
            </Col>
          
          </Row>
          
        )}
      />
      <Row justify="center">
        <Pagination
          current={current}
          onChange={handlePageChange}
          pageSize={pageSize}
          total={data.length}
        />
      </Row>
        
        </Col>


      </Row>
      
    </div>
  );
}
export default product;
