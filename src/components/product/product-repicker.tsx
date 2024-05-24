import { add } from "lodash";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  cartState,
  getOrderDetailstate,
  listStoreState,
  storeMenuByInputIdState,
} from "state";
import { TStore } from "types/store";
import { Product, ProductTypeEnum } from "types/store-menu";
import product, { prepareCart } from "utils/product";
import { ProductPicker } from "./product-picker";
import { ProductList } from "types/cart";

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

  const [reOrderProducts, setReOrderProducts] = useState<Product[] | null>();
  const stores = useRecoilValue(listStoreState);
  const orderDetail = useRecoilValue(getOrderDetailstate(orderId));
  let store = stores.find((store) => store.name == orderDetail.storeName);

  let menuOfStore = useRecoilValue(storeMenuByInputIdState(store?.id ?? ""));
  let reOrderProductsInMenu = orderDetail.productList;

  const filteredReOProducts = reOrderProductsInMenu.map((reO) => {
    let res: ProductQuantity[] = [];
    menuOfStore.products.map((product) => {
      if (product.menuProductId == reO.productInMenuId) {
        res = [...res, { product, quantity: reO.quantity }];
      }
    });
    return res;
  });

  // console.log(filteredReOProducts);

  const reAddtoCart = () => {
    // setCart((prevCart) => {
    //   // console.log(prevCart)
    //   //lấy thông tin object đưa vào res - những cái đã có trong đó
    //   let res = { ...prevCart };
    //   //kiểm tra trạng thái product dc add
    //   //Nếu single -> trả về sản phẩm đó thôi
    //   //Nếu Kiểu khác (Parent) -> tìm thằng con nó ở currentChild -> xác định child nào cần dc add
    //   const productToAdd =
    //     product.type == ProductTypeEnum.SINGLE
    //       ? product
    //       : currentChild.find((a) => a.menuProductId === menuProductId);
    //   // console.log(productToAdd);
    //   let isProductInCart = false;
    //   const updatedProductList = res.productList.map((addedProduct) => {
    //     if (addedProduct.productInMenuId === productToAdd?.menuProductId) {
    //       isProductInCart = true;
    //       // Tạo một bản sao của addedProduct
    //       const productListObjectToUpdate = { ...addedProduct };
    //       // Cập nhật thuộc tính quantity trong bản sao
    //       productListObjectToUpdate.quantity += quantity;
    //       // Trả về bản sao đã được cập nhật
    //       return productListObjectToUpdate;
    //     }
    //     // Trả về phần tử đã được cập nhật hoặc không thay đổi
    //     return addedProduct;
    //   });
      
      
      
    //   // console.log(updatedProductList)
    //   if (isProductInCart) {
    //     res = {
    //       ...prevCart,
    //       productList: updatedProductList
    //     };
    //     // console.log("Có rồi nè");
    //   } else {
    //     //tạo 1 đối tượng productList để thêm vào
    //     const cartItem: ProductList = {
    //       productInMenuId: productToAdd!.menuProductId,
    //       parentProductId: productToAdd!.parentProductId,
    //       name: productToAdd!.name,
    //       type: productToAdd!.type,
    //       quantity: quantity,
    //       sellingPrice: productToAdd!.sellingPrice,
    //       code: productToAdd!.code,
    //       categoryCode: productToAdd!.code,
    //       totalAmount: productToAdd!.sellingPrice * quantity,
    //       discount: 0,
    //       finalAmount: productToAdd!.sellingPrice * quantity,
    //       picUrl: productToAdd!.picUrl,
    //     };

    //     res = {
    //       ...prevCart,

    //       productList: prevCart.productList.concat(cartItem),
    //     };
    //   }

    //   return prepareCart(res);
    // });
  }

  return (
    <button className="font-bold bg-primary mr-1 p-1 pl-6 pr-6 rounded-md text-white text-sm hover:text-sky-200 hover:bg-cyan-800"
    onClick={() => reAddtoCart}>
      Đặt lại 
    </button>
  );
};
