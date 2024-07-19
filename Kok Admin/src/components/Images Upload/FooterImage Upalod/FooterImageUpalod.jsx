import React, { useCallback, useEffect, useState } from "react";
import {
  Typography,
  Divider,
  Image,
  Upload,
  Button,
  message,
  Table,
  Input,
  Spin,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import axios from "axios";

const { Title } = Typography;
const { Column } = Table;
const { Text } = Typography;
const { TextArea } = Input;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #36304a;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
`;

const StyledDiv = styled.div`
  margin: 20px 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FooterImageUpload = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    image_tital: "",
    image_description: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    formData.append("image_tital", state.image_tital);
    formData.append("image_description", state.image_description);

    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/footerimageInsUp`,
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
        setState({
          image_tital: "",
          image_description: "",
        });
        message.success("Image upload successful.");
        fetchData(); // Refresh data after successful upload
      })
      .catch((error) => {
        console.error("Error adding item to API:", error);
        message.error("Error adding category.");
      });
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/footerimageFill`,
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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Title level={2}>Footer Image Upload</Title>
      <Divider />

      <StyledDiv>
        <Input
          placeholder="Image Tital"
          value={state.image_tital}
          name="image_tital"
          onChange={handleInputChange}
        />
        <TextArea
          placeholder="Image Description"
          value={state.image_description}
          name="image_description"
          onChange={handleInputChange}
          rows={4}
        />
      </StyledDiv>
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
        <Text type="secondary">Select only one image</Text>
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
            title="Image Tital "
            dataIndex="image_tital"
            key="image_tital"
          />
          <Column
            title="Image Description "
            dataIndex="image_description"
            key="image_description"
          />
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

export default FooterImageUpload;
