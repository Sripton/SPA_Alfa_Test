// модель одного товара
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

// форма данных от сервера результат одного запроса на список товаров.
export type ProductsResponse = {
  items: Product[];
  total: number; // какие товары пришли сейчас, сколько всего (total)
  skip: number; // какие параметры пагинации использовались (skip).
  limit: number; // какие параметры пагинации использовались (limit).
};

// ---  types ---
export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_PRODUCT = "SET_PRODUCT";
export const TOGGLE_LIKE = "TOGGLE_LIKE";
export const SET_LIKES = "SET_LIKES";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const SET_FILTER = "SET_FILTER";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";

// --- State ---
// форма данных в  приложении
export type ProductsState = {
  items: Product[];
  total: number;
  likedIds: number[];
  removedIds: number[];
  created: Product[];
  filter: "all" | "favorites";
  current: Product | null; // для получения продукта по id
};

export type ProductsAction =
  | { type: typeof SET_PRODUCTS; payload: { items: Product[]; total: number } }
  | { type: typeof SET_PRODUCT; payload: Product }
  | { type: typeof TOGGLE_LIKE; payload: number }
  | { type: typeof SET_LIKES; payload: number[] }
  | { type: typeof REMOVE_PRODUCT; payload: number }
  | { type: typeof SET_FILTER; payload: "all" | "favorites" }
  | { type: typeof CREATE_PRODUCT; payload: Product }
  | { type: typeof EDIT_PRODUCT; payload: Product };
