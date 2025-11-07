import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Products from "./pages/Products/Products.tsx";
import ProductsByID from "./pages/ProductsByID/ProductsByID.tsx";
import CreateProduct from "./pages/CreateProduct/CreateProduct.tsx";
import App from "./App.tsx";
import { store } from "./redux/store/productStore.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Products /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductsByID /> },
      { path: "create-product", element: <CreateProduct /> },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
