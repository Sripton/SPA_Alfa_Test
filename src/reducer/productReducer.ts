import { SET_PRODUCTS, SET_PRODUCT } from "../types/productTypes";
import type { ProductsState } from "../types/productTypes";
import type { AnyAction } from "@reduxjs/toolkit";
const initialState: ProductsState = {
  items: [],
  total: 0,
  likedIds: [],
  removedIds: [],
  created: [],
  filter: "all",
  current: null,
};
export default function productsReducer(
  state = initialState,
  action: AnyAction
): ProductsState {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
      };
    case SET_PRODUCT:
      return { ...state, current: action.payload };
    default:
      return state;
  }
}
