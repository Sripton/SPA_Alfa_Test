import type { ProductsResponse, Product } from "../types/productTypes";
const Base = "https://dummyjson.com";

export async function fetchProducts(
  limit = 12, // сколько товаров вернуть
  skip = 0,
  query?: string // необязательная строка поиска
): Promise<ProductsResponse> {
  // функция всегда возвращает Promise, который даст данные типа ProductsResponse.
  // query - необязательный параметр ? -> либо string || undefined
  const url = query
    ? `${Base}/products/search?q=${encodeURIComponent(
        // encodeURIComponent(q) - убирает пробелы, спецсимволы  и тд что бы запрос не сломался
        query
      )}&limit=${limit}&skip=${skip}`
    : `${Base}/products?limit=${limit}&skip=${skip}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${Base}/products/${id}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
