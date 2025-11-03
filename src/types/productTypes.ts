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
export type ProductsResponse = {
  items: Product[];
  total: number;
  skip: number;
  limit: number;
};

// ---  types ---
export const SET_PRODUCTS = "SET_PRODUCTS";
export const TOGGLE_LIKE = "TOGGLE_LIKE";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const SET_FILTER = "SET_FILTER";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";

// --- State ---
export type ProductsState = {
  items: Product[];
  total: number;
  likedIds: number[];
  removedIds: number[];
  created: Product[];
  filter: "all" | "favorites";
};

export type ProductsAction =
  | { type: typeof SET_PRODUCTS; payload: { items: Product[]; total: number } }
  | { type: typeof TOGGLE_LIKE; payload: number }
  | { type: typeof REMOVE_PRODUCT; payload: number }
  | { type: typeof SET_FILTER; payload: "all" | "favorites" }
  | { type: typeof CREATE_PRODUCT; payload: Product }
  | { type: typeof EDIT_PRODUCT; payload: Product };
