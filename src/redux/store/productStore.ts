import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../reducer/productReducer";
// console.log("[store] created (file loaded)"); // test
export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

// Типы стора
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
