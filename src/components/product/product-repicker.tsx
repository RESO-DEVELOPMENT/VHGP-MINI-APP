import { add } from "lodash";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { atom, useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import {
  cartState,
  getOrderDetailstate,
  listStoreState,
  selectedStoreIdState,
  storeMenuByInputIdState,
} from "state";
import { TStore } from "types/store";
import { Product, ProductTypeEnum } from "types/store-menu";
import product, { prepareCart } from "utils/product";
import { ProductPicker } from "./product-picker";
import { ProductList } from "types/cart";
import { useNavigate } from "react-router-dom";


export interface ProductPickerProps {
  orderId: string;
  isUpdate: false;
  // children: any
}

type ProductQuantity = {
  product: Product;
  quantity: number;
};

export const ProductRePicker: FC<ProductPickerProps> = ({
  // children,
  isUpdate,
  orderId,
}) => {
  if (!orderId) {
    return <></>;
  }
  const setCurrentStoreId = useSetRecoilState(selectedStoreIdState);
  const [cart, setCart] = useRecoilState(cartState);
  const [reOrderProducts, setReOrderProducts] = useState<
    ProductQuantity[] | null
  >();
  const stores = useRecoilValue(listStoreState);
  let orderDetail = useRecoilValue(getOrderDetailstate(orderId));
  const store = stores.find((store) => store.name == orderDetail.storeName);

  let menuOfStore = useRecoilValue(storeMenuByInputIdState(store?.id ?? ""));
  let reOrderProductsInMenu = orderDetail.productList;

  const navigate = useNavigate();
  useEffect(() => {
    const filteredReOProducts = reOrderProductsInMenu.flatMap((reO) => {
      return menuOfStore.products
        .filter((product) => product.menuProductId === reO.productInMenuId)
        .map((product) => ({ product, quantity: reO.quantity }));
    });

    setReOrderProducts(filteredReOProducts);
   
  }, [reOrderProductsInMenu, menuOfStore.products]);
  // console.log(reOrderProducts);

  const reAddToCart = () => {
    setCurrentStoreId(store!.id);
    reOrderProducts?.forEach(({ product, quantity }) => {
      setCart((prevCart) => {
        // console.log("thêm");
        var res =( cart.storeId == store!.id) ? { ...prevCart, storeId: store!.id } : { ...prevCart, storeId: store!.id, productList: [] };
        // console.log("check");
        let isProductInCart = false;
        const updatedProductList = res.productList.map((addedProduct) => {
          if (addedProduct.productInMenuId === product?.menuProductId) {
            isProductInCart = true;
            const productListObjectToUpdate = { ...addedProduct };
            productListObjectToUpdate.quantity += quantity;
            productListObjectToUpdate.finalAmount += (quantity * product.sellingPrice)
            return productListObjectToUpdate;
          }
          return addedProduct;
        });
        if (isProductInCart) {
          res = {
            ...prevCart,
            productList: updatedProductList,
          };
        } else {
          const cartItem: ProductList = {
            productInMenuId: product!.menuProductId,
            parentProductId: product!.parentProductId,
            name: product!.name,
            type: product!.type,
            quantity: quantity,
            sellingPrice: product!.sellingPrice,
            code: product!.code,
            categoryCode: product!.code,
            totalAmount: product!.sellingPrice * quantity,
            discount: 0,
            finalAmount: product!.sellingPrice * quantity,
            picUrl: product!.picUrl,
          };
          res = {
            ...prevCart,
            productList: res.productList.concat(cartItem),
            storeId : store!.id
          };
        }
        // console.log(res)
        return prepareCart(res);
      });
    });
    
    navigate("/cart");
  };

  return (
    <button
      className="font-bold bg-primary mr-1 p-1 pl-6 pr-6 rounded-md text-white text-sm hover:text-sky-200 hover:bg-cyan-800"
      onClick={reAddToCart}
    >
      Đặt lại
    </button>
  );
};
