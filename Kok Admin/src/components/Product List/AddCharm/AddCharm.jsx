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

const AddCharm = () => {
  const [charm_name, setCharm_name] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setCharm_name(e.target.value);
  };

  const handleDelete = async (charm_id) => {
    const DataDelet = { charm_id: charm_id };
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/charmDelete`,
        DataDelet,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );

      setData((prevData) =>
        prevData.filter((item) => item.charm_id !== charm_id)
      );
      message.success("Charm deleted successfully.");
    } catch (error) {
      console.error("Error deleting item from API:", error);
      message.error("Error deleting Charm.");
    }
  };

  const handleStatusButtonClick = (charmId, isActive) => {
    const status = isActive ? 0 : 1;
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/charmActiveDeactive`,
        {
          charm_id: charmId,
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
        message.success("Charm status updated successfully.");
      })
      .catch((error) => {
        console.error("Error:", error);
        message.error("Charm updating color status.");
      });
  };

  const handleUploadCharm = async () => {
    if (!charm_name.trim()) {
      message.warning("Charm name is required.");
      return;
    }
    const newItem = {
      charm_id: 0,
      charm_name: charm_name,
      charm_description: "",
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/charmInsUp`,
        newItem,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      setData((prevData) => [...prevData, response.data]);
      setCharm_name("");
      fetchData();
      message.success("Charm added successfully.");
    } catch (error) {
      console.error("Error adding item to API:", error);
      message.error("Error adding Charm.");
    }
  };

  const fetchData = async () => {
    const charmid = { charm_id: 0 };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/charmFill`,
        charmid,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Title level={2}> Add Charm</Title>

      <div style={{ marginBottom: 16 }}>
        <Input
          type="text"
          value={charm_name}
          onChange={handleChange}
          placeholder="Enter new color"
          style={{ width: 200, marginRight: 8 }}
          required
        />
        <Button type="primary" onClick={handleUploadCharm}>
          Add Charm
        </Button>
      </div>
      <Title level={2}> Show Charm</Title>

      <StyledTable dataSource={data} rowKey="id" pagination={false}>
        <Column title="Charm Name" dataIndex="charm_name" key="charm_name" />
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
          dataIndex="is_active"
          key="is_active"
          render={(is_active, record) => (
            <Button
              style={{ color: is_active ? "red" : "green" }}
              onClick={() =>
                handleStatusButtonClick(record.charm_id, is_active)
              }
            >
              {is_active ? "Deactive" : "Active"}
            </Button>
          )}
        />
        <Column
          title="Delete"
          key="actions"
          render={(text, record) => (
            <Button danger onClick={() => handleDelete(record.charm_id)}>
              Delete
            </Button>
          )}
        />
      </StyledTable>
    </>
  );
};

export default AddCharm;
