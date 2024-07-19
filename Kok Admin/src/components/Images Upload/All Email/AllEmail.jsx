// import React, { useCallback, useEffect, useState } from "react";
// import { Typography, Divider, message, Table, Spin } from "antd";
// import styled from "styled-components";
// import axios from "axios";

// const { Title } = Typography;
// const { Text } = Typography;
// const { Column } = Table;

// const StyledTable = styled(Table)`
//   .ant-table-thead > tr > th {
//     background-color: #36304a;
//     color: #fff;
//     font-weight: bold;
//     text-align: center;
//   }
//   .ant-table {
//     width: 100%;
//     text-align: center;
//   }
// `;

// const AllEmail = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   console.log("data>>>", data);

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/Admin/getallsubscriptionEmail`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "Auth-Token": localStorage.getItem("auth_token"),
//           },
//         }
//       );
//       if (response.data && response.data.status === 1) {
//         setData([response.data.data]);
//       } else {
//         setData([]);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       message.error("Error fetching categories.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return (
//     <>
//       <Title level={4}>All Email</Title>
//       <Divider />
//       {loading ? (
//         <Spin size="large" />
//       ) : (
//         <StyledTable dataSource={data} rowKey="image_id" pagination={true}>
//           <Column
//             title="Image Tital "
//             dataIndex="user_email"
//             key="user_email"
//           />
//         </StyledTable>
//       )}
//     </>
//   );
// };

// export default AllEmail;

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

const AllEmail = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("data>>>", data);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/getallsubscriptionEmail`,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      if (response.data && response.data.status === 1) {
        setData(response.data.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching emails.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Title level={4}>All Email</Title>
      <Divider />
      {loading ? (
        <Spin size="large" />
      ) : (
        <StyledTable dataSource={data} rowKey="user_email" pagination={true}>
          <Column title="User Email " dataIndex="user_email" key="user_email" />
        </StyledTable>
      )}
    </>
  );
};

export default AllEmail;
