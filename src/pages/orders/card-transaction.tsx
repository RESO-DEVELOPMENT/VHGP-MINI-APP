import { ListRenderer } from "components/list-renderer";
import React, { FC } from "react";
import { Transaction } from "types/transaction";
import { displayDate, displayTime } from "utils/date";
import { showTransactionStatus, showTransactionType } from "utils/product";
import { Box, Text } from "zmp-ui";

interface TransactionProps {
  trans: Transaction;
}

const TransactionCard: FC<TransactionProps> = ({ trans }) => {
  return (
    <Box className="space-y-2 px-2 mt-2">
      <ListRenderer
        noDivider
        items={[
          {
            left: (
              <Text.Title size="small">
                {showTransactionType(trans.type)}
              </Text.Title>
            ),
            right: (
              <Box flex>
                <Box className="flex-1"></Box>
                <Text.Title size="small">
                  {trans.isIncrease ? "+" : "-"} {trans.amount} {trans.currency}
                </Text.Title>
              </Box>
            ),
          },
          {
            left: <Text size="small">Thời gian</Text>,
            right: (
              <Box flex>
                <Box className="flex-1 "></Box>
                <Text size="xxSmall">
                  {displayTime(new Date(trans.createdDate)) +
                    " " +
                    displayDate(new Date(trans.createdDate))}
                </Text>
              </Box>
            ),
          },
          {
            left: <Text size="small">Trạng thái</Text>,
            right: (
              <Box flex>
                <Box className="flex-1"></Box>
                <Text size="small">{showTransactionStatus(trans.status)} </Text>
              </Box>
            ),
          },
        ]}
        limit={4}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

export default TransactionCard;
