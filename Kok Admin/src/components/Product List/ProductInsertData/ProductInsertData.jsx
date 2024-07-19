import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Typography,
  Input,
  Select,
  Image,
  Checkbox,
  Upload,
  message,
} from "antd";
import axios from "axios";
import "./ProductInsertData.css";

const { Title } = Typography;
const { TextArea } = Input;
// const { Option } = Select;

const ProductInsertData = () => {
  const [categories, setCategories] = useState([]);
  const [product_category, setSelectedCategory] = useState("");
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDesc] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_discount, setProductDiscountPrice] = useState("");
  const [product_quantity, setProductQuantity] = useState("");
  const [GST, setGST] = useState("");
  const [Product_tax, setProduct_tax] = useState("");
  const [shipping_charge, setShippingCharges] = useState("");
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fields, setFields] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [availableCharms, setAvailableCharms] = useState([]);
  const [selectedCharms, setSelectedCharms] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("availableColors>>", availableColors.data);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDescChange = (e) => {
    setProductDesc(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleProductDiscountPriceChange = (e) => {
    setProductDiscountPrice(e.target.value);
  };

  const handleproductQuantityChange = (e) => {
    setProductQuantity(e.target.value);
  };

  const handleGstChange = (e) => {
    const value = e.target.value;
    setGST(value);
    if (value) {
      setProduct_tax("");
    }
  };

  const handleTaxChange = (e) => {
    const value = e.target.value;
    setProduct_tax(value);
    if (value) {
      setGST("");
    }
  };

  const handleShippingChargesChange = (e) => {
    setShippingCharges(e.target.value);
  };

  const handleUploadVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
  };

  const handleFileChange = ({ fileList }) => {
    const limitedFileList = fileList.slice(-5);
    setImage(limitedFileList);

    if (fileList.length > 5) {
      message.error("You can upload a maximum of 5 images.");
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const addField = () => {
    const newField = {
      id: fields.length + 1,
      textValue: "",
      dropdownValue: "",
      selectedColors: [],
      selectedCharms: [],
    };
    setFields([...fields, newField]);
  };

  const handleTextChange = (id, e) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, textValue: e?.target?.value || "" } : field
    );
    setFields(updatedFields);
  };

  const handleDropdownChange = async (id, value) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, dropdownValue: value } : field
    );
    setFields(updatedFields);

    if (value === "Color") {
      await fetchColors(id);
    } else if (value === "Charm") {
      await fetchCharms(id);
    }
  };

  const handleColorCheckboxChange = (fieldId, checkedValues) => {
    setFields((prevFields) =>
      prevFields.map((field) => {
        if (field.id === fieldId) {
          const selectedColors = checkedValues.map((colorId) => {
            const color = availableColors.find((c) => c.color_id === colorId);
            return { id: color.color_id, color: color.color_name };
          });
          return { ...field, selectedColors };
        }
        return field;
      })
    );
  };

  const handleCharmCheckboxChange = (fieldId, checkedValues) => {
    setFields((prevFields) =>
      prevFields.map((field) => {
        if (field.id === fieldId) {
          const selectedCharms = checkedValues.map((charmId) => {
            const charm = availableCharms.find((c) => c.charm_id === charmId);
            return { id: charm.charm_id, charmName: charm.charm_name };
          });
          return { ...field, selectedCharms };
        }
        return field;
      })
    );
  };

  const createAttachmentStructure = () => {
    const attachmentStructure = {};

    fields.forEach((field) => {
      if (field.dropdownValue === "Color") {
        const colors = field.selectedColors.map((color) => ({
          id: parseInt(color.id),
          color: color.color,
        }));
        attachmentStructure[field.textValue] = colors;
      } else if (field.dropdownValue === "Charm") {
        const charms = field.selectedCharms.map((charm) => ({
          id: parseInt(charm.id),
          charmName: charm.charmName,
        }));
        attachmentStructure[field.textValue] = charms;
      } else if (field.dropdownValue === "Text") {
        attachmentStructure[field.textValue] = "Text";
      }
    });

    return attachmentStructure;
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalGST = GST ? GST : "0";
    const finalProductTax = Product_tax ? Product_tax : "0";

    const formData = new FormData();
    const product_video = "";
    formData.append("product_id", 0);
    formData.append("product_name", product_name);
    formData.append("product_description", product_description);
    formData.append("product_price", product_price);
    formData.append("GST", finalGST);
    formData.append("Product_tax", finalProductTax);
    formData.append("product_discount", product_discount);
    formData.append("product_quantity", product_quantity);
    formData.append("product_video", product_video);
    formData.append("video", video);
    formData.append("shipping_charge", shipping_charge);
    formData.append("product_category", product_category);
    formData.append(
      "product_modify_object",
      JSON.stringify(createAttachmentStructure())
    );
    image.forEach((file) => {
      formData.append("otherImages", file.originFileObj);
    });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/productInsUp`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      message.success("Product added successfully.");
      console.log("API response:", response);
      setSelectedCategory("");
      setProductName("");
      setProductDesc("");
      setProductPrice("");
      setProductDiscountPrice("");
      setProductQuantity("");
      setGST("");
      setProduct_tax("");
      setShippingCharges("");
      setVideo(null);
      setImage([]);
      setFields([]);
    } catch (error) {
      console.error("Error adding product to API:", error);
      message.error("Error adding product.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const getCategories = async () => {
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
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCharms = async (fieldId) => {
    if (availableCharms.length === 0) {
      const charmid = { charm_id: 0 };
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/Admin/charmFill`,
          charmid,
          {
            headers: {
              "Content-Type": "application/json",
              "Auth-Token": localStorage.getItem("auth_token"),
            },
          }
        );
        setAvailableCharms(response.data.data || []); // Ensure response.data.data is an array
      } catch (error) {
        console.error("Error fetching charms:", error);
      }
    }
  };

  const fetchColors = async (fieldId) => {
    if (availableColors.length === 0) {
      const colorid = { color_id: 0 };
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/Admin/colorFill`,
          colorid,
          {
            headers: {
              "Content-Type": "application/json",
              "Auth-Token": localStorage.getItem("auth_token"),
            },
          }
        );
        setAvailableColors(response.data.data || []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="product-insert-data-container">
      <Title level={3}>Product Insert Data</Title>
      <form onSubmit={handleSubmitData}>
        <div className="form-group">
          <Title level={5}>Select Category</Title>
          <Select
            className="ProductDesc"
            value={product_category}
            onChange={handleCategoryChange}
          >
            <Select.Option value="">Select Category</Select.Option>
            {categories.map((category) => (
              <Select.Option
                key={category.category_id}
                value={category.category_id}
              >
                {category.category_name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="form-group">
          <label htmlFor="product_name">Product Name:</label>
          <Input
            type="text"
            id="product_name"
            value={product_name}
            onChange={handleProductNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="product_description">Product Description:</label>
          <TextArea
            rows={5}
            id="product_description"
            value={product_description}
            onChange={handleProductDescChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="product_price">Product Price:</label>
          <Input
            type="number"
            id="product_price"
            value={product_price}
            onChange={handleProductPriceChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="product_discount">Product Discount:</label>
          <Input
            type="number"
            id="product_discount"
            value={product_discount}
            onChange={handleProductDiscountPriceChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="product_quantity">Product Quantity:</label>
          <Input
            type="number"
            id="product_quantity"
            value={product_quantity}
            onChange={handleproductQuantityChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="GST">GST:</label>
          <Input
            type="number"
            id="GST"
            value={GST}
            onChange={handleGstChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Product_tax">Product Tax:</label>
          <Input
            type="number"
            id="Product_tax"
            value={Product_tax}
            onChange={handleTaxChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shipping_charge">Shipping Charges:</label>
          <Input
            type="number"
            id="shipping_charge"
            value={shipping_charge}
            onChange={handleShippingChargesChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="video">Upload Video:</label>
          <Input
            type="file"
            id="video"
            accept="video/*"
            onChange={handleUploadVideoChange}
          />
        </div>
        <div className="form-group">
          <label>Upload Images:</label>
          <Upload
            listType="picture-circle"
            fileList={image}
            onPreview={handlePreview}
            onChange={handleFileChange}
            beforeUpload={() => false}
            multiple
          >
            {image.length >= 5 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </div>
        <div className="form-group">
          <button
            className="add-fields-button"
            type="button"
            onClick={addField}
          >
            Add Field
          </button>
        </div>
        <div style={{ marginTop: "10px" }}>
          {fields.map((field) => (
            <div key={field.id} className="dynamic-field">
              <Input
                placeholder="Text Value"
                value={field.textValue}
                onChange={(e) => handleTextChange(field.id, e)}
              />
              <Select
                placeholder="Select Option"
                value={field.dropdownValue}
                onChange={(value) => handleDropdownChange(field.id, value)}
                style={{ width: "100%", marginTop: "10px" }}
              >
                <Select.Option value="">Select Option</Select.Option>
                <Select.Option value="Text">Text</Select.Option>
                <Select.Option value="Color">Color</Select.Option>
                <Select.Option value="Charm">Charm</Select.Option>
              </Select>
              {field.dropdownValue === "Color" && (
                <Checkbox.Group
                  onChange={(checkedValues) => {
                    handleColorCheckboxChange(
                      field.id,
                      checkedValues,
                      field.textValue
                    );
                  }}
                >
                  {availableColors.map((color) => (
                    <Checkbox key={color.color_id} value={color.color_id}>
                      {color.color_name}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              )}
              {field.dropdownValue === "Charm" && (
                <Checkbox.Group
                  onChange={(checkedValues) => {
                    handleCharmCheckboxChange(
                      field.id,
                      checkedValues,
                      field.textValue
                    );
                  }}
                >
                  {availableCharms.map((charm) => (
                    <Checkbox key={charm.charm_id} value={charm.charm_id}>
                      {charm.charm_name}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              )}
            </div>
          ))}
        </div>
        <div
          className="form-group"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <button
            className="add-fields-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductInsertData;
