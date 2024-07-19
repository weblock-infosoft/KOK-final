import React, { useEffect } from "react";
import { Modal, Button } from "antd";
import { Table } from "antd";
import styled from "styled-components";
import axios from "axios";

const { Column } = Table;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #36304a;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
`;

const UserListAllData = ({ user, open, setOpen, fetchData }) => {

    useEffect(() => {
    }, [user]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        // try {
        //     await axios.delete(
        //         `${process.env.REACT_APP_API_BASE_URL}/Admin/deleteUser/${user.user_id}`,
        //         {
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 "Auth-Token": localStorage.getItem("auth_token"),
        //             },
        //         }
        //     );
        //     fetchData();
        //     setOpen(false);
        // } catch (error) {
        //     console.error("Error deleting user:", error);
        // }
    };

    if (!user) {
        return null;
    }

    return (
        <Modal
            title={`User Details - ${user.user_first_name} ${user.user_last_name}`}
            className="user-list-modal"
            visible={open}
            onCancel={handleClose}
            footer={[
                // <Button key="delete" type="danger" onClick={handleDelete}>
                //     Delete User
                // </Button>,
                <Button key="close" onClick={handleClose}>
                    Close
                </Button>,
            ]}
        >
            <StyledTable dataSource={[user]} rowKey="user_id" pagination={false}>
                <Column
                    title="User Address"
                    dataIndex="user_address"
                    key="user_address"
                />
                <Column
                    title="User Pincode"
                    dataIndex="user_pincode"
                    key="user_pincode"
                />
                <Column
                    title="User Country"
                    dataIndex="user_country"
                    key="user_country"
                />
                <Column
                    title="User State"
                    dataIndex="user_state"
                    key="user_state"
                />
            </StyledTable>
        </Modal>
    );
};

export default UserListAllData;
