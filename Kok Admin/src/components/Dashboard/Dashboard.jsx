import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Table, Button, message, Typography } from "antd";
import axios from "axios";
import styled from "styled-components";
import TopSellers from "./Top sellers-Picks/TopSellers";
import TopPicks from "./Top sellers-Picks/TopPicks";
import Orders from "../../assets/Svg/Deashbord/Orders.jpg";
import Shipped from "../../assets/Svg/Deashbord/Shipped.svg";
import Inprocess from "../../assets/Svg/Deashbord/Inprocess.png";
import Delivered from "../../assets/Svg/Deashbord/Delivered.svg";
import "./Dashboard.css";

const { TabPane } = Tabs;
const { Column } = Table;
const { Title } = Typography;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #36304a;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  const [ordersCount, setOrdersCount] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [activeTabKey, setActiveTabKey] = useState("All");
  const [selectedStatusId, setSelectedStatusId] = useState(0);

  const inProcessStatus = orderStatus && orderStatus[0];
  const shippingStatus = orderStatus && orderStatus[1];
  const deliveredStatus = orderStatus && orderStatus[2];

  const handleOrderClick = (order_id) => {
    navigate("/viewOrders", { state: { order_id } });
  };

  const handleStatusClick = (status_id) => {
    setSelectedStatusId(status_id);
    fetchDataOrderData(status_id, activeTabKey);
  };

  const fetchDataOrderData = async (status_id, key) => {
    try {
      const status = { status_id: status_id, filter: key };
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/dashboarddetails`,
        status,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      setState(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching data.");
    }
  };

  const fetchDataOrderStatusFill = async () => {
    try {
      const status = { status_id: 0 };
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/orderStatusFill`,
        status,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      setOrderStatus(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching data.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/getordercount`,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      setOrdersCount(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching data.");
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataOrderData(selectedStatusId, activeTabKey);
    fetchDataOrderStatusFill();
  }, [activeTabKey, selectedStatusId]);

  const handleTabChange = (key) => {
    console.log("Active Tab Key:", key);
    setActiveTabKey(key);
  };

  return (
    <div>
      <div className="container" key={ordersCount}>
        <div className="box" onClick={() => handleStatusClick(0)}>
          <div className="orderSummary">
            <img src={Orders} alt="Orders" height={50} />
            <div className="orderSummary_SubText">
              <p className="text1">Orders</p>
              <p className="text2">{ordersCount?.ALL_ORDERS}</p>
            </div>
          </div>
        </div>
        <div
          className="box"
          key={inProcessStatus?.status_id}
          onClick={() => handleStatusClick(inProcessStatus?.status_id)}
        >
          <div className="orderSummary">
            <img src={Inprocess} alt="Inprocess" height={50} />
            <div className="orderSummary_SubText">
              <p className="text1">{inProcessStatus?.status_name}</p>
              <p className="text2">{ordersCount.ALL_INPROCESS}</p>
            </div>
          </div>
        </div>
        <div
          className="box"
          key={shippingStatus?.status_id}
          onClick={() => handleStatusClick(shippingStatus?.status_id)}
        >
          <div className="orderSummary">
            <img src={Shipped} alt="Shipped" height={80} />
            <div className="orderSummary_SubText">
              <p className="text1">{shippingStatus?.status_name}</p>
              <p className="text2">{ordersCount.ALL_ORDERS}</p>
            </div>
          </div>
        </div>
        <div
          className="box"
          key={deliveredStatus?.status_id}
          onClick={() => handleStatusClick(deliveredStatus?.status_id)}
        >
          <div className="orderSummary">
            <img src={Delivered} alt="Delivered" height={50} />
            <div className="orderSummary_SubText">
              <p className="text1">{deliveredStatus?.status_name}</p>
              <p className="text2">{ordersCount.ALL_SHIPPING}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="Top_Sellers">
        <Title level={2}> Top sellers</Title>
        <Tabs defaultActiveKey="" size="large" onChange={handleTabChange}>
          <TabPane tab="All" key="">
            <StyledTable dataSource={state}>
              <Column
                title="Order ID"
                dataIndex="order_id"
                render={(text, record) => (
                  <span
                    style={{ cursor: "pointer", color: "#1890ff" }}
                    onClick={() => handleOrderClick(record.order_id)}
                  >
                    {record.order_id}
                  </span>
                )}
              />
              <Column
                title="First Name"
                dataIndex="userName"
                key="userName"
                render={(text, record) => (
                  <span>{record.userName.user_first_name}</span>
                )}
              />
              <Column
                title="Last Name"
                dataIndex="userName"
                key="userName"
                render={(text, record) => (
                  <span>{record.userName.user_last_name}</span>
                )}
              />
              <Column
                title="Status Name"
                dataIndex="status_name"
                render={(text, record) => (
                  <span>{record.orderStatusName.status_name}</span>
                )}
              />
              <Column
                title="Order Total "
                dataIndex="order_total"
                key="order_total"
              />
              <Column
                title="Payment Type "
                dataIndex="payment_type"
                key="payment_type"
              />
            </StyledTable>
          </TabPane>
          <TabPane tab="Today" key="day">
            <StyledTable dataSource={state}>
              <Column
                title="Order ID"
                dataIndex="order_id"
                render={(text, record) => (
                  <span
                    style={{ cursor: "pointer", color: "#1890ff" }}
                    onClick={() => handleOrderClick(record.order_id)}
                  >
                    {record.order_id}
                  </span>
                )}
              />
              <Column
                title="First Name"
                dataIndex="userName"
                key="userName"
                render={(text, record) => (
                  <span>{record.userName.user_first_name}</span>
                )}
              />
              <Column
                title="Last Name"
                dataIndex="userName"
                key="userName"
                render={(text, record) => (
                  <span>{record.userName.user_last_name}</span>
                )}
              />
              <Column
                title="Status Name"
                dataIndex="status_name"
                render={(text, record) => (
                  <span>{record.orderStatusName.status_name}</span>
                )}
              />
              <Column
                title="Order Total "
                dataIndex="order_total"
                key="order_total"
              />
              <Column
                title="Payment Type "
                dataIndex="payment_type"
                key="payment_type"
              />
            </StyledTable>
          </TabPane>
          <TabPane tab="Week days" key="week">
            <StyledTable dataSource={state}>
              <Column
                title="Order ID"
                dataIndex="order_id"
                render={(text, record) => (
                  <span
                    style={{ cursor: "pointer", color: "#1890ff" }}
                    onClick={() => handleOrderClick(record.order_id)}
                  >
                    {record.order_id}
                  </span>
                )}
              />
              <Column
                title="First Name"
                dataIndex="userName"
                key="userName"
                render={(text, record) => (
                  <span>{record.userName.user_first_name}</span>
                )}
              />
              <Column
                title="Last Name"
                dataIndex="userName"
                key="userName"
                render={(text, record) => (
                  <span>{record.userName.user_last_name}</span>
                )}
              />
              <Column
                title="Status Name"
                dataIndex="status_name"
                render={(text, record) => (
                  <span>{record.orderStatusName.status_name}</span>
                )}
              />
              <Column
                title="Order Total "
                dataIndex="order_total"
                key="order_total"
              />
              <Column
                title="Payment Type "
                dataIndex="payment_type"
                key="payment_type"
              />
            </StyledTable>
          </TabPane>
          <TabPane tab="Months" key="month">
            <StyledTable dataSource={state}>
              <Column
                title="Order ID"
                dataIndex="order_id"
                render={(text, record) => (
                  <span
                    style={{ cursor: "pointer", color: "#1890ff" }}
                    onClick={() => handleOrderClick(record.order_id)}
                  >
                    {record.order_id}
                  </span>
                )}
              />
              <Column
                title="First Name"
                dataIndex="userName"
                key="userName"
                render={(text, record) => (
                  <span>{record.userName.user_first_name}</span>
                )}
              />
              <Column
                title="Last Name"
                dataIndex="userName"
                key="userName"
                render={(text, record) => (
                  <span>{record.userName.user_last_name}</span>
                )}
              />
              <Column
                title="Status Name"
                dataIndex="status_name"
                render={(text, record) => (
                  <span>{record.orderStatusName.status_name}</span>
                )}
              />
              <Column
                title="Order Total "
                dataIndex="order_total"
                key="order_total"
              />
              <Column
                title="Payment Type "
                dataIndex="payment_type"
                key="payment_type"
              />
            </StyledTable>
          </TabPane>
          <TabPane tab="Years" key="year">
            <StyledTable dataSource={state}>
              <Column
                title="Order ID"
                dataIndex="order_id"
                render={(text, record) => (
                  <span
                    style={{ cursor: "pointer", color: "#1890ff" }}
                    onClick={() => handleOrderClick(record.order_id)}
                  >
                    {record.order_id}
                  </span>
                )}
              />
              <Column
                title="First Name"
                dataIndex="userName"
                key="userName"
                render={(text, record) => (
                  <span>{record.userName.user_first_name}</span>
                )}
              />
              <Column
                title="Last Name"
                dataIndex="userName"
                key="userName"
                render={(text, record) => (
                  <span>{record.userName.user_last_name}</span>
                )}
              />
              <Column
                title="Status Name"
                dataIndex="status_name"
                render={(text, record) => (
                  <span>{record.orderStatusName.status_name}</span>
                )}
              />
              <Column
                title="Order Total "
                dataIndex="order_total"
                key="order_total"
              />
              <Column
                title="Payment Type "
                dataIndex="payment_type"
                key="payment_type"
              />
            </StyledTable>
          </TabPane>
        </Tabs>
      </div>
      <TopPicks />
      <TopSellers />
    </div>
  );
};

export default Dashboard;
