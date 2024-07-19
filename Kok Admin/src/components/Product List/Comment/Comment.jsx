import React, { useState, useEffect } from "react";
import { Typography, Table, Divider, message, Button } from "antd";
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

const Comment = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTestimonials = async (review_id, isActive) => {
    const status = isActive ? 0 : 1;

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/addtestimonials`,
        {
          review_id: review_id,
          status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      setState((prevData) =>
        prevData.filter((item) => item.review_id !== review_id)
      );
      fetchData();
      message.success("Review status updated successfully.");
    } catch (error) {
      console.error("Error updating review status:", error);
      if (error.response && error.response.data && error.response.data.msg) {
        message.error(error.response.data.msg);
      } else {
        message.error("Error updating review status.");
      }
    }
  };

  const handleDelete = async (review_id) => {
    const DataDelet = { review_id: review_id };
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/commentremove`,
        DataDelet,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );

      setState((prevData) =>
        prevData.filter((item) => item.review_id !== review_id)
      );
      message.success("Review deleted successfully.");
    } catch (error) {
      console.error("Error deleting review:", error);
      if (error.response && error.response.data && error.response.data.msg) {
        message.error(error.response.data.msg);
      } else {
        message.error("Error deleting review.");
      }
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/commentFill`,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      setState(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching reviews.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Title level={2}>Review</Title>
      <Divider />
      <StyledTable
        dataSource={state}
        rowKey="review_id"
        pagination={false}
        loading={loading}
      >
        <Column title="Review" dataIndex="review_text" key="review_text" />
        <Column
          title="Testimonials Status"
          dataIndex="is_testimonials"
          key="is_testimonials"
          render={(is_testimonials) => (
            <span style={{ color: is_testimonials ? "green" : "red" }}>
              {is_testimonials ? "Active" : "Deactive"}
            </span>
          )}
        />
        <Column
          title="Change Status"
          dataIndex="is_testimonials"
          key="change_status"
          render={(is_testimonials, record) => (
            <Button
              style={{ color: is_testimonials ? "red" : "green" }}
              onClick={() =>
                handleTestimonials(record.review_id, is_testimonials)
              }
            >
              {is_testimonials ? "Deactive" : "Active"}
            </Button>
          )}
        />
        <Column
          title="Delete"
          key="actions"
          render={(record) => (
            <Button danger onClick={() => handleDelete(record.review_id)}>
              Delete
            </Button>
          )}
        />
      </StyledTable>
    </>
  );
};

export default Comment;
