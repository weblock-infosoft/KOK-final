import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  message,
  Button,
  Spin,
  Select,
  Typography,
  Card,
  Row,
  Col,
} from "antd";

import "./ViewOrders.css";

const { Title } = Typography;

const parseProductModifyObject = (jsonString) => {
  try {
    const parsedObject = JSON.parse(JSON.parse(jsonString));
    const formattedObject = {};
    Object.keys(parsedObject).forEach((key) => {
      if (typeof parsedObject[key] === "object") {
        formattedObject[key] =
          parsedObject[key].color || parsedObject[key].charmName;
      } else {
        formattedObject[key] = parsedObject[key];
      }
    });
    return formattedObject;
  } catch (error) {
    console.error("Error parsing product_modify_object:", error);
    return {};
  }
};

const ViewOrders = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/updateorderSatatus`,
        {
          order_id: state.order_id,
          status_id: selectedCategory,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      message.success("Order status updated successfully");
      navigate("/orderList");
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error("Error updating order status.");
    }
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/Admin/getorderlist`,
          { order_id: state.order_id },
          {
            headers: {
              "Content-Type": "application/json",
              "Auth-Token": localStorage.getItem("auth_token"),
            },
          }
        );
        setOrderDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
        message.error("Error fetching order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [state.order_id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/Admin/orderStatusFill`,
          { status_id: 0 },
          {
            headers: {
              "Content-Type": "application/json",
              "Auth-Token": localStorage.getItem("auth_token"),
            },
          }
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Spin />;
  }

  if (!orderDetails) {
    return <p>No order details found</p>;
  }

  return (
    <div>
      <Title level={2}>Order Details</Title>
      <p>Order ID: {orderDetails.order_id}</p>
      <p>
        Name: {orderDetails.user_first_name} {orderDetails.user_last_name}
      </p>
      <p>Email: {orderDetails.user_email}</p>
      <p>Order Total: {orderDetails.order_total}</p>
      <p>Mobile Number: {orderDetails.user_mobile_no}</p>
      <p>Payment Type: {orderDetails.payment_type}</p>
      <div>
        <Title level={5}>Select Category</Title>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ width: 650 }}
        >
          <Select.Option value="">Select Category</Select.Option>
          {categories.map((category) => (
            <Select.Option key={category.status_id} value={category.status_id}>
              {category.status_name}
            </Select.Option>
          ))}
        </Select>
        <Button
          type="primary"
          onClick={handleUpdateStatus}
          style={{ marginLeft: 16 }}
        >
          Update Status
        </Button>
      </div>
      <Title level={3}>Order Transactions</Title>
      <Row gutter={[16, 16]}>
        {orderDetails.OrderTrndata.map((orderTrn) => {
          const modifyObject = parseProductModifyObject(
            orderTrn.product_modify_object
          );

          return (
            <Col key={orderTrn.orderTrn_id} span={8}>
              <Card
                title={orderTrn.productdata[0].product_name}
                cover={
                  <img
                    alt={orderTrn.productdata[0].product_name}
                    src={orderTrn.productdata[0].imagelink}
                    className="BoxImages"
                  />
                }
              >
                <p>{orderTrn.productdata[0].product_description}</p>
                <p>Quantity: {orderTrn.product_quantity}</p>
                <p>Price: {orderTrn.product_price}</p>
                <p>Product Modify Object:</p>
                <ul>
                  {Object.entries(modifyObject).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ViewOrders;
