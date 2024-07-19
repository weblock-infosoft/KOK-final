// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PlusOutlined } from "@ant-design/icons";
// import styled from "styled-components";
// import {
//   Typography,
//   Divider,
//   Image,
//   Upload,
//   Button,
//   message,
//   Table,
//   Spin,
// } from "antd";

// const { Title } = Typography;
// const { Column } = Table;
// const { Text } = Typography;

// const StyledTable = styled(Table)`
//   .ant-table-thead > tr > th {
//     background-color: #36304a;
//     color: #fff;
//     font-weight: bold;
//     text-align: center;
//   }
// `;

// const HeaderimagesUpload = () => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [imagesToUpload, setImagesToUpload] = useState([]);
//   const [productCategory, setProductCategory] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [productFillByCategory, setProductFillByCategory] = useState([]);
//   const [selectionType, setSelectionType] = useState("checkbox");
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);

//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [bannerImage1, setBannerImage1] = useState(null);

//   // console.log('categories>>++', categories)
//   // console.log('productFillByCategory++>>', productFillByCategory)
//   // console.log('imagesToUpload++>>', imagesToUpload)

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: (newSelectedRowKeys) => {
//       setSelectedRowKeys(newSelectedRowKeys);
//     },
//     getCheckboxProps: (record) => ({
//       name: record.name,
//     }),
//   };

//   const handleCategoryChange = (e) => {
//     setProductCategory(e.target.value);
//   };

//   const handleFileChange = ({ fileList }) => {
//     if (fileList.length > 0) {
//       setImage1(fileList[0]);
//     } else {
//       setImage1(null);
//     }
//   };

//   const handleBannerFileChange = ({ fileList }) => {
//     if (fileList.length > 0) {
//       setBannerImage1(fileList[0]);
//     } else {
//       setBannerImage1(null);
//     }
//   };

//   const handleImage2FileChange = ({ fileList }) => {
//     if (fileList.length > 0) {
//       setImage2(fileList[0]);
//     } else {
//       setImage2(null);
//     }
//   };

//   // const handleFileChange = ({ fileList }) => {
//   //   const limitedFileList = fileList.slice(-3);
//   //   setImagesToUpload(limitedFileList);

//   //   if (fileList.length > 3) {
//   //     message.error("You can upload a maximum of 3 images.");
//   //   }
//   // };

//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   );

//   const handlePreview = async (file) => {
//     setPreviewImage(file.url || file.thumbUrl);
//     setPreviewOpen(true);
//   };

//   const handleUploadImages = async () => {
//     // if (imagesToUpload.length === 0) {
//     //   message.warning("Please upload images.");
//     //   return;
//     // }

//     // if (imagesToUpload.length > 3) {
//     //   message.error("You can upload a maximum of 3 images.");
//     //   return;
//     // }

//     // if (selectedRowKeys.length === 0) {
//     //   message.warning("Please select at least one product.");
//     //   return;
//     // }

//     const formData = new FormData();

//     const reader = new FileReader();
//     const bannerReader = new FileReader();
//     const handleImage2FileChange = new FileReader();

//     reader.onload = async (e) => {
//       const arrayBuffer = e.target.result;
//       const uint8Array = new Uint8Array(arrayBuffer);
//       formData.append("image1", new Blob([uint8Array]));

//       bannerReader.onload = async (e) => {
//         const bannerArrayBuffer = e.target.result;
//         const bannerUint8Array = new Uint8Array(bannerArrayBuffer);
//         formData.append("image2", new Blob([bannerUint8Array]));

//         handleImage2FileChange.onload = async (e) => {
//           const bannerArrayBuffer = e.target.result;
//           const bannerUint8Array = new Uint8Array(bannerArrayBuffer);
//           formData.append("image3", new Blob([bannerUint8Array]));

//           let i = 0;
//           const a = [];
//           imagesToUpload.forEach((image) => {
//             // formData.append("image", image.originFileObj);
//             // image.name = `image${i++}`;
//             // a.push(image.originFileObj)
//             const originalFile = image.originFileObj;
//             const newFileName = `image${++i}`;
//             const renamedFile = new File([originalFile], newFileName, {
//               type: originalFile.type,
//             });

//             // formData.append("image", renamedFile);
//             a.push(renamedFile);
//           });
//           console.log("***********************************", a);
//           // const productdata = {};
//           // const productData = selectedRowKeys.map((product_id) => ({ product_id }));
//           // const productData = selectedRowKeys.length > 0 ? selectedRowKeys.map((product_id) => ({ product_id })) : [{ product_id: 0 }];

//           const productData =
//             selectedRowKeys.length > 0
//               ? selectedRowKeys.map((product_id) => ({ product_id }))
//               : [{ product_id: 0 }];
//           formData.append("productData", JSON.stringify(productData));

//           // console.log("productData>>>>", productData);
//           // const newFileName = `image${++i}`;
//           // productdata.append(newFileName, productData);
//           formData.append("productData", JSON.stringify(productData));

//           console.log("formData>>", formData);
//           try {
//             setLoading(true);
//             const response = await axios.post(
//               `${process.env.REACT_APP_API_BASE_URL}/Admin/headerimagesInsUp`,
//               // formData,
//               {
//                 headers: {
//                   "Content-Type": "multipart/form-data",
//                   "Auth-Token": localStorage.getItem("auth_token"),
//                 },
//               }
//             );
//             setImagesToUpload([]);
//             setSelectedRowKeys([]);
//             message.success("Images upload successful.");
//             fetchData();
//           } catch (error) {
//             console.error("Error uploading images:", error);
//             message.error("Error uploading images.");
//           } finally {
//             setLoading(false);
//           }
//           handleImage2FileChange.readAsArrayBuffer(image2.originFileObj);
//         };

//         bannerReader.readAsArrayBuffer(bannerImage1.originFileObj);
//       };

//       reader.readAsArrayBuffer(image1.originFileObj);
//     };
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/Admin/headerimagesFill`,
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
//       message.error("Error fetching images.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getCategories = () => {
//     axios
//       .get(`${process.env.REACT_APP_API_BASE_URL}/Admin/categoryFill`, {
//         headers: {
//           "Content-Type": "application/json",
//           "Auth-Token": localStorage.getItem("auth_token"),
//         },
//       })
//       .then((response) => {
//         setCategories(response.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching categories:", error);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//     getCategories();
//   }, []);

//   useEffect(() => {
//     if (productCategory) {
//       axios
//         .post(
//           `${process.env.REACT_APP_API_BASE_URL}/Admin/productFillByCategory`,
//           { product_id: 0, category: productCategory },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "Auth-Token": localStorage.getItem("auth_token"),
//             },
//           }
//         )
//         .then((response) => {
//           setProductFillByCategory(response.data.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching products by category:", error);
//         });
//     }
//   }, [productCategory]);

//   return (
//     <>
//       <Title level={2}>Header Images Upload</Title>
//       <Divider />
//       <div>
//         <label>
//           Select Category <span className="abstract">*</span>
//         </label>
//         <select
//           name="productCategory"
//           className="ProductDesc"
//           value={productCategory}
//           onChange={handleCategoryChange}
//         >
//           <option value="">Select Category</option>
//           {categories.map((category) => (
//             <option key={category.category_id} value={category.category_id}>
//               {category.category_name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <StyledTable
//         dataSource={productFillByCategory}
//         pagination={false}
//         rowKey="product_id"
//         rowSelection={{
//           type: selectionType,
//           ...rowSelection,
//         }}
//         className="TableCss"
//       >
//         <Column
//           title="Product Name"
//           dataIndex="product_name"
//           key="product_name"
//         />
//         <Column
//           title="Product Category Name"
//           dataIndex="product_category_name"
//           key="product_category_name"
//         />
//         <Column
//           title="Product Image"
//           dataIndex="imagelink"
//           key="imagelink"
//           render={(imagelink) => (
//             <div style={{ textAlign: "center" }}>
//               {imagelink ? (
//                 <img
//                   src={imagelink}
//                   alt="Base64 Image"
//                   style={{ width: "100px" }}
//                 />
//               ) : (
//                 <span>No Image</span>
//               )}
//             </div>
//           )}
//         />
//         <Column
//           title="Product Price"
//           dataIndex="product_price"
//           key="product_price"
//         />
//         <Column
//           title="Active Status"
//           dataIndex="is_active"
//           key="is_active"
//           render={(is_active) => (
//             <span style={{ color: is_active ? "green" : "red" }}>
//               {is_active ? "Active" : "Deactive"}
//             </span>
//           )}
//         />
//       </StyledTable>
//       {/* <div>
//         <Upload
//           listType="picture-circle"
//           fileList={imagesToUpload}
//           onPreview={handlePreview}
//           onChange={handleFileChange}
//           beforeUpload={() => false}
//           multiple
//         >
//           {uploadButton}
//         </Upload>
//         <Text type="secondary">Select only three images </Text>
//         {previewImage && (
//           <Image
//             wrapperStyle={{
//               display: "none",
//             }}
//             preview={{
//               visible: previewOpen,
//               onVisibleChange: (visible) => setPreviewOpen(visible),
//               afterOpenChange: (visible) => !visible && setPreviewImage(""),
//             }}
//             src={previewImage}
//           />
//         )}
//       </div> */}
//       <div>
//         <Upload
//           listType="picture-circle"
//           fileList={image1 ? [image1] : []}
//           onPreview={handlePreview}
//           onChange={handleFileChange}
//           beforeUpload={() => false}
//         >
//           {image1 ? null : uploadButton}
//         </Upload>

//         {previewImage && (
//           <Image
//             wrapperStyle={{
//               display: "none",
//             }}
//             preview={{
//               visible: previewOpen,
//               onVisibleChange: (visible) => setPreviewOpen(visible),
//               afterOpenChange: (visible) => !visible && setPreviewImage(""),
//             }}
//             src={previewImage}
//           />
//         )}

//         <Upload
//           listType="picture-circle"
//           fileList={bannerImage1 ? [bannerImage1] : []}
//           onPreview={handlePreview}
//           onChange={handleBannerFileChange}
//           beforeUpload={() => false}
//         >
//           {bannerImage1 ? null : uploadButton}
//         </Upload>

//         <Upload
//           listType="picture-circle"
//           fileList={image2 ? [image2] : []}
//           onPreview={handlePreview}
//           onChange={handleImage2FileChange}
//           beforeUpload={() => false}
//         >
//           {image2 ? null : uploadButton}
//         </Upload>
//       </div>
//       <Button
//         style={{ marginTop: "30px", marginLeft: "10px" }}
//         onClick={handleUploadImages}
//         disabled={imagesToUpload.length === 0}
//       >
//         Upload Images
//       </Button>
//       <Divider />
//       <Title level={4}>Header Images</Title>
//       {loading ? (
//         <Spin size="large" />
//       ) : (
//         <StyledTable dataSource={data} rowKey="image_id" pagination={false}>
//           <Column
//             title="Image"
//             dataIndex="imagelink"
//             key="imagelink"
//             render={(imagelink) =>
//               imagelink ? (
//                 <Image
//                   src={imagelink}
//                   alt="Category"
//                   width={250}
//                   height={250}
//                 />
//               ) : (
//                 "No Image"
//               )
//             }
//           />
//         </StyledTable>
//       )}
//     </>
//   );
// };

// export default HeaderimagesUpload;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PlusOutlined } from "@ant-design/icons";
// import styled from "styled-components";
// import {
//   Typography,
//   Divider,
//   Image,
//   Upload,
//   Button,
//   message,
//   Table,
//   Spin,
// } from "antd";

// const { Title } = Typography;
// const { Column } = Table;
// const { Text } = Typography;

// const StyledTable = styled(Table)`
//   .ant-table-thead > tr > th {
//     background-color: #36304a;
//     color: #fff;
//     font-weight: bold;
//     text-align: center;
//   }
// `;

// const HeaderimagesUpload = () => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [imagesToUpload, setImagesToUpload] = useState([]);
//   const [productCategory, setProductCategory] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [productFillByCategory, setProductFillByCategory] = useState([]);
//   const [selectionType, setSelectionType] = useState("checkbox");
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);

