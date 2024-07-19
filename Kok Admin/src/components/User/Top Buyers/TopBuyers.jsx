import { useState, useEffect } from "react";
import { Table, Typography, message, Image } from "antd";
import styled from "styled-components";
import axios from "axios";
import UserListAllData from "../User List/UserListAllData";

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

const TopBuyers = () => {
  const [state, setState] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchData = async () => {
    try {
      const userid = { user_id: 0 };
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/getopBuyers`,
        userid,
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

  const handleColumnClick = (record) => {
    setSelectedUser(record);
    setOpen(true);
  };

  return (
    <>
      <Title level={2}> Top Buyers</Title>

      <StyledTable dataSource={state} rowKey="id" pagination={false}>
        <Column
          title="Profile Picture"
          dataIndex="imagelink"
          key="imagelink"
          render={(imagelink) =>
            imagelink ? (
              <Image src={imagelink} alt="Profile Picture" width={70} />
            ) : (
              "No Image"
            )
          }
        />
        <Column
          title="First Name"
          dataIndex="user_first_name"
          key="first_name"
          onCell={(record) => ({ onClick: () => handleColumnClick(record) })}
        />
        <Column
          title="Last Name"
          dataIndex="user_last_name"
          key="last_name"
          onCell={(record) => ({ onClick: () => handleColumnClick(record) })}
        />
        <Column
          title="Mobile Number"
          dataIndex="user_mobile_no"
          key="mobile_number"
          onCell={(record) => ({ onClick: () => handleColumnClick(record) })}
        />
        <Column
          title="Email"
          dataIndex="user_email"
          key="email"
          onCell={(record) => ({ onClick: () => handleColumnClick(record) })}
        />
        <Column
          title="Order Count"
          dataIndex="order_count"
          key="order_count"
          onCell={(record) => ({ onClick: () => handleColumnClick(record) })}
        />
      </StyledTable>
      <UserListAllData
        user={selectedUser}
        open={open}
        setOpen={setOpen}
        fetchData={fetchData}
      />
    </>
  );
};

export default TopBuyers;
