import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Input,
  Select,
  Image,
  Checkbox,
  Upload,
  message,
} from "antd";
import "./ProductUpdate.css";

const { Title } = Typography;
const { TextArea } = Input;

const ProductUpdate = () => {
  const location = useLocation();
  const product_id = location.state?.product_id;
  const [categories, setCategories] = useState([]);
  const [product_category, setSelectedCategory] = useState("");
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDesc] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_quantity, setProductQuantity] = useState("");
  const [product_discount, setProductDiscountPrice] = useState("");
  const [GST, setGST] = useState("");
  const [Product_tax, setProductTax] = useState("");
  const [shipping_charge, setShippingCharges] = useState("");
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fields, setFields] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableCharms, setAvailableCharms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleUploadChange = (setter) => (e) => setter(e.target.files[0]);

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
  };

  const handleFileChange = ({ fileList }) => {
    const limitedFileList = fileList.slice(-5);
    setImage(limitedFileList);
    if (fileList.length > 5)
      message.error("You can upload a maximum of 5 images.");
  };

  const handleGstChange = (e) => {
    const value = e.target.value;
    setGST(value);
    if (value) {
      setProductTax("");
    }
  };

  const handleTaxChange = (e) => {
    const value = e.target.value;
    setProductTax(value);
    if (value) {
      setGST("");
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
      field.id === id ? { ...field, textValue: e.target.value } : field
    );
    setFields(updatedFields);
  };

  const fetchColors = async () => {
    if (availableColors.length === 0) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/Admin/colorFill`,
          { color_id: 0 },
          {
            headers: {
              "Content-Type": "application/json",
              "Auth-Token": localStorage.getItem("auth_token"),
            },
          }
        );
        setAvailableColors(response.data.data || []);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    }
  };

  const fetchCharms = async () => {
    if (availableCharms.length === 0) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/Admin/charmFill`,
          { charm_id: 0 },
          {
            headers: {
              "Content-Type": "application/json",
              "Auth-Token": localStorage.getItem("auth_token"),
            },
          }
        );
        setAvailableCharms(response.data.data || []);
      } catch (error) {
        console.error("Error fetching charms:", error);
      }
    }
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

    return JSON.stringify(attachmentStructure);
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalGST = GST || "0";
    const finalProductTax = Product_tax || "0";

    const formData = new FormData();
    formData.append("product_id", product_id); // Update with the existing product_id
    formData.append("product_name", product_name);
    formData.append("product_description", product_description);
    formData.append("product_price", product_price);
    formData.append("product_quantity", product_quantity);
    formData.append("GST", finalGST);
    formData.append("Product_tax", finalProductTax);
    formData.append("product_discount", product_discount);
    formData.append("product_video", "");
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
      message.success("Product updated successfully.");
      product_name("");
      product_category("");
      product_discount("");
      Product_tax("");
      GST("");
      product_quantity("");
      video("");
      shipping_charge("");
      product_category("");
      console.log("API response:", response);
    } catch (error) {
      console.error("Error updating product:", error);
      message.error("Error updating product.");
    } finally {
      setLoading(false);
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

  const fetchData = async (productId) => {
    const productid = { product_id: productId };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/productFill`,
        productid,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      const productData = response.data.data;
      setData(productData);
      setProductName(productData.product_name);
      setProductDesc(productData.product_description);
      setProductPrice(productData.product_price);
      setProductQuantity(productData.product_quantity);
      setProductDiscountPrice(productData.product_discount);
      setGST(productData.GST);
      setProductTax(productData.Product_tax);
      setShippingCharges(productData.shipping_charge);
      setSelectedCategory(productData.product_category);
      setImage(
        productData.otherImages.map((url) => ({
          url,
          uid: url,
          status: "done",
        }))
      );
      setFields(
        productData.attachment_structure.map((field, index) => ({
          id: index + 1,
          textValue: Object.keys(field)[0],
          dropdownValue: Object.keys(field)[0].includes("color")
            ? "Color"
            : Object.keys(field)[0].includes("charms")
            ? "Charm"
            : "Text",
          selectedColors: field[Object.keys(field)[0]].filter(
            (item) => item.color
          ),
          selectedCharms: field[Object.keys(field)[0]].filter(
            (item) => item.charmName
          ),
        }))
      );
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    if (product_id) {
      fetchData(product_id);
    }
    getCategories();
  }, [product_id]);

  return (
    <div className="product-update-container">
      <Title level={2}>Update Product</Title>
      <form onSubmit={handleSubmitData}>
        <div className="form-group">
          <label>Select Category</label>
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
          <label>Product Name</label>
          <Input
            value={product_name}
            onChange={handleInputChange(setProductName)}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Description</label>
          <TextArea
            value={product_description}
            onChange={handleInputChange(setProductDesc)}
            rows={4}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Price</label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={product_price}
            onChange={handleInputChange(setProductPrice)}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Quantity</label>
          <Input
            type="number"
            min="0"
            value={product_quantity}
            onChange={handleInputChange(setProductQuantity)}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Discount Price</label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={product_discount}
            onChange={handleInputChange(setProductDiscountPrice)}
          />
        </div>
        <div className="form-group">
          <label>GST</label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={GST}
            onChange={handleGstChange}
          />
        </div>
        <div className="form-group">
          <label>Product Tax</label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={Product_tax}
            onChange={handleTaxChange}
          />
        </div>
        <div className="form-group">
          <label>Shipping Charges</label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={shipping_charge}
            onChange={handleInputChange(setShippingCharges)}
          />
        </div>
        <div className="form-group">
          <label>Product Video</label>
          <Input
            type="file"
            accept="video/*"
            onChange={handleUploadChange(setVideo)}
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
                <Select.Option value="Text">Text</Select.Option>
                <Select.Option value="Color">Color</Select.Option>
                <Select.Option value="Charm">Charm</Select.Option>
              </Select>
              {field.dropdownValue === "Color" && (
                <Checkbox.Group
                  onChange={(checkedValues) => {
                    handleColorCheckboxChange(field.id, checkedValues);
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
                    handleCharmCheckboxChange(field.id, checkedValues);
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
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdate;
