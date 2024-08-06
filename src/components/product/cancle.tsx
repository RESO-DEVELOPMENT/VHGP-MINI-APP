import React, { FC, useState, useCallback, useMemo, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ContentFallback } from "components/content-fallback";
import ConfirmationModal from "./ConfirmationModal";
import { listStoreState } from "states/store.state";
import { getOrderDetailstate } from "states/order.state";
import { OrderStatus, PaymentStatus } from "types/order";
import orderApi from "api/order";

interface CancelOrderProps {
  index: number;
  orderId: string;
}

export const CancelOrder: FC<CancelOrderProps> = ({ index, orderId }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [canCancel, setCanCancel] = useState(false);
  const [time, setTime] = useState(0);
  const stores = useRecoilValue(listStoreState);
  const orderDetail = useRecoilValue(getOrderDetailstate(orderId));
  const store = useMemo(
    () => stores.find((store) => store.name === orderDetail.storeName),
    [stores, orderDetail.storeName]
  );

  useEffect(() => {
    if (orderDetail.checkInDate) {
      const createTime = new Date(orderDetail.checkInDate).getTime();
      const updateElapsedTime = () => {
        const currentTime = new Date().getTime();
        const elapsedSeconds = Math.floor((currentTime - createTime) / 1000);
        const countDown = 120 - elapsedSeconds;
        setTime(countDown);
        if (countDown <= 0) {
          setCanCancel(false);
        } else {
          setCanCancel(true);
        }
      };
      const intervalId = setInterval(updateElapsedTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [orderDetail.checkInDate]);

  const getToken = (): string => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    return token;
  };

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
        paymentType: PaymentStatus.FAIL,
        guestNumber: orderDetail.customerNumber,
        deliStatus: "FAIL",
      };
      await orderApi.setOrderStatusToCanceled(
        orderStatusCart,
        store.id,
        orderId,
        getToken()
      );
      setShowModal(false);
    } catch (error) {
      console.error("Failed to cancel the order:", error);
    } finally {
      setLoading(false);
    }
  }, [orderDetail, store, orderId]);

  const formatElapsedTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      {loading ? (
        <ContentFallback />
      ) : (
        <>
          {canCancel ? (
            <>
              {index === 1 ? (
                <button
                  className={`font-bold w-full p-1 pl-6 pr-6 rounded-md text-white text-sm ${
                    !canCancel
                      ? "bg-gray-500"
                      : "bg-red-500 hover:text-red-200 hover:bg-red-700"
                  } h-11`}
                  onClick={() => canCancel && setShowModal(true)}
                  disabled={!canCancel}
                >
                  Hủy đơn ({formatElapsedTime(time)})
                </button>
              ) : (
                <button
                  className={`font-bold  p-1 pl-6 pr-6  rounded-md text-white text-sm  ${
                    !canCancel
                      ? "bg-gray "
                      : "bg-red-500 hover:text-red-200 hover:bg-red-700"
                  }`}
                  onClick={() => canCancel && setShowModal(true)}
                  disabled={!canCancel}
                >
                  Hủy đơn ({formatElapsedTime(time)})
                </button>
              )}

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

export default CancelOrder;
