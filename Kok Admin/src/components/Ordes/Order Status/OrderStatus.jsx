import { useState, useEffect } from "react";
import { Button, Table, Input, message, Typography } from "antd";
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

const OrderStatus = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleDelete = async (id) => {
    const statusDelete = { status_id: id };
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/orderStatusDelete`,
        statusDelete,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      setData((prevData) => prevData.filter((item) => item.status_id !== id));
      message.success("Order Status deleted successfully.");
    } catch (error) {
      console.error("Error deleting item from API:", error);
      message.error("Error deleting Order Status.");
    }
    fetchOrders();
  };

  const handleEdit = (id) => {
    const selectedItem = data.find((item) => item.status_id === id);
    if (selectedItem) {
      setValue(selectedItem.status_name);
      setCurrentId(id);
      setIsEditing(true);
    }
  };

  const handleUpload = async () => {
    if (!value.trim()) {
      message.warning("Order Status is required.");
      return;
    }

    const newItem = {
      status_id: isEditing ? currentId : 0,
      status_name: value,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/orderStatusInsUp`,
        newItem,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      if (response.data) {
        if (isEditing) {
          setData((prevData) =>
            prevData.map((item) =>
              item.status_id === currentId ? response.data : item
            )
          );
          message.success("Order Status updated successfully.");
        } else {
          setData((prevData) => [...prevData, response.data]);
          message.success("Order Status added successfully.");
        }
        setValue("");
        setIsEditing(false);
        setCurrentId(null);
      } else {
        console.error("Invalid response data format");
      }
    } catch (error) {
      console.error("Error adding item to API:", error);
      message.error("Error adding Order Status.");
    }
    fetchOrders();
  };

  const fetchOrders = async () => {
    const statusID = { status_id: 0 };
    try {
      const fillResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/orderStatusFill`,
        statusID,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );

      setData(fillResponse.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <h1>{isEditing ? "Update Order Status" : "Add Order Status"}</h1>
      <div style={{ marginBottom: 16 }}>
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Enter new Order Status"
          style={{ width: 200, marginRight: 8 }}
          required
        />
        <Button type="primary" onClick={handleUpload}>
          {isEditing ? "Update Order Status" : "Add Order Status"}
        </Button>
      </div>

      <Title level={2}> Order Status</Title>

      <StyledTable dataSource={data} rowKey="id" pagination={false}>
        <Column title="Status Name" dataIndex="status_name" key="status_name" />
        <Column
          title="Update"
          key="actions"
          render={(record) => (
            <>
              <Button onClick={() => handleEdit(record.status_id)}>
                Update
              </Button>
            </>
          )}
        />
        <Column
          title="Actions"
          key="actions"
          render={(record) => (
            <>
              <Button danger onClick={() => handleDelete(record.status_id)}>
                Delete
              </Button>
            </>
          )}
        />
      </StyledTable>
    </>
  );
};

export default OrderStatus;
