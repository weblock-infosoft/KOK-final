import React, { useState, useEffect } from "react";
import { Typography, Table, Divider, message, Image } from "antd";
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
`;

const Testimonials = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/testimonialsFill`,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching testimonials.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Title level={2}>Testimonials</Title>
      <Divider />
      <StyledTable
        dataSource={data}
        rowKey="review_id"
        pagination={false}
        loading={loading}
      >
        <Column title="Review" dataIndex="review_text" key="review_text" />
        <Column
          title="User First Name"
          key="user_first_name"
          render={(record) => record.user_data.user_first_name}
        />
        <Column
          title="User Last Name"
          key="user_last_name"
          render={(record) => record.user_data.user_last_name}
        />
        <Column
          title=" Image"
          dataIndex="imagelink"
          key="imagelink"
          render={(text, record) =>
            record.user_data.imagelink ? (
              <Image src={record.user_data.imagelink} alt="Image" width={50} />
            ) : (
              "No Image"
            )
          }
        />
      </StyledTable>
    </>
  );
};

export default Testimonials;
