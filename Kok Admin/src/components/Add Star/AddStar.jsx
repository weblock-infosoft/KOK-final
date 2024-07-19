import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Input, Table, Divider, Button, message } from "antd";
import styled from "styled-components";

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

const AddStar = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [state, setState] = useState([]);
  const [productCategory, setProductCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [productFillByCategory, setProductFillByCategory] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectionType, setSelectionType] = useState("checkbox");

  const handleCategoryChange = (e) => {
    setProductCategory(e.target.value);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys.map(Number));
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  const handleDelete = async (id) => {
    const DataDelet = { review_id: id };
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/removestars`,
        DataDelet,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      setState((prevData) =>
        prevData.filter((item) => item.removestars !== id)
      );
      message.success(" Product Item deleted successfully.");
    } catch (error) {
      console.error("Error deleting item from API:", error);
      message.error("Error deleting Product Item.");
    }

    fetchData();
  };

  const handleUpload = async () => {
    if (!value.trim()) {
      message.warning("Rating is required.");
      return;
    }

    if (selectedRowKeys.length === 0) {
      message.warning("Please select at least one product.");
      return;
    }

    const user_id = localStorage.getItem("user_id");

    const promises = selectedRowKeys.map((product_id) => {
      const newItem = {
        review_id: 0,
        product_id,
        user_id,
        rating: value,
        review_text: "",
      };

      return axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/addstars`,
        newItem,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
    });

    try {
      const responses = await Promise.all(promises);

      responses.forEach((response) => {
        if (response.data) {
          setData((prevData) => [...prevData, response.data]);
        } else {
          console.error("Invalid response data format");
        }
      });

      setValue("");
      setSelectedRowKeys([]);
      message.success("Star(s) added successfully.");
    } catch (error) {
      console.error("Error adding star to API:", error);
      message.error("Error adding star.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/adminstarsFill`,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      if (Array.isArray(response.data.data)) {
        setState(response.data.data);
      } else {
        setState([]);
        console.error("Response data is not an array");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (productCategory) {
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/Admin/productFillByCategory`,
          { product_id: 0, category: productCategory },
          {
            headers: {
              "Content-Type": "application/json",
              "Auth-Token": localStorage.getItem("auth_token"),
            },
          }
        )
        .then((response) => {
          setProductFillByCategory(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching products by category:", error);
        });
    }
  }, [productCategory]);

  const getCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/Admin/categoryFill`, {
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": localStorage.getItem("auth_token"),
        },
      })
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  useEffect(() => {
    getCategories();
    fetchData();
  }, []);

  return (
    <>
      <Title level={2}>Add Star Review</Title>
      <Divider />
      <div>
        <label>Select Category</label>
        <select
          name="productCategory"
          className="ProductDesc"
          value={productCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>
      <StyledTable
        dataSource={productFillByCategory}
        pagination={false}
        rowKey="product_id"
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        className="TableCss"
      >
        <Column
          title="Product Name"
          dataIndex="product_name"
          key="product_name"
        />
        <Column
          title="Product Image"
          dataIndex="imagelink"
          key="imagelink"
          render={(imagelink) => (
            <div style={{ textAlign: "center" }}>
              {imagelink ? (
                <img src={imagelink} alt="Product" style={{ width: "100px" }} />
              ) : (
                <span>No Image</span>
              )}
            </div>
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
      </StyledTable>
      <div>
        <div style={{ marginBottom: 16 }}>
          <Input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Enter rating"
            style={{ width: 200, marginRight: 8 }}
            required
          />
          <Button type="primary" onClick={handleUpload}>
            Add Star
          </Button>
        </div>
      </div>
      <Title level={5}> Show Review </Title>
      <Divider />
      <div>
        <StyledTable dataSource={state} rowKey="review_id" pagination={true}>
          <Column title="Review ID" dataIndex="review_id" key="review_id" />
          <Column
            title="Admin Rating"
            dataIndex="admin_rating"
            key="admin_rating"
          />
          <Column
            title="Product Name"
            dataIndex={["Product_data", "product_name"]}
            key="product_name"
          />
          <Column
            title="Product Description"
            dataIndex={["Product_data", "product_description"]}
            key="product_description"
          />
          <Column
            title="Product Price"
            dataIndex={["Product_data", "product_price"]}
            key="product_price"
          />
          <Column
            title="Actions"
            key="actions"
            render={(text, record) => (
              <Button danger onClick={() => handleDelete(record.review_id)}>
                Delete
              </Button>
            )}
          />
        </StyledTable>
      </div>
    </>
  );
};

export default AddStar;
