import React, { useCallback, useEffect, useState } from "react";
import { Typography, Divider, message, Table, Spin } from "antd";
import styled from "styled-components";
import axios from "axios";

const { Title } = Typography;
const { Column } = Table;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #36304a;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
  .ant-table {
    width: 100%;
    text-align: center;
  }
`;

const ContactDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("data>>>", data);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/getallContactDetails`,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      if (response.data && response.data.status === 1) {
        setData(response.data.data); // Changed here to set the correct data
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Title level={4}>Contact Details</Title>
      <Divider />
      {loading ? (
        <Spin size="large" />
      ) : (
        <StyledTable dataSource={data} rowKey="contact_id" pagination={true}>
          <Column
            title="First Name"
            dataIndex="user_first_name"
            key="user_first_name"
          />
          <Column
            title="Last Name"
            dataIndex="user_last_name"
            key="user_last_name"
          />
          <Column
            title="Mobile Number"
            dataIndex="user_mobile_no"
            key="user_mobile_no"
          />
          <Column title="User Email" dataIndex="user_email" key="user_email" />
          <Column title="User Message" dataIndex="msg" key="msg" />
        </StyledTable>
      )}
    </>
  );
};

export default ContactDetails;
