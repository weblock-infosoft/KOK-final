import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Upload,
  Image,
  message,
  Spin,
  Typography,
  Flex,
} from "antd";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import "./AddCategores.css";

const { Column } = Table;
const { Text, Title } = Typography;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #36304a;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
`;

const AddCategories = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
  };

  const handleFileChange = ({ fileList }) => {
    if (fileList.length > 0) {
      setImage(fileList[0]);
    } else {
      setImage(null);
    }
  };

  const handleBannerFileChange = ({ fileList }) => {
    if (fileList.length > 0) {
      setBannerImage(fileList[0]);
    } else {
      setBannerImage(null);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleButtonClick = (category_id, is_active) => {
    const status = is_active ? 0 : 1;
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/categoryActiveDeactive`,
        {
          category_id,
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
        fetchData();
        message.success("Category status updated successfully.");
      })
      .catch((error) => {
        console.error("Error:", error);
        message.error("Error updating category status.");
      });
  };

  const handleDelete = async (category_id) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/categoryDelete`,
        { category_id },
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );

      setData((prevData) =>
        prevData.filter((item) => item.category_id !== category_id)
      );
      message.success("Category deleted successfully.");
    } catch (error) {
      console.error("Error deleting item from API:", error);
      message.error("Error deleting category.");
    }
  };

  const handleUpload = async () => {
    if (!categoryName.trim() || !image || !bannerImage) {
      message.warning("Category name, image, and banner image are required.");
      return;
    }

    const formData = new FormData();
    const category_id = isEditing ? editingCategoryId : 0;
    formData.append("category_id", category_id);
    formData.append("category_name", categoryName);
    formData.append("image", image.originFileObj);
    formData.append("banner_image", bannerImage.originFileObj);

    console.log("formData::==", formData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/categoryInsupd`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      console.log("setData>>", setData);
      if (isEditing) {
        console.log("true::==");
        setData((prevData) =>
          prevData.map((item) =>
            item.category_id === category_id ? response.data : item
          )
        );
      } else {
        setData((prevData) => [...prevData, response.data]);
      }
      console.log("setData>>", setData);
      setCategoryName("");
      setImage(null);
      setBannerImage(null);
      setIsEditing(false);
      setEditingCategoryId(null);
      message.success("Category added/updated successfully.");
      fetchData();
    } catch (error) {
      console.error("Error adding item to API:", error);
      message.error("Error adding/updating category.");
    }
  };

  const handleEdit = (category) => {
    setCategoryName(category.category_name);
    setImage({
      uid: "-1",
      name: "image.png",
      status: "done",
      url: category.imagelink,
      originFileObj: new File([], "image.png"),
    });
    setBannerImage({
      uid: "-1",
      name: "banner.png",
      status: "done",
      url: category.posterImagelink,
      originFileObj: new File([], "banner.png"),
    });
    setIsEditing(true);
    setEditingCategoryId(category.category_id);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/categoryFill`,
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
      message.error("Error fetching categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Title level={2}> Add Categories</Title>
      <div style={{ marginBottom: 16 }}>
        <Input
          type="text"
          value={categoryName}
          onChange={handleChange}
          placeholder="Enter new category"
          style={{ width: 200, marginRight: 8 }}
          required
        />
        <Button
          type="primary"
          className="Category_button"
          onClick={handleUpload}
        >
          {isEditing ? "Update Category" : "Add Category"}
        </Button>
      </div>

      <div style={{ display: "flex", gap: "30px" }}>
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
          <Text type="secondary" style={{ marginTop: "50px" }}>
            Select only one categories image
          </Text>
        </div>

        <div>
          <Upload
            listType="picture-circle"
            fileList={bannerImage ? [bannerImage] : []}
            onPreview={handlePreview}
            onChange={handleBannerFileChange}
            beforeUpload={() => false}
          >
            {bannerImage ? null : uploadButton}
          </Upload>
          <Text type="secondary" style={{ marginTop: "50px" }}>
            Select only one banner image
          </Text>
        </div>
      </div>
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

      <Title level={5}> Show Categories</Title>
      <Spin spinning={loading}>
        <StyledTable dataSource={data} rowKey="category_id" pagination={false}>
          <Column
            title="Category Name"
            dataIndex="category_name"
            key="category_name"
          />
          <Column
            title="Category Image"
            dataIndex="imagelink"
            key="imagelink"
            render={(imagelink) =>
              imagelink ? (
                <Image src={imagelink} alt="Category" width={50} />
              ) : (
                "No Image"
              )
            }
          />
          <Column
            title="Banner Image"
            dataIndex="posterImagelink"
            key="posterImagelink"
            render={(posterImagelink) =>
              posterImagelink ? (
                <Image src={posterImagelink} alt="Category" width={50} />
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
            dataIndex="is_active"
            key="is_active"
            render={(is_active, record) => (
              <Button
                style={{ color: is_active ? "red" : "green" }}
                onClick={() => handleButtonClick(record.category_id, is_active)}
              >
                {is_active ? "Deactive" : "Active"}
              </Button>
            )}
          />
          <Column
            title="Edit"
            key="edit"
            render={(record) => (
              <Button onClick={() => handleEdit(record)}>Edit</Button>
            )}
          />
          <Column
            title="Delete"
            key="delete"
            render={(record) => (
              <Button danger onClick={() => handleDelete(record.category_id)}>
                Delete
              </Button>
            )}
          />
        </StyledTable>
      </Spin>
    </>
  );
};

export default AddCategories;
