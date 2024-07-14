import React, { FC } from "react";
import { Modal, Button } from "react-bootstrap";
import { Box } from "zmp-ui";

interface ConfirmationModalProps {
  show: boolean;
  onHide: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  show,
  onHide,
  onCancel,
  onConfirm,
}) => {
  const modalStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 1050,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu làm mờ nền
    display: show ? "block" : "none", // Hiển thị modal khi show là true
  };

  const modalContentStyle: React.CSSProperties = {
    top: 220,
    position: "relative",
    backgroundColor: "#fff",
    // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    padding: "50px 40px",
    borderRadius: "5px",
    margin: "10vh auto", // Canh giữa theo chiều dọc
    maxWidth: "80%",
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <div style={modalStyle as React.CSSProperties}>
        <div style={modalContentStyle as React.CSSProperties}>
          <Modal.Header className="text-center font-bold text-xl" closeButton>
            <Modal.Title>Bạn chắc chắn muốn hủy đơn này?</Modal.Title>
          </Modal.Header>
          {/* <Modal.Body className="text-center mb-7">
            Bạn có chắc chắn muốn hủy đơn này không?
          </Modal.Body> */}
          <Modal.Footer className="ml-12 flex ">
            <Box>
              <Button
                className="p-3 bg-primary font-bold text-lg rounded-lg"
                onClick={onConfirm}
              >
                Đồng ý
              </Button>
            </Box>
            <Box>
              <Button
                className="ml-24 p-3 bg-primary font-bold text-lg rounded-lg"
                variant="primary"
                onClick={onCancel}
              >
                Hủy bỏ
              </Button>
            </Box>
          </Modal.Footer>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
