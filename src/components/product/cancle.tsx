import React, { FC, useState, useCallback, useMemo, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ContentFallback } from "components/content-fallback";
import ConfirmationModal from "./ConfirmationModal";
import { listStoreState } from "states/store.state";
import { getOrderDetailstate } from "states/order.state";
import { OrderStatus } from "types/order";
import orderApi from "api/order";

interface CancelOrderProps {
  orderId: string;
}

export const CancelOrder: FC<CancelOrderProps> = ({ orderId }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [canCancel, setCanCancel] = useState(true); // State to track if cancellation is allowed
  const [elapsedTime, setElapsedTime] = useState(0);
  const stores = useRecoilValue(listStoreState);
  const orderDetail = useRecoilValue(getOrderDetailstate(orderId));
  const store = useMemo(
    () => stores.find((store) => store.name === orderDetail.storeName),
    [stores, orderDetail.storeName]
  );

  useEffect(() => {
    if (orderDetail.checkInDate) {
      const createTime = new Date(orderDetail.checkInDate);
      const currentTime = new Date();
      setElapsedTime((currentTime.getTime() - createTime.getTime()) / 1000);
      if (elapsedTime > 120) {
        setCanCancel(false);
      }
    }
  }, [orderDetail, elapsedTime]);

  const cancel = useCallback(async () => {
    if (!store) {
      console.error("Store not found");
      setShowModal(false);
      return;
    }

    setLoading(true);
    try {
      const orderStatusCart = {
        status: OrderStatus.CANCELED,
        paymentType: orderDetail.paymentType,
        guestNumber: orderDetail.customerNumber,
        deliStatus: "PENDING",
      };
      await orderApi.setOrderStatus(orderStatusCart, store.id, orderId);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to cancel the order:", error);
    } finally {
      setLoading(false);
    }
  }, [orderDetail, store, orderId]);

  return (
    <>
      {loading ? (
        <ContentFallback />
      ) : (
        <>
          {canCancel ? (
            <>
              <button
                className={`font-bold p-1 pl-6 pr-6 rounded-md text-white text-sm  ${
                  !canCancel
                    ? "bg-gray "
                    : "bg-red-500 hover:text-red-200 hover:bg-red-700"
                }`}
                onClick={() => canCancel && setShowModal(true)} // Show modal only if canCancel is true
                disabled={!canCancel}
              >
                Hủy đơn
              </button>

              <ConfirmationModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onCancel={() => setShowModal(false)}
                onConfirm={cancel}
              />
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};
