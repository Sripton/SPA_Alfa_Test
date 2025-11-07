import {
  SET_PRODUCTS,
  SET_PRODUCT,
  SET_LIKES,
  TOGGLE_LIKE,
} from "../types/productTypes";
import type { ProductsState } from "../types/productTypes";
import type { AnyAction } from "@reduxjs/toolkit";
console.log("[productsReducer] module loaded", Math.random());
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

    case SET_LIKES:
      return {
        ...state,
        likedIds: (action.payload ?? [])
          .map((x: any) => Number(x))
          .filter(Number.isFinite),
      };

    case TOGGLE_LIKE: {
      const idNum = Number(action.payload);
      console.log(
        "[reducer] TOGGLE_LIKE before:",
        state.likedIds,
        "id:",
        idNum
      );
      if (Number.isNaN(idNum)) return state;
      const has = state.likedIds.includes(idNum);
      const next = has
        ? state.likedIds.filter((like) => like !== idNum)
        : [...state.likedIds, idNum];
      return { ...state, likedIds: next };
    }
    default:
      return state;
  }
}
