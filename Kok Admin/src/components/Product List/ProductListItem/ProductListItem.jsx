import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, message, Dropdown, Typography } from "antd";
import styled from "styled-components";
import axios from "axios";
import ProductListModal from "./ProductList";
import "./ProductListItem.css";

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

const ProductListItem = () => {
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleBulkUploadClick = () => {
    setOpenModal(true);
  };

  const handleButtonClick = (product_id, isActive) => {
    const status = isActive ? 0 : 1;
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/productActiveDeactive`,
        {
          product_id: product_id,
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
        message.success("Product item status updated successfully.");
      })
      .catch((error) => {
        console.error("Error:", error);
        message.error("Error updating Product item status.");
      });
  };

  const handleAddBestseller = (product_id, isActive) => {
    const status = isActive ? 0 : 1;
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/addbestseller`,
        {
          product_id: product_id,
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
        message.success("Product item status updated successfully.");
      })
      .catch((error) => {
        console.error("Error:", error);
        message.error("Error updating Product item status.");
      });
  };

  const handleDelete = async (id) => {
    const DataDelet = { product_id: id };
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/productDelete`,
        DataDelet,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );

      setState((prevData) => prevData.filter((item) => item.product_id !== id));
      message.success(" Product Item deleted successfully.");
    } catch (error) {
      console.error("Error deleting item from API:", error);
      message.error("Error deleting Product Item.");
    }

    fetchData();
  };

  const items = [
    {
      key: "1",
      label: <Link to="/ProductInsertData">Product Insert Data</Link>,
    },
    // {
    //   key: "2",
    //   label: "Bulk Product Upload",
    //   onClick: handleBulkUploadClick,
    // },
  ];

  const handleUpdate = (product_id) => {
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/productFill`,
        {
          product_id: product_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      )
      .then((response) => {
        console.log("response.data.data>>", response.data.data);
        navigate("/productUpdate", { state: { product_id: product_id } });
      })
      .catch((error) => {
        console.error("Error:", error);
        message.error("Error updating Product item status.");
      });
  };

  const fetchData = async () => {
    const newItem = { product_id: 0 };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/productFill`,
        newItem,
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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="ProductHedar">
        <div>
          <Title level={2}> Product List</Title>
        </div>
        <div className="ProductHedar">
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            arrow={{
              pointAtCenter: true,
            }}
          >
            <Button type="primary">Add Product</Button>
          </Dropdown>
        </div>
      </div>
      <div>
        <StyledTable dataSource={state} pagination={false} rowKey="product_id">
          <Column
            title="Product Name"
            dataIndex="product_name"
            key="product_name"
            render={(product_name) => <span>{product_name}</span>}
          />
          <Column
            title="Product Category Name"
            dataIndex="product_category_name"
            key="product_category_name"
            render={(product_category_name) => (
              <span>{product_category_name}</span>
            )}
          />
          <Column
            title="Product Image"
            dataIndex="imagelink"
            key="imagelink"
            render={(imagelink) => (
              <div style={{ textAlign: "center" }}>
                {imagelink ? (
                  <img
                    src={imagelink}
                    alt="Base64 Image"
                    style={{ width: "100px" }}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div>
            )}
          />
          <Column
            title="Product Quantity"
            dataIndex="product_quantity"
            key="product_quantity"
            render={(text, record) => (
              <span
                style={{
                  color: record.product_quantity <= 5 ? "red" : "black",
                }}
              >
                {record.product_quantity}
              </span>
            )}
          />
          <Column
            title="Product Price"
            dataIndex="product_price"
            key="product_price"
          />
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
                onClick={() => handleButtonClick(record.product_id, is_active)}
              >
                {is_active ? "Deactive" : "Active"}
              </Button>
            )}
          />
          <Column
            title="Product Update"
            key="actions"
            render={(record) => (
              <Button onClick={() => handleUpdate(record.product_id)}>
                Update
              </Button>
            )}
          />
          <Column
            title="Actions"
            key="actions"
            render={(record) => (
              <Button danger onClick={() => handleDelete(record.product_id)}>
                Delete
              </Button>
            )}
          />
        </StyledTable>
        <ProductListModal open={openModal} setOpen={setOpenModal} />
      </div>
    </>
  );
};

export default ProductListItem;
