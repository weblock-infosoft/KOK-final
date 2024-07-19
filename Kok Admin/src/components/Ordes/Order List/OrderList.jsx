import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";
import "jspdf-autotable";
import { Button, Table, Typography, message } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Svg/Logo/Logo.png";

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

const OrderList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/getorderlist`,
        { order_id: 0 },
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching data.");
      setLoading(false);
    }
  };

  const handleOrderData = async (order_id) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/getorderlist`,
        { order_id },
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        }
      );
      setOrderData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order details:", error);
      message.error("Error fetching order details.");
      setLoading(false);
    }
  };

  const handleOrderClick = async (order_id) => {
    // Reset orderData state
    setOrderData(null);
    navigate("/viewOrders", { state: { order_id } });
  };

  const handleGeneratePdf = async (order_id) => {
    // Reset orderData state
    setOrderData(null);

    // Fetch order data
    await handleOrderData(order_id);

    // Check if orderData is available
    if (!orderData) {
      message.error("Order details not available.");
      return;
    }

    // Generate and download PDF
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const rightMargin = 10;

    // Add company logo
    doc.addImage(logo, "PNG", 10, 10, 50, 20);

    // Add business name and customer details
    doc.setFontSize(18);
    doc.text("Business Name", 10, 40);
    doc.text("Bill To:", pageWidth - rightMargin, 40, { align: "right" });

    doc.setFontSize(12);
    const customerDetails = `${orderData.user_first_name || "-"} ${
      orderData.user_last_name || "-"
    }\n${orderData.user_address || "-"}\n${orderData.user_state || "-"}, ${
      orderData.user_country || "-"
    }, ${orderData.user_pincode || "-"}\nMobile: ${
      orderData.user_mobile_no || "-"
    }`;
    doc.text(customerDetails, pageWidth - rightMargin, 50, { align: "right" });

    // Add invoice details
    doc.text(`Invoice No: ${orderData.order_id || "-"}`, 10, 60);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 70);

    // Add product details as a table
    const tableColumn = [
      "Product Name",
      "Description",
      "Tax",
      "GST",
      "Price",
      "Quantity",
      "Total",
    ];
    const tableRows = [];

    let totalPrice = 0;
    let totalTaxOrGst = 0;

    orderData.OrderTrndata.forEach((subItem) => {
      const productData = subItem.productdata[0];
      const quantity = subItem.product_quantity || 0;

      let totalTax = 0;
      let totalGst = 0;

      // Calculate total tax if Product_tax is defined
      if (subItem.Product_tax !== undefined) {
        totalTax = subItem.Product_tax * quantity;
      }

      // Calculate total GST if GST is defined
      if (productData.Product_GST !== undefined) {
        totalGst =
          ((subItem.product_price / quantity) * productData.Product_GST) / 100;
      }

      // Calculate total price for the item
      const itemTotalPrice = totalTax + totalGst + (subItem.product_price || 0);
      totalPrice += itemTotalPrice;

      // Accumulate total tax or GST for the order
      totalTaxOrGst += totalTax + totalGst;

      const productDetails = [
        productData.product_name || "-",
        productData.product_description || "-",
        totalTax.toFixed(2) || "-",
        productData.Product_GST !== undefined
          ? productData.Product_GST + "%"
          : "-",
        subItem.product_price !== undefined
          ? subItem.product_price.toFixed(2)
          : "-",
        subItem.product_quantity || "-",
        itemTotalPrice.toFixed(2) || "-",
      ];
      tableRows.push(productDetails);
    });

    // Add total tax and total GST row
    const totalTaxRow = [
      "Total Tax And Gst",
      "",
      "",
      "",
      "",
      "",
      totalTaxOrGst.toFixed(2) || "-",
    ];
    tableRows.push(totalTaxRow);

    // Add shipping charge
    const shippingCharge =
      orderData.OrderTrndata[0].productdata[0].shipping_charge || 0;
    const shippingChargeRow = [
      "Shipping Charge",
      "",
      "",
      "",
      "",
      "",
      shippingCharge.toFixed(2) || "-",
    ];
    tableRows.push(shippingChargeRow);

    // Calculate total payable amount
    const totalPayableAmt = totalPrice + shippingCharge;
    const totalPriceRow = [
      "Total Payable Amt",
      "",
      "",
      "",
      "",
      "",
      totalPayableAmt.toFixed(2) || "-",
    ];
    tableRows.push(totalPriceRow);

    // Generate the table
    doc.autoTable({
      startY: 80,
      head: [tableColumn],
      body: tableRows,
    });

    // Save the PDF
    doc.save("order-summary.pdf");
  };

  useEffect(() => {
    setTimeout(function () {
      fetchData();
      console.log("This will run after 5 seconds");
    }, 5000);
  }, []);

  return (
    <>
      <Title level={2}>Order List</Title>

      <StyledTable
        dataSource={data}
        rowKey="id"
        pagination={false}
        loading={loading}
      >
        <Column
          title="Order ID"
          dataIndex="order_id"
          render={(text, record) => (
            <span
              style={{ cursor: "pointer", color: "#1890ff" }}
              onClick={() => handleOrderClick(record.order_id)}
            >
              {record.order_id}
            </span>
          )}
        />
        <Column
          title="User First Name"
          dataIndex={["userName", "user_first_name"]}
          key="user_first_name"
        />
        <Column
          title="User Last Name"
          dataIndex={["userName", "user_last_name"]}
          key="user_last_name"
        />
        <Column title="Order Total" dataIndex="order_total" key="order_total" />
        <Column
          title="Payment Type"
          dataIndex="payment_type"
          key="payment_type"
        />
        <Column
          title="Status Name"
          dataIndex={["ordersattus", "status_name"]}
          key="status_name"
        />
        <Column
          title="Generate Pdf"
          key="Generate Pdf"
          render={(text, record) => (
            <Button onClick={() => handleGeneratePdf(record.order_id)}>
              Generate Pdf
            </Button>
          )}
        />
      </StyledTable>
    </>
  );
};

export default OrderList;
