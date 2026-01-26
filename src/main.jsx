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
import Login from "./pages/Login.jsx";
import MainLayout from "./layouts/Main.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { UserProvider } from "./contexts/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products/:id" element={<DetailProductPage />} />
            <Route path="/products/lists" element={<ProductListPage />} />
            <Route path="/products/edit/:id" element={<EditProductPage />} />
            <Route path="/products/create" element={<CreateProductPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </UserProvider>,
);
