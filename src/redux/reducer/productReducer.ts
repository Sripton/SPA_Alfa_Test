import {
  SET_PRODUCTS,
  SET_PRODUCT,
  SET_LIKES,
  TOGGLE_LIKE,
  REMOVE_PRODUCT,
  CREATE_PRODUCT,
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

    case REMOVE_PRODUCT: {
      const idNum = Number(action.payload); // id
      if (Number.isNaN(idNum)) return state;
      // проверка наличия в  state.removedIds (id) удаленного товара
      const exist = state.removedIds.includes(idNum);
      return {
        ...state, // копируем всё состояние
        // Обновление состояния:
        removedIds: exist // Если товар уже удален
          ? state.removedIds // оставляем массив как есть
          : [...state.removedIds, idNum], // добавляем новый ID в конец

        items: state.items.filter((p) => p.id !== idNum),
        total: Math.max(state.total - (exist ? 0 : 1)),
        likedIds: state.likedIds.filter((p) => p !== idNum),
      };
    }

    case CREATE_PRODUCT: {
      const product = action.payload;
      return {
        ...state,
        created: [product, ...state.items],
        items: [product, ...state.items],
        total: state.total + 1,
      };
    }
    default:
      return state;
  }
}
