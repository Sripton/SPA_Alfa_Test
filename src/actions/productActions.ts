import { SET_PRODUCTS } from "../types/productTypes";
import type { Product, ProductsAction } from "../types/productTypes";
import type { Dispatch } from "redux";
import { fetchProducts } from "../api/apiProducts";

export const setProducts = (
  items: Product[],
  total: number
): ProductsAction => ({
  type: SET_PRODUCTS,
  payload: { items, total },
});

export const loadProducts = () => async (dispatch: Dispatch) => {
  const data = await fetchProducts();
  dispatch(setProducts(data.items, data.total));
};
