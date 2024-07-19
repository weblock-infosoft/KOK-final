import { useState, useEffect } from "react";
import { Table, Button, Input, message, Typography } from "antd";
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

const AddColor = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleButtonClick = async (colorId, isActive) => {
    const status = isActive ? 0 : 1;
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/colorActiveDeactive`,
        {
          color_id: colorId,
          status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      fetchData();
      message.success("Color status updated successfully.");
    } catch (error) {
      console.error("Error updating color status:", error);
      message.error("Error updating color status.");
    }
  };

  const handleDelete = async (id) => {
    const DataDelet = { color_id: id };
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/colorDelete`,
        DataDelet,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );

      setData((prevData) => prevData.filter((item) => item.color_id !== id));
      message.success("Color deleted successfully.");
    } catch (error) {
      console.error("Error deleting item from API:", error);
      message.error("Error deleting color.");
    }
    fetchData();
  };

  const handleUpload = async () => {
    if (!value.trim()) {
      message.warning("Color name is required.");
      return;
    }
    const newItem = { color_id: 0, color_name: value };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/colorInsUp`,
        newItem,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      if (response.data) {
        setData((prevData) => [...prevData, response.data]);
        setValue("");
        message.success("Color added successfully.");
      } else {
        console.error("Invalid response data format");
      }
    } catch (error) {
      console.error("Error adding item to API:", error);
      message.error("Error adding Color.");
    }
    fetchData();
  };

  const fetchData = async () => {
    const colorid = { color_id: 0 };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/colorFill`,
        colorid,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        setData([]);
        console.error("Response data is not an array");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Title level={2}> Add Color</Title>

      <div style={{ marginBottom: 16 }}>
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Enter new color"
          style={{ width: 200, marginRight: 8 }}
          required
        />
        <Button type="primary" onClick={handleUpload}>
          Add Color
        </Button>
      </div>

      <Title level={2}> Show Colors</Title>

      <StyledTable dataSource={data} rowKey="color_id" pagination={false}>
        <Column title="Color" dataIndex="color_name" key="color_name" />
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
        <Column
          title="Active Deactive"
          key="active_deactive"
          render={(text, record) => (
            <Button
              style={{ color: record.is_active ? "red" : "green" }}
              onClick={() =>
                handleButtonClick(record.color_id, record.is_active)
              }
            >
              {record.is_active ? "Deactive" : "Active"}
            </Button>
          )}
        />
        <Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <Button danger onClick={() => handleDelete(record.color_id)}>
              Delete
            </Button>
          )}
        />
      </StyledTable>
    </>
  );
};

export default AddColor;
