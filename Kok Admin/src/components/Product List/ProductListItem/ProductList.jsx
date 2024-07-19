import React from "react";
import { Modal, Button } from "antd";

const ProductListModal = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            title="Bulk Product Upload"
            className="bulk-upload-modal"
            visible={open}
            onCancel={handleClose}
            footer={[
                <Button key="close" onClick={handleClose}>
                    Close
                </Button>,
            ]}
        >
            <p>Content for Bulk Product Upload modal goes here.</p>
        </Modal>
    );
};

export default ProductListModal;
