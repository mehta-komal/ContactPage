import React, { createContext, useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Components/Action/Loading";
import Config from "./Config";
import axios from "axios";
import Routes from "./Routs/Routes";

export const Acontext = createContext<any>(null); // Replace 'any' with the appropriate context type

const App: React.FC = () => {
  // const udata = () => {
  //   let uid=localStorage.getItem("userid")
  //   const storedUser = JSON.parse( uid || "");
  //   return storedUser ? storedUser : null;
  // };
  // const udata = (): any | null => {
  //   const uid = localStorage.getItem("userid");
  
  //   if (!uid) {
  //     return null; // Return null if 'uid' is null or undefined
  //   }
  
  //   try {
  //     const storedUser = JSON.parse(uid);
  //     return storedUser ?? null;
  //   } catch (error) {
  //     console.error("Error parsing user data:", error);
  //     return null;
  //   }
  // };
  const udata = (): any | null => {
    const uid = localStorage.getItem("userid");
  
    console.log("uid:", uid); // Add this line for debugging
  
    if (!uid || uid === "undefined") {
      return null; // Return null if 'uid' is null or "undefined"
    }
  
    try {
      const storedUser = JSON.parse(uid);
      return storedUser ?? null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };
  
  
  const [search, setSearch] = useState<string>("");
  const [product, setproduct] = useState<any>(null); // Replace 'any' with the appropriate type
  const [isLogin, setisLogin] = useState<any>(udata); // Replace 'any' with the appropriate type
  const [data, setdata] = useState<any>(() => {
    const storedData = localStorage.getItem("productData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [cartItems, setCartItems] = useState<any[]>([]); // Replace 'any' with the appropriate type
  const [user, setuser] = useState<any>([]); // Replace 'any' with the appropriate type
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          <Routes/>
        </Acontext.Provider>
      )}
    </>
  );
};

export default App;
