import { useState, useEffect } from "react";
import { Table, Image, Typography } from "antd";
import styled from "styled-components";
import axios from "axios";
import UserListAllData from "./UserListAllData";

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

const UserList = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/adminuserFill`,
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

  const handleColumnClick = (record) => {
    setSelectedUser(record);
    setOpen(true);
  };

  return (
    <>
      <Title level={2}> User List</Title>

      <StyledTable dataSource={data} rowKey="user_id" pagination={false}>
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

export default UserList;
