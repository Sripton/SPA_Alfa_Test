import {
  SET_PRODUCTS,
  SET_PRODUCT,
  TOGGLE_LIKE,
  SET_LIKES,
  REMOVE_PRODUCT,
  CREATE_PRODUCT,
} from "../types/productTypes";
import type { Product, ProductsAction } from "../types/productTypes";
import type { Dispatch } from "redux";
import { fetchProducts, fetchProductById } from "../../api/apiProducts";
import * as likesApi from "../../api/apiLikes";

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

// положить в стор полный список лайков (инициализация)
export const setLikes = (ids: number[]): ProductsAction => ({
  type: SET_LIKES,
  payload: ids,
});

// локальный  тоггл одного ids
export const toggleLiked = (id: number): ProductsAction => ({
  type: TOGGLE_LIKE,
  payload: id,
});

// инициализация лайков из storage при старте
export const hydrateLikes = () => async (dispatch: Dispatch) => {
  const ids = await likesApi.getLikedIds();
  dispatch(setLikes(ids));
};

//  запись в "бэкенд" (localStorage)
export const toggleLike =
  (id: number | string) =>
  async (
    dispatch: Dispatch,
    getState: () => { products: { likedIds: number[] } } // чтениe текущего стора
  ) => {
    const idNum = Number(id);
    if (Number.isNaN(idNum)) return;
    dispatch(toggleLiked(idNum));
    try {
      // вычисляем актуальный флаг и сохраняем
      const likeNow = getState().products.likedIds.includes(idNum);
      await likesApi.setLiked(idNum, likeNow);
    } catch (error) {
      return error;
    }
  };

export const removeProduct = (id: number): ProductsAction => ({
  type: REMOVE_PRODUCT,
  payload: id,
});

export const createProduct =
  (data: Omit<Product, "id">) =>
  (
    dispatch: Dispatch,
    getState: () => { products: { items: Product[]; created: Product[] } }
  ) => {
    const { items, created } = getState().products;
    const allIds = [...items, ...created].map((p) => p.id);
    const nextID = (allIds.length ? Math.max(...allIds) : 0) + 1; //  генерируем id для нового товара
    const product: Product = { id: nextID, ...data };
    dispatch<ProductsAction>({ type: CREATE_PRODUCT, payload: product });
    const saved = JSON.parse(localStorage.getItem("createdProducts") || "[]");
    localStorage.setItem(
      "createdProducts",
      JSON.stringify([...saved, product])
    );
  };
