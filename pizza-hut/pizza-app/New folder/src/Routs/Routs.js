import React, {  useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Component/Login";
import Signin from "../Component/Signin";
import GetData from "../Component/GetData";
import Product from "../Component/Product";
import Data from "../Component/Data";
import Cart from "../Component/Cart";
import Profile from "../Component/Profile";
import ProductDetail from "../Component/ProductDetail";
import OrderHistory from "../Component/OrderHistory";
import Settings from "../Component/Settings";
import { Acontext } from "../App";
import "react-toastify/dist/ReactToastify.css";


const Routs = () => {

  return (
    <div>
      <Routes>
            <Route path="/alldata" element={<GetData />} />
            <Route path="/" element={<Product />} />
            <Route path="/data" element={<Data />} />
            <Route
              path="/profile"
              element={<PrivateRoute element={<Profile />} />}
            />
            <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
            <Route
              path="/order"
              element={<PrivateRoute element={<OrderHistory />} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/productdetail" element={<ProductDetail />} />
            <Route path="/setting" element={<Settings />} />
          </Routes>
    </div>
  )
}
const PrivateRoute = ({ element }) => {
    const { isLogin } = useContext(Acontext);
    return isLogin ? element : <Navigate to="/login" />;
  };
export default Routs