//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [bannerImage1, setBannerImage1] = useState(null);

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: (newSelectedRowKeys) => {
//       setSelectedRowKeys(newSelectedRowKeys);
//     },
//     getCheckboxProps: (record) => ({
//       name: record.name,
//     }),
//   };

//   const handleCategoryChange = (e) => {
//     setProductCategory(e.target.value);
//   };

//   const handleFileChange = ({ fileList }) => {
//     if (fileList.length > 0) {
//       setImage1(fileList[0]);
//     } else {
//       setImage1(null);
//     }
//   };

//   const handleBannerFileChange = ({ fileList }) => {
//     if (fileList.length > 0) {
//       setBannerImage1(fileList[0]);
//     } else {
//       setBannerImage1(null);
//     }
//   };

//   const handleImage2FileChange = ({ fileList }) => {
//     if (fileList.length > 0) {
//       setImage2(fileList[0]);
//     } else {
//       setImage2(null);
//     }
//   };

//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   );

//   const handlePreview = async (file) => {
//     setPreviewImage(file.url || file.thumbUrl);
//     setPreviewOpen(true);
//   };

//   const handleUploadImages = async () => {
//     const formData = new FormData();

//     const reader = new FileReader();
//     const bannerReader = new FileReader();
//     const image2Reader = new FileReader();

//     reader.onload = async (e) => {
//       const arrayBuffer = e.target.result;
//       const uint8Array = new Uint8Array(arrayBuffer);
//       formData.append("image1", new Blob([uint8Array]));

//       bannerReader.onload = async (e) => {
//         const bannerArrayBuffer = e.target.result;
//         const bannerUint8Array = new Uint8Array(bannerArrayBuffer);
//         formData.append("image2", new Blob([bannerUint8Array]));

//         image2Reader.onload = async (e) => {
//           const image2ArrayBuffer = e.target.result;
//           const image2Uint8Array = new Uint8Array(image2ArrayBuffer);
//           formData.append("image3", new Blob([image2Uint8Array]));

//           const productData =
//             selectedRowKeys.length > 0
//               ? selectedRowKeys.map((product_id) => ({ product_id }))
//               : [{ product_id: 0 }];
//           formData.append("productData", JSON.stringify(productData));

//           try {
//             setLoading(true);
//             const response = await axios.post(
//               `${process.env.REACT_APP_API_BASE_URL}/Admin/headerimagesInsUp`,
//               formData,
//               {
//                 headers: {
//                   "Content-Type": "multipart/form-data",
//                   "Auth-Token": localStorage.getItem("auth_token"),
//                 },
//               }
//             );
//             setImage1(null);
//             setBannerImage1(null);
//             setImage2(null);
//             setSelectedRowKeys([]);
//             message.success("Images upload successful.");
//             fetchData();
//           } catch (error) {
//             console.error("Error uploading images:", error);
//             message.error("Error uploading images.");
//           } finally {
//             setLoading(false);
//           }
//         };

//         image2Reader.readAsArrayBuffer(image2.originFileObj);
//       };

//       bannerReader.readAsArrayBuffer(bannerImage1.originFileObj);
//     };

//     reader.readAsArrayBuffer(image1.originFileObj);
//   };

// const fetchData = async () => {
//   setLoading(true);
//   try {
//     const response = await axios.get(
//       `${process.env.REACT_APP_API_BASE_URL}/Admin/headerimagesFill`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Auth-Token": localStorage.getItem("auth_token"),
//         },
//       }
//     );
//     setData(response.data.data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     message.error("Error fetching images.");
//   } finally {
//     setLoading(false);
//   }
// };

//   const getCategories = () => {
//     axios
//       .get(`${process.env.REACT_APP_API_BASE_URL}/Admin/categoryFill`, {
//         headers: {
//           "Content-Type": "application/json",
//           "Auth-Token": localStorage.getItem("auth_token"),
//         },
//       })
//       .then((response) => {
//         setCategories(response.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching categories:", error);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//     getCategories();
//   }, []);

//   useEffect(() => {
//     if (productCategory) {
//       axios
//         .post(
//           `${process.env.REACT_APP_API_BASE_URL}/Admin/productFillByCategory`,
//           { product_id: 0, category: productCategory },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "Auth-Token": localStorage.getItem("auth_token"),
//             },
//           }
//         )
//         .then((response) => {
//           setProductFillByCategory(response.data.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching products by category:", error);
//         });
//     }
//   }, [productCategory]);

//   return (
//     <>
//       <Title level={2}>Header Images Upload</Title>
//       <Divider />
//       <div>
//         <label>
//           Select Category <span className="abstract">*</span>
//         </label>
//         <select
//           name="productCategory"
//           className="ProductDesc"
//           value={productCategory}
//           onChange={handleCategoryChange}
//         >
//           <option value="">Select Category</option>
//           {categories.map((category) => (
//             <option key={category.category_id} value={category.category_id}>
//               {category.category_name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <StyledTable
//         dataSource={productFillByCategory}
//         pagination={false}
//         rowKey="product_id"
//         rowSelection={{
//           type: selectionType,
//           ...rowSelection,
//         }}
//         className="TableCss"
//       >
//         <Column
//           title="Product Name"
//           dataIndex="product_name"
//           key="product_name"
//         />
//         <Column
//           title="Product Category Name"
//           dataIndex="product_category_name"
//           key="product_category_name"
//         />
//         <Column
//           title="Product Image"
//           dataIndex="imagelink"
//           key="imagelink"
//           render={(imagelink) => (
//             <div style={{ textAlign: "center" }}>
//               {imagelink ? (
//                 <img
//                   src={imagelink}
//                   alt="Base64 Image"
//                   style={{ width: "100px" }}
//                 />
//               ) : (
//                 <span>No Image</span>
//               )}
//             </div>
//           )}
//         />
//         <Column
//           title="Product Price"
//           dataIndex="product_price"
//           key="product_price"
//         />
//         <Column
//           title="Active Status"
//           dataIndex="is_active"
//           key="is_active"
//           render={(is_active) => (
//             <span style={{ color: is_active ? "green" : "red" }}>
//               {is_active ? "Active" : "Deactive"}
//             </span>
//           )}
//         />
//       </StyledTable>

//       <div>
//         <Upload
//           listType="picture-circle"
//           fileList={image1 ? [image1] : []}
//           onPreview={handlePreview}
//           onChange={handleFileChange}
//           beforeUpload={() => false}
//         >
//           {image1 ? null : uploadButton}
//         </Upload>

//         {previewImage && (
//           <Image
//             wrapperStyle={{
//               display: "none",
//             }}
//             preview={{
//               visible: previewOpen,
//               onVisibleChange: (visible) => setPreviewOpen(visible),
//               afterOpenChange: (visible) => !visible && setPreviewImage(""),
//             }}
//             src={previewImage}
//           />
//         )}

//         <Upload
//           listType="picture-circle"
//           fileList={bannerImage1 ? [bannerImage1] : []}
//           onPreview={handlePreview}
//           onChange={handleBannerFileChange}
//           beforeUpload={() => false}
//         >
//           {bannerImage1 ? null : uploadButton}
//         </Upload>

//         <Upload
//           listType="picture-circle"
//           fileList={image2 ? [image2] : []}
//           onPreview={handlePreview}
//           onChange={handleImage2FileChange}
//           beforeUpload={() => false}
//         >
//           {image2 ? null : uploadButton}
//         </Upload>
//       </div>
//       <Button
//         style={{ marginTop: "30px", marginLeft: "10px" }}
//         onClick={handleUploadImages}
//         disabled={!image1 || !bannerImage1 || !image2}
//       >
//         Upload Images
//       </Button>
// <Divider />
// <Title level={4}>Header Images</Title>
// {loading ? (
//   <Spin size="large" />
// ) : (
//   <StyledTable dataSource={data} rowKey="image_id" pagination={false}>
//     <Column
//       title="Image"
//       dataIndex="imagelink"
//       key="imagelink"
//       render={(imagelink) =>
//         imagelink ? (
//           <Image
//             src={imagelink}
//             alt="Category"
//             width={250}
//             height={250}
//           />
//         ) : (
//           "No Image"
//         )
//       }
//     />
//   </StyledTable>
// )}
//     </>
//   );
// };

// export default HeaderimagesUpload;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
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

const { Title } = Typography;
const { Column } = Table;
const { Text } = Typography;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #36304a;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
`;

const HeaderimagesUpload = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [productCategory, setProductCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [productFillByCategory, setProductFillByCategory] = useState([]);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [bannerImage1, setBannerImage1] = useState(null);
  const [data1, setData1] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  const handleCategoryChange = (e) => {
    setProductCategory(e.target.value);
  };

  const handleFileChange = ({ fileList }) => {
    if (fileList.length > 0) {
      setImage1(fileList[0]);
    } else {
      setImage1(null);
    }
  };

  const handleBannerFileChange = ({ fileList }) => {
    if (fileList.length > 0) {
      setBannerImage1(fileList[0]);
    } else {
      setBannerImage1(null);
    }
  };

  const handleImage2FileChange = ({ fileList }) => {
    if (fileList.length > 0) {
      setImage2(fileList[0]);
    } else {
      setImage2(null);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
  };

  const handleUploadImages = async () => {
    const formData = new FormData();

    // Append images
    formData.append("image1", image1.originFileObj);
    formData.append("image2", bannerImage1.originFileObj);
    formData.append("image3", image2.originFileObj);

    const payload = [];

    payload.push(
      {
        image1: selectedRowKeys.length > 0 ? selectedRowKeys[0] : 0,
      },
      {
        image2: selectedRowKeys.length > 0 ? selectedRowKeys[0] : 0,
      },
      {
        image3: selectedRowKeys.length > 0 ? selectedRowKeys[0] : 0,
      }
    );

    // Append product data to formData
    formData.append("product_ids", JSON.stringify(payload));

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/headerimagesInsUp`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      setImage1(null);
      setBannerImage1(null);
      setImage2(null);
      setSelectedRowKeys([]);
      message.success("Images upload successful.");
      fetchData();
    } catch (error) {
      console.error("Error uploading images:", error);
      message.error("Error uploading images.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDataImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/headerimagesFill`,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      setData1(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching images.");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/headerimagesFill`,
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
      message.error("Error fetching images.");
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    fetchData();
    fetchDataImages();
    getCategories();
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
      <Title level={2}>Header Images Upload</Title>
      <Divider />
      <div>
        <label>
          Select Category <span className="abstract">*</span>
        </label>
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
          title="Product Category Name"
          dataIndex="product_category_name"
          key="product_category_name"
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

      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <Upload
            listType="picture-circle"
            fileList={image1 ? [image1] : []}
            onPreview={handlePreview}
            onChange={handleFileChange}
            beforeUpload={() => false}
          >
            {image1 ? null : uploadButton}
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

          <Upload
            listType="picture-circle"
            fileList={bannerImage1 ? [bannerImage1] : []}
            onPreview={handlePreview}
            onChange={handleBannerFileChange}
            beforeUpload={() => false}
          >
            {bannerImage1 ? null : uploadButton}
          </Upload>

          <Upload
            listType="picture-circle"
            fileList={image2 ? [image2] : []}
            onPreview={handlePreview}
            onChange={handleImage2FileChange}
            beforeUpload={() => false}
          >
            {image2 ? null : uploadButton}
          </Upload>
        </div>

        <div className="btnSubmit">
          <Button
            type="primary"
            loading={loading}
            onClick={handleUploadImages}
            disabled={!image1 || !bannerImage1 || !image2}
          >
            Submit
          </Button>
        </div>
      </div>

      <Divider />
      <Title level={4}>Header Images</Title>
      {loading ? (
        <Spin size="large" />
      ) : (
        <StyledTable dataSource={data1} rowKey="image_id" pagination={false}>
          <Column
            title="Image"
            dataIndex="imagelink"
            key="imagelink"
            render={(imagelink) =>
              imagelink ? (
                <Image
                  src={imagelink}
                  alt="Category"
                  width={250}
                  height={250}
                />
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

export default HeaderimagesUpload;
