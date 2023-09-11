import React, { createContext, useState, useEffect } from "react";
import Navbar from "./Component/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Component/Action/Loading";
import Config from "./Config";
import axios from "axios";
import Routs from "./Routs/Routs";
export const Acontext = createContext();

const App = () => {
  const udata = () => {
    const storedUser = JSON.parse(localStorage.getItem("userid"));
    return storedUser ? storedUser : null;
  };
  const [search, setSearch] = useState("");
  const [product, setproduct] = useState();
  const [isLogin, setisLogin] = useState(udata);
  const [data, setdata] = useState(() => {
    const storedData = localStorage.getItem("productData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [cartItems, setCartItems] = useState([]);
  const [user, setuser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("productData", JSON.stringify(data));
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [data]);
  useEffect(() => {
    if (udata()) {
      axios.get(`${Config.apikeyuserdata}/${udata()}`)
        .then((res) => {
          setuser(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [setuser]);
  

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Acontext.Provider
          value={{
            product,
            setproduct,
            search,
            setSearch,
            data,
            setdata,
            cartItems,
            setCartItems,
            isLogin,
            setisLogin,
            user,
            setuser,
          }}
        >
          <Navbar />
          <ToastContainer position="top-center" autoClose={2000} />
          <Routs/>
        </Acontext.Provider>
      )}
    </>
  );
};

export default App;