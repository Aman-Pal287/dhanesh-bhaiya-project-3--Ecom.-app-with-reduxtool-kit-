import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import UnauthWrapper from "./UnauthWrapper";
const Cart = lazy(() => import("../pages/Cart"));
const AuthWrapper = lazy(() => import("./AuthWrapper"));
const PageNotFound = lazy(() => import("../PageNotFound"));
const UserProfile = lazy(() => import("../pages/users/UserProfile"));
const ProductDetail = lazy(() => import("../pages/admin/ProductDetail"));
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const Products = lazy(() => import("../pages/Products"));

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />

      <Route
        path="/login"
        element={
          <UnauthWrapper>
            {" "}
            <Login />
          </UnauthWrapper>
        }
      />
      <Route
        path="/register"
        element={
          <UnauthWrapper>
            {" "}
            <Register />{" "}
          </UnauthWrapper>
        }
      />

      <Route
        path="/admin/create-product"
        element={
          <AuthWrapper>
            <CreateProduct />
          </AuthWrapper>
        }
      />

      <Route
        path="/admin/user-profile"
        element={
          <AuthWrapper>
            <UserProfile />
          </AuthWrapper>
        }
      />
      <Route
        path="/product/:id"
        element={
          <AuthWrapper>
            <ProductDetail />
          </AuthWrapper>
        }
      />

      <Route
        path="/cart"
        element={
          <AuthWrapper>
            <Cart />
          </AuthWrapper>
        }
      />

      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Mainroutes;
