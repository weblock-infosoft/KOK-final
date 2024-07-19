import React, { useEffect, useState } from "react";
import { Tabs, Table, Button, message, Typography } from "antd";
import axios from "axios";
import styled from "styled-components";

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

function TopSellers() {
  const [state, setState] = useState([]);

  const fetchData = async () => {
    try {
      const productid = { product_id: 0 };
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/getBestSeller`,
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
      <div className="Top_Sellers">
        <Title level={2}> Top Sellers</Title>
        <StyledTable
          dataSource={state}
          className="center-table"
          pagination={false}
        >
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
            dataIndex="is_active"
            key="is_active"
            render={(is_active) => (
              <span style={{ color: is_active ? "green" : "red" }}>
                {is_active ? "Active" : "Deactive"}
              </span>
            )}
          />
        </StyledTable>
      </div>
    </>
  );
}

export default TopSellers;
