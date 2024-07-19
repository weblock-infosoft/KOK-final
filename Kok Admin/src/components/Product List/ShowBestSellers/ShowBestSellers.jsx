import React, { useState, useEffect } from "react";
import { Table, Button, message, Dropdown, Typography } from "antd";
import styled from "styled-components";
import axios from "axios";

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

const ShowBestSellers = () => {
  const [state, setState] = useState([]);

  const handleAddBestseller = (product_id, isActive) => {
    const status = isActive ? 0 : 1;
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/addbestseller`,
        {
          product_id: product_id,
          status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      )
      .then((response) => {
        fetchData();
        message.success("Product item status updated successfully.");
      })
      .catch((error) => {
        console.error("Error:", error);
        message.error("Error updating Product item status.");
      });
  };

  const fetchData = async () => {
    try {
      const productid = { product_id: 0 };
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/productFill`,
        productid,
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
      message.error("Error fetching categories.");
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Title level={2}> Show Best Sellers</Title>

      <div>
        <StyledTable dataSource={state} pagination={false} rowKey="product_id">
          <Column
            title="Product Name"
            dataIndex="product_name"
            key="product_name"
            render={(product_name) => <span>{product_name}</span>}
          />

          <Column
            title="Product Image"
            dataIndex="imagelink"
            key="imagelink"
            render={(imagelink) => (
              <div style={{ textAlign: "center" }}>
                {imagelink ? (
                  <img
                    src={imagelink}
                    alt="Base64 Image"
                    style={{ width: "100px" }}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div>
            )}
          />
          <Column
            title="Product Price"
            dataIndex="product_price"
            key="product_price"
          />
          <Column
            title="Active Status"
            dataIndex="admin_bestselling"
            key="admin_bestselling"
            render={(admin_bestselling) => (
              <span style={{ color: admin_bestselling ? "green" : "red" }}>
                {admin_bestselling ? "Active" : "Deactive"}
              </span>
            )}
          />
          <Column
            title="Active Deactive"
            dataIndex="admin_bestselling"
            key="admin_bestselling"
            render={(admin_bestselling, record) => (
              <Button
                style={{ color: admin_bestselling ? "red" : "green" }}
                onClick={() =>
                  handleAddBestseller(record.product_id, admin_bestselling)
                }
              >
                {admin_bestselling ? "Deactive" : "Active"}
              </Button>
            )}
          />
        </StyledTable>
      </div>
    </>
  );
};

export default ShowBestSellers;
