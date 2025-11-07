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

// 👇 ВРЕМЕННАЯ ОТЛАДКА — добавить НИЖЕ, после создания store
declare global {
  interface Window {
    appStore: typeof store;
  }
}
window.appStore = store; // положили инстанс стора в window
console.log("[store] created", store); // увидишь один раз при старте
