import { SET_PRODUCTS, SET_PRODUCT } from "../types/productTypes";
import type { Product, ProductsAction } from "../types/productTypes";
import type { Dispatch } from "redux";
import { fetchProducts, fetchProductById } from "../api/apiProducts";

export const setProducts = (
  items: Product[],
  total: number
): ProductsAction => ({
  type: SET_PRODUCTS,
  payload: { items, total },
});
export const setProduct = (product: Product): ProductsAction => ({
  type: SET_PRODUCT,
  payload: product,
});

export const loadProducts =
  // limit -> сколько взять товаров
  // page - какую страницу (page)
  // query - поисковая строка, если введене запрос


    (limit = 12, page = 1, query?: string) =>
    async (dispatch: Dispatch) => {
      const skip = (page - 1) * limit; // страница 1 → skip=0, страница 2 → skip=limit
      const data = await fetchProducts(limit, skip, query); // запрос к API  fetchProducts
      dispatch(setProducts(data.products, data.total)); // Кладём загруженные товары в стор:
    };

export const loadProduct = (id: number) => async (dispatch: Dispatch) => {
  const data = await fetchProductById(id);
  dispatch(setProduct(data));
};
