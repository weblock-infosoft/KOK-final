import React, { useState, useEffect } from "react";
import { Table, Button, Upload, Image, message, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import axios from "axios";
import "./CouponCard.css";

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

const CouponCard = () => {
  const [data, setData] = useState([]);
  const [couponCardName, setCouponCardName] = useState("");
  const [percentage, setPercentage] = useState("");
  const [amount, setAmount] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [productFillByCategory, setProductFillByCategory] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [selectionType, setSelectionType] = useState("checkbox");
  const [image, setImage] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [state, setState] = useState([]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  const handlePreview = (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
  };

  const handleCategoryChange = (e) => {
    setProductCategory(e.target.value);
  };

  const handleCouponCardNameChange = (e) => {
    setCouponCardName(e.target.value);
  };

  const handlePercentageChange = (e) => {
    const value = e.target.value;
    setPercentage(value);
    if (value) {
      setAmount("");
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (value) {
      setPercentage("");
    }
  };

  const handleFileChange = ({ fileList }) => {
    setImage(fileList.length > 0 ? fileList[0] : null);
  };

  const handleButtonClick = (couponCard_id, is_active) => {
    const status = is_active ? 0 : 1;
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/couponCardActiveDeactive`,
        {
          couponCard_id,
          status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      )
      .then(() => {
        message.success("Category status updated successfully.");
        couponCardFill();
      })
      .catch((error) => {
        console.error("Error:", error);
        message.error("Error updating category status.");
      });
  };

  const handleDelete = (couponCard_id) => {
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/couponCardDelete`,
        { couponCard_id },
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      )
      .then(() => {
        setData((prevData) =>
          prevData.filter((item) => item.couponCard_id !== couponCard_id)
        );
        couponCardFill();
        message.success("Category deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting item from API:", error);
        message.error("Error deleting category.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      message.warning("Category name and image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("couponCard_id", 0);
    formData.append("product_id", selectedRowKeys);
    formData.append("couponCard_name", couponCardName);
    formData.append("couponCard_image", image.name);
    formData.append("discount_Amt", amount);
    formData.append("discount_per", percentage);
    formData.append("image", image.originFileObj);

    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/couponCardInsUp`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      )
      .then((response) => {
        setData((prevData) => [...prevData, response.data]);
        couponCardFill();
        setCouponCardName("");
        setAmount("");
        setPercentage("");
        setImage(null);
        message.success("Category added successfully.");
        couponCardFill();
      })
      .catch((error) => {
        console.error("Error adding item to API:", error);
        message.error("Error adding category.");
      });
  };

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

  const couponCardFill = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/couponCardFill`,
        { couponCard_id: 0 },
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      )
      .then((response) => {
        setState(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  useEffect(() => {
    getCategories();
    couponCardFill();
  }, []);

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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Title level={2}> Add Coupon Card</Title>

        <div>
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
          <div className="Product_Name">
            <label>
              Gift Card Name <span className="abstract">*</span>
            </label>
            <br />
            <input
              autoComplete="off"
              type="text"
              name="name"
              id="ProductName"
              className="ProductName"
              placeholder="Enter Giftcard Name"
              value={couponCardName}
              onChange={handleCouponCardNameChange}
            />
          </div>
          <br />
          <div className="Product_Prices">
            <div>
              <label>
                Percentage <span className="abstract">*</span>
              </label>
              <input
                type="tel"
                autoComplete="off"
                name="percentage"
                id="ProductPercentage"
                className="ProductDesc"
                placeholder="Percentage"
                value={percentage}
                onChange={handlePercentageChange}
              />
            </div>
            <div>
              <label>
                Amount <span className="abstract">*</span>
              </label>
              <input
                autoComplete="off"
                type="tel"
                name="amount"
                id="ProductAmount"
                className="ProductDesc"
                placeholder="Amount"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
          </div>
          <br />
          <div>
            <Upload
              listType="picture-circle"
              fileList={image ? [image] : []}
              onPreview={handlePreview}
              onChange={handleFileChange}
              beforeUpload={() => false}
            >
              {image ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: "none",
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
      <div>
        <Title level={2}> Show All GiftCard</Title>

        <div>
          <StyledTable
            dataSource={state}
            pagination={false}
            rowKey="couponCard_id"
          >
            <Column
              title="Name"
              dataIndex="couponCard_name"
              key="couponCard_name"
              render={(couponCard_name) => (
                <p style={{ textAlign: "center" }}>{couponCard_name}</p>
              )}
            />
            <Column
              title="Image"
              dataIndex="imagelink"
              key="imagelink"
              render={(imagelink) =>
                imagelink ? (
                  <Image src={imagelink} alt="Category" width={100} />
                ) : (
                  "No Image"
                )
              }
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
              key="is_active"
              render={(record) => (
                <Button
                  style={{ color: record.is_active ? "red" : "green" }}
                  onClick={() =>
                    handleButtonClick(record.couponCard_id, record.is_active)
                  }
                >
                  {record.is_active ? "Deactive" : "Active"}
                </Button>
              )}
            />
            <Column
              title="Delete"
              key="actions"
              render={(record) => (
                <Button
                  danger
                  onClick={() => handleDelete(record.couponCard_id)}
                >
                  Delete
                </Button>
              )}
            />
          </StyledTable>
        </div>
      </div>
    </>
  );
};

export default CouponCard;
