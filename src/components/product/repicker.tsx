import React, { FC, useEffect, useState, useCallback, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Product } from "types/store-menu";
import { Cart } from "types/cart";
import { useNavigate } from "react-router-dom";
import { cartState } from "states/cart.state";
import { getOrderDetailstate } from "states/order.state";
import {
  selectedStoreIdState,
  listStoreState,
  storeMenuByInputIdState,
} from "states/store.state";
import { Box } from "zmp-ui";
import { ContentFallback } from "components/content-fallback";
import { useProductContext } from "context/app-context";
export interface ProductPickerProps {
  orderId: string;
  isUpdate: boolean;
}

type ProductQuantity = {
  product: Product;
  quantity: number;
};

export const ProductRePicker: FC<ProductPickerProps> = ({
  orderId,
  isUpdate,
}) => {
  if (!orderId) {
    return <Box></Box>;
  }

  const setCurrentStoreId = useSetRecoilState(selectedStoreIdState);
  const [reOrderProducts, setReOrderProducts] = useState<
    ProductQuantity[] | null
  >(null);
  const [loading, setLoading] = useState(true);

  const stores = useRecoilValue(listStoreState);
  const orderDetail = useRecoilValue(getOrderDetailstate(orderId));
  const store = useMemo(
    () => stores.find((store) => store.name === orderDetail.storeName),
    [stores, orderDetail.storeName]
  );

  const menuOfStore = useRecoilValue(storeMenuByInputIdState(store?.id ?? ""));
  const reOrderProductsInMenu = orderDetail.productList;
  const navigate = useNavigate();

  const { addNewItem } = useProductContext();

  useEffect(() => {
    if (reOrderProductsInMenu && menuOfStore.products) {
      const filteredReOProducts = reOrderProductsInMenu.flatMap((reO) => {
        return menuOfStore.products
          .filter((product) => product.menuProductId === reO.productInMenuId)
          .map((product) => ({ product, quantity: reO.quantity }));
      });

      setReOrderProducts(filteredReOProducts);
      setLoading(false);
    }
  }, [reOrderProductsInMenu, menuOfStore.products]);

  const reAddToCart = useCallback(() => {
    setCurrentStoreId(store!.id);
    reOrderProducts?.forEach(({ product, quantity }) => {
      addNewItem(product, quantity, "", store!.id);
    });

    navigate("/cart");
  }, [store, reOrderProducts, setCurrentStoreId, addNewItem, navigate]);

  return (
    <>
      {loading ? (
        <ContentFallback />
      ) : (
        <button
          className="font-bold bg-primary mr-1 p-1 pl-6 pr-6 rounded-md text-white text-sm hover:text-sky-200 hover:bg-cyan-800"
          onClick={reAddToCart}
        >
          {isUpdate ? "Cập nhật" : "Đặt lại"}
        </button>
      )}
    </>
  );
};
