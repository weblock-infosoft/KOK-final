import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import {
  ShoppingOutlined,
  LogoutOutlined,
  UserOutlined,
  CreditCardOutlined,
  OrderedListOutlined,
  AppstoreOutlined,
  ContactsOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { Menu, message } from "antd";
import Logo from "../assets/Svg/Logo/Logo.png";
import "./AdminPanel.css";

// Importing all necessary components
import LoginForm from "./Login Page/LoginForm";
// Products
import Dashboard from "./Dashboard/Dashboard";
import ProductListItem from "./Product List/ProductListItem/ProductListItem";
import ProductInsertData from "./Product List/ProductInsertData/ProductInsertData";
import AddColor from "./Product List/Colors/AddColor";
import CouponCard from "./Product List/CouponCard/CouponCard";
import AddCharm from "./Product List/AddCharm/AddCharm";
import ShowTopPicks from "./Product List/ShowTopPikes/ShowTopPikes";
import ShowBestSellers from "./Product List/ShowBestSellers/ShowBestSellers";
import AddCategores from "./Product List/AddCategores/AddCategores";
import Comment from "./Product List/Comment/Comment";
import Testimonials from "./Product List/Testimonials/Testimonials";
import ProductUpdate from "./Product List/ProductUpdate/ProductUpdate";
// Users
import UserList from "./User/User List/UserList";
import TopBuyers from "./User/Top Buyers/TopBuyers";
// Orders
import OrderList from "./Ordes/Order List/OrderList";
import ViewOrders from "./Ordes/View Orders/ViewOrders";
import OrderStatus from "./Ordes/Order Status/OrderStatus";
// Contact Details
import ContactDetails from "./Contact Details/ContactDetails";
// Banking
import Banking from "./Payment/Banking/Banking";
// Image Upload
import HeaderimagesUpload from "./Images Upload/Header Images/HeaderimagesUpload";
import HeaderImageOne from "./Images Upload/HeaderImage One/HeaderImageOne";
import HeaderImageTwo from "./Images Upload/HeaderImage Two/HeaderImageTwo";
import FooterImageUpalod from "./Images Upload/FooterImage Upalod/FooterImageUpalod";
import Subscription from "./Images Upload/Subscription/Subscription";
import AllEmail from "./Images Upload/All Email/AllEmail";
import AddStar from "../components/Add Star/AddStar";

// Define sidebar items
const items = [
  {
    key: "dashboard",
    icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: "sub1",
    label: <Link to="/productListItem">Product Management</Link>,
    icon: <ShoppingOutlined style={{ fontSize: "20px" }} />,
    children: [
      {
        key: "AddCategores",
        label: <Link to="/addCategores">Add Categories</Link>,
      },
      {
        key: "Product Add",
        label: <Link to="/productInsertData">Product Insert Data</Link>,
      },
      { key: "CouponCard", label: <Link to="/couponCard">Coupon Card</Link> },
      { key: "add-color", label: <Link to="/addColor">Add Color</Link> },
      { key: "add-charm", label: <Link to="/addCharm">Add Charm</Link> },
      { key: "AddStar", label: <Link to="/addStar">Add Star Review </Link> },
      {
        key: "show-top-pikes",
        label: <Link to="/ShowTopPicks">Top Picks</Link>,
      },
      {
        key: "show-best-sellers",
        label: <Link to="/showBestSellers">Best Sellers</Link>,
      },
      {
        key: "Comment",
        label: <Link to="/comment">Review</Link>,
      },
      {
        key: "Testimonials",
        label: <Link to="/testimonials">Testimonials</Link>,
      },
    ],
  },
  {
    key: "sub2",
    label: "User",
    icon: <UserOutlined style={{ fontSize: "20px" }} />,
    children: [
      { key: "User List", label: <Link to="/userList">User List</Link> },
      { key: "Top Buyers", label: <Link to="/topBuyers">Top Buyers</Link> },
    ],
  },
  {
    key: "ContactDetails",
    icon: <ContactsOutlined style={{ fontSize: "20px" }} />,
    label: <Link to="/contactDetails">Contact Details</Link>,
  },
  {
    key: "Orders",
    icon: <OrderedListOutlined style={{ fontSize: "20px" }} />,
    label: <Link to="/orderList">Order List</Link>,
  },
  {
    key: "sub4",
    icon: <CreditCardOutlined style={{ fontSize: "20px" }} />,
    label: <Link to="/banking">Banking</Link>,
  },
  {
    key: "sub5",
    label: "Upload Images",
    icon: <CloudUploadOutlined style={{ fontSize: "25px" }} />,
    children: [
      {
        key: "HeaderimagesUpload",
        label: <Link to="/headerimagesUpload">Header Images Upload</Link>,
      },
      {
        key: "HeaderImageOne",
        label: <Link to="/headerImageOne">Header Image One Upalod</Link>,
      },
      {
        key: "HeaderImageTwo",
        label: <Link to="/headerImageTwo">Header Image Two Upalod</Link>,
      },
      {
        key: "Subscription",
        label: <Link to="/subscription">Subscription</Link>,
      },
      {
        key: "AllEmail",
        label: <Link to="/allEmail">All Email</Link>,
      },
      {
        key: "footerImageUpalod",
        label: <Link to="/footerImageUpalod">Footer Image Upalod</Link>,
      },
    ],
  },
  {
    key: "logout",
    icon: <LogoutOutlined style={{ fontSize: "20px" }} />,
    label: "Log Out",
  },
];

// Sidebar component with a logo click handler
const Sidebar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  return (
    <div style={{ width: 250, height: "100vh", position: "fixed" }}>
      <div style={{ textAlign: "center", padding: "10px 0" }}>
        <img
          src={Logo}
          alt="Logo"
          style={{ width: "80%", height: "auto", cursor: "pointer" }}
          onClick={handleLogoClick} // Logo click handler
        />
      </div>
      <Menu
        style={{ height: "100vh", overflow: "auto" }}
        mode="inline"
        items={items}
        onClick={onMenuClick}
      />
    </div>
  );
};

const AdminPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const noNavFooterPaths = ["/Login"];
  const [authToken, setAuthToken] = useState(null);

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setAuthToken(null);
    message.success("Logout successfully.");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setAuthToken(token);

    if (token && location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [location, navigate]);

  return (
    <div className="admin-panel">
      {authToken ? (
        <>
          {!noNavFooterPaths.includes(location.pathname) && (
            <Sidebar onMenuClick={handleMenuClick} />
          )}
          <div className="content" style={{ marginLeft: 256, padding: 20 }}>
            <Routes>
              <Route
                path="/"
                element={<LoginForm setAuthToken={setAuthToken} />}
              />
              <Route path="/dashBoard" element={<Dashboard />} />
              <Route path="/couponCard" element={<CouponCard />} />
              <Route path="/addColor" element={<AddColor />} />
              <Route path="/addCharm" element={<AddCharm />} />
              <Route path="/ShowTopPicks" element={<ShowTopPicks />} />
              <Route path="/showBestSellers" element={<ShowBestSellers />} />
              <Route path="/addCategores" element={<AddCategores />} />
              <Route path="/comment" element={<Comment />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/productUpdate" element={<ProductUpdate />} />
              <Route
                path="/productInsertData"
                element={<ProductInsertData />}
              />
              <Route path="/userList" element={<UserList />} />
              <Route path="/topBuyers" element={<TopBuyers />} />
              <Route path="/orderList" element={<OrderList />} />
              <Route path="/viewOrders" element={<ViewOrders />} />
              <Route path="/orderStatus" element={<OrderStatus />} />
              <Route path="/banking" element={<Banking />} />
              <Route path="/productListItem" element={<ProductListItem />} />
              <Route path="/headerImageOne" element={<HeaderImageOne />} />
              <Route path="/headerImageTwo" element={<HeaderImageTwo />} />
              <Route path="/allEmail" element={<AllEmail />} />
              <Route
                path="/headerimagesUpload"
                element={<HeaderimagesUpload />}
              />
              <Route
                path="/footerImageUpalod"
                element={<FooterImageUpalod />}
              />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/contactDetails" element={<ContactDetails />} />
              <Route path="/addStar" element={<AddStar />} />
            </Routes>
          </div>
        </>
      ) : (
        <LoginForm setAuthToken={setAuthToken} />
      )}
    </div>
  );
};

export default AdminPanel;
