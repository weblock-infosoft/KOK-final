// import { useState, useEffect } from "react";
// import { Table, Typography } from "antd";
// import styled from "styled-components";
// import axios from "axios";

// const { Column } = Table;
// const { Title } = Typography;

// const StyledTable = styled(Table)`
//   .ant-table-thead > tr > th {
//     background-color: #36304a;
//     color: #fff;
//     font-weight: bold;
//     text-align: center;
//   }
// `;

// const Banking = () => {
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/Admin/bankingDetails`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "Auth-Token": localStorage.getItem("auth_token"),
//           },
//         }
//       );
//       setData(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <>
//       <Title level={2}> Banking</Title>
//       <StyledTable dataSource={data} rowKey="id" pagination={false}>
//         <Column title="Profile Picture" dataIndex="Color" key="Color" />

//         <Column title="Total Orders" dataIndex="Color" key="Color" />
//       </StyledTable>
//     </>
//   );
// };

// export default Banking;

import { useState, useEffect } from "react";
import { Table, Typography } from "antd";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const Banking = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const handleOrderClick = async (order_id) => {
    navigate("/viewOrders", { state: { order_id } });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/bankingDetails`,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      setData(response.data.data.orders); // Assuming "orders" is the array you want to display
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Title level={2}> Banking</Title>
      <StyledTable dataSource={data} rowKey="order_id" pagination={false}>
        <Column
          title="Order ID"
          dataIndex="order_id"
          render={(text, record) => (
            <span
              style={{ cursor: "pointer", color: "#1890ff" }}
              onClick={() => handleOrderClick(record.order_id)}
            >
              {record.order_id}
            </span>
          )}
        />
        <Column title="User Name" dataIndex="user_first_name" key="user_name" />
        <Column title="Order Total" dataIndex="order_total" key="order_total" />
        <Column
          title="Payment Type"
          dataIndex="payment_type"
          key="payment_type"
        />
        <Column
          title="Running Total "
          dataIndex="running_total"
          key="running_total"
        />
        <Column
          title="Total Order "
          dataIndex="total_order_sum"
          key="total_order_sum"
        />
      </StyledTable>
    </>
  );
};

export default Banking;
