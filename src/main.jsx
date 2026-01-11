import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header.jsx";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import EditProductPage from "./pages/EditProductPage.jsx";
import CreateProductPage from "./pages/CreateProductPage.jsx";
import ProductListPage from "./pages/ProductListPage.jsx";
import DetailProductPage from "./pages/DetailProductPage.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<DetailProductPage />} />
        <Route path="/products/lists" element={<ProductListPage />} />
        <Route path="/products/edit/:id" element={<EditProductPage />} />

        <Route path="/products/create" element={<CreateProductPage />} />
      </Routes>
    </main>
  </BrowserRouter>
);
