import React, { FC, Suspense, useEffect } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import "./orders.css";
import { Box, Button, Header, Icon, Page, Tabs, Text } from "zmp-ui";
import TransactionCard from "./card-transaction";
import { Card } from "react-bootstrap";
import { displayDate, displayTime } from "utils/date";
import { DisplayPrice } from "components/display/price";
import { showOrderStatus } from "utils/product";
import { OrderStatus } from "types/order";
import { useNavigate } from "react-router-dom";
import { Subscription } from "pages/profile";
import { ProductRePicker } from "components/product/repicker";
import { selectedCategoryIdState } from "states/category.state";
import { listOrderState, requestOrderTransactionTriesState } from "states/order.state";
import { listTransactionState } from "states/transaction.state";
import { memberState } from "states/user.state";
import { ContentFallback } from "components/content-fallback";


const HistoryPicker: FC = () => {
  const selectedCategory = useRecoilValue(selectedCategoryIdState);
  const orderListData = useRecoilValueLoadable(listOrderState);
  const transactionListData = useRecoilValueLoadable(listTransactionState);

  const navigate = useNavigate();
  const retry = useSetRecoilState(requestOrderTransactionTriesState);
  const member = useRecoilValueLoadable(memberState);

  useEffect(() => {
    retry((r) => r + 1);
  }, [retry]);

  const gotoPage = (id: string) => {
    navigate("/order-detail", { state: { id } });
  };

  return (
    <>
      {member.state === "hasValue" && member.contents !== null ? (
        <Tabs
          scrollable
          defaultActiveKey={selectedCategory}
          className="category-tabs"
        >
          <Tabs.Tab key={0} label="Đơn hàng">
            <Suspense fallback={<ContentFallback />}>
              {orderListData.state === "hasValue" && orderListData.contents !== null ? (
                <div style={{ overflowY: "auto", flex: 1 }}>
                  {orderListData.contents.map((order, index) => (
                    <Box key={index} className="m-2 p-2 bg-white" flex>
                      <Card className="time-order">
                        <div className="flex justify-between">
                          <Text.Title size="normal">{order.invoiceId.slice(-5)}</Text.Title>
                          <Text
                            className={
                              order.status === OrderStatus.NEW
                                ? "font-bold bg-gray p-1 rounded-md text-white"
                                : order.status === OrderStatus.PENDING
                                ? "font-bold bg-blue-400 p-1 rounded-md text-white"
                                : order.status === OrderStatus.PAID
                                ? "font-bold bg-emerald-400 p-1 rounded-md text-white"
                                : "font-bold bg-red-400 p-1 rounded-md text-white"
                            }
                          >
                            {showOrderStatus(order.status)}
                          </Text>
                        </div>
                        <div className="flex my-1">
                          <Icon className="text-primary" size={22} icon="zi-location" />
                          <Text.Header className="text-md leading-6 ml-1">{order.storeName}</Text.Header>
                        </div>
                        <div className="flex justify-between mx-1 my-2">
                          <Text>
                            {displayDate(new Date(order.endDate))} {displayTime(new Date(order.endDate))}
                          </Text>
                          <Text.Header>
                            <DisplayPrice>{order.finalAmount}</DisplayPrice>
                          </Text.Header>
                        </div>
                        <hr className="hr-order" />
                        <div className="flex mt-1 justify-center">
                          <div className="m-1 flex-1 align-middle font-normal text-m text-primary">
                            <Text.Header onClick={() => gotoPage(order.id)}>Chi tiết đơn hàng</Text.Header>
                          </div>
                          {order && order.status !== OrderStatus.PENDING && (
                            <ProductRePicker isUpdate={false} orderId={order.id} key={order.id} />
                          )}
                        </div>
                      </Card>
                    </Box>
                  ))}
                </div>
              ) : (
                <Box />
              )}
            </Suspense>
          </Tabs.Tab>
          <Tabs.Tab key={1} label="Giao dịch">
            <Suspense fallback={<ContentFallback />}>
              {transactionListData.state === "hasValue" && transactionListData.contents !== null && transactionListData.contents.length > 0 ? (
                <div style={{ overflowY: "auto", flex: 1 }}>
                  {transactionListData.contents.map((order) => (
                    <TransactionCard key={order.id} trans={order} />
                  ))}
                </div>
              ) : (
                <Box className="p-4" >
                    <Text>Không có giao dịch nào</Text>
                </Box>
              )}
            </Suspense>
          </Tabs.Tab>
        </Tabs>
      ) : (
        <Subscription />
      )}
    </>
  );
};

const HistoryPage: FC = () => {
  return (
    <Page className="flex flex-col">
      <Header showBackIcon={false} title="Hoạt động" />
      <HistoryPicker key={1} />
    </Page>
  );
};

export default HistoryPage;
