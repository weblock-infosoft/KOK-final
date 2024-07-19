import React, { useEffect, useState } from "react";
import {
  Typography,
  Divider,
  Image,
  Upload,
  Button,
  message,
  Table,
  Spin,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import axios from "axios";

const { Title } = Typography;
const { Text } = Typography;
const { Column } = Table;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #36304a;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
`;

const HeaderImageOne = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleUploadImage = () => {
    if (!image) {
      message.warning("Please upload image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image.originFileObj);

    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/headerimageoneInsUp`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      )
      .then((response) => {
        setImage(null);
        message.success("Image upload successful.");
        fetchData();
      })
      .catch((error) => {
        console.error("Error adding item to API:", error);
        message.error("Error adding category.");
      });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/headerimageoneFill`,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      if (response.data && response.data.status === 1) {
        setData([response.data.data]); // Set data as an array containing the fetched object
      } else {
        setData([]);
      }
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
      <Title level={2}>Header Image One Upload</Title>
      <Divider />
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

        <Text type="secondary">Select only one image </Text>
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
      <Button
        style={{ marginTop: "30px", marginLeft: "10px" }}
        onClick={handleUploadImage}
      >
        Submit
      </Button>
      <Divider />
      <Title level={4}>Show Images</Title>
      {loading ? (
        <Spin size="large" />
      ) : (
        <StyledTable dataSource={data} rowKey="image_id" pagination={false}>
          <Column
            title="Image"
            dataIndex="imagelink"
            key="imagelink"
            render={(imagelink) =>
              imagelink ? (
                <Image src={imagelink} alt="Image" height={250} width={250} />
              ) : (
                "No Image"
              )
            }
          />
        </StyledTable>
      )}
    </>
  );
};

export default HeaderImageOne;
