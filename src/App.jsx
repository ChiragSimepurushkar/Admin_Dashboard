import "./App.css";
import React, { useCallback, useRef } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { createContext, useState } from "react";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Products from "./Pages/Products";
import toast, { Toaster } from 'react-hot-toast';
import Slide from '@mui/material/Slide';
import HomeSliderBanners from "./Pages/HomeSliderBanners";
import Category from "./Pages/Category";
import SubCategory from "./Pages/Category/subCategory";
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyAccount from "./Pages/VerifyAccount";
import ChangePassword from "./Pages/ChangePassword";
import { fetchDataFromApi } from "./utils/api";
import { useEffect } from "react";
import Profile from "./Pages/Profile";
import ProductDetails from "./Pages/Products/productDetails";
import AddRAMS from "./Pages/Products/AddRAMS";
import AddWEIGHT from "./Pages/Products/AddWEIGHT";
import AddSIZES from "./Pages/Products/AddSIZES";
import BannerV1List from "./Pages/Banners/bannerV1List";
import { BlogList } from "./Pages/Blog";
import "./responsive.css";
const MyContext = createContext();

function App() {
  const openAlertBox = (status, msg) => {
    if (status === 'Success' || status === 'success') {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  }
  const [userData, setuserData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [address, setAddress] = useState([])
  const [catData, setCatData] = useState([])
  const [sidebarWidth, setSidebarWidth] = useState(18);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: '',
    id: ""
  });
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
  console.log('Window width:', windowWidth);
  
  if (windowWidth < 992) {
    setIsSidebarOpen(false);
    setSidebarWidth(280); // Fixed pixel width for mobile
  } else {
    // Desktop: can be open or closed
    setSidebarWidth(18); // Percentage width for desktop
  }
}, [windowWidth]);

useEffect(() => {
  getCat();
  
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  setWindowWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

  const getCat = () => {
    setIsLoadingCategories(true);
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res?.data || []);
      setIsLoadingCategories(false);
    }).catch(err => {
      console.error("Error fetching categories:", err);
      setCatData([]);
      setIsLoadingCategories(false);
    });
  }

  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div
              className={`sidebar-overlay ${isSidebarOpen && windowWidth < 992 ? '' : 'hidden'}`}
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="contentMain flex">
              <div className={`sidebarWrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-3 px-5 transition-all ${isSidebarOpen && windowWidth >= 992 ? 'sidebar-open' : 'sidebar-closed'}`}>
                <Dashboard />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/login",
      exact: true,
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/sign-up",
      exact: true,
      element: (
        <>
          <SignUp />
        </>
      ),
    },
    {
      path: "/products",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
             <div className={`sidebarWrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : `!w-[${100 - sidebarWidth}%]`}`}>
                <Products />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/product/:id",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div className={`sidebarWrapper transition-all ${isSidebarOpen === true ? `!w-[${(sidebarWidth)}%]` : 'w-[0%] opacity-0'}`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : `!w-[${100 - sidebarWidth}%]`}`}>
                <ProductDetails />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/bannerV1/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
             <div className={`sidebarWrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : `!w-[${100 - sidebarWidth}%]`}`}>
                <BannerV1List />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/homeSlider/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
             <div className={`sidebarWrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : `!w-[${100 - sidebarWidth}%]`}`}>
                <HomeSliderBanners />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/category/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
             <div className={`sidebarWrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : `!w-[${100 - sidebarWidth}%]`}`}>
                <Category />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/subCategory/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
             <div className={`sidebarWrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : `!w-[${100 - sidebarWidth}%]`}`}>
                <SubCategory />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/users",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
             <div className={`sidebarWrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar />
              </div>
              <div 
              // onClick={() => setIsSidebarOpen(false)} 
              className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : `!w-[${100 - sidebarWidth}%]`}`}>
                <Users />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/orders",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
             <div className={`sidebarWrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar />
              </div>
              <div 
              // onClick={() => setIsSidebarOpen(false)}  
              className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : `!w-[${100 - sidebarWidth}%]`}`}>
                <Orders />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/forgot-password",
      exact: true,
      element: (
        <>
          <ForgotPassword />
        </>
      ),
    },
    {
      path: "/verify-account",
      exact: true,
      element: (
        <>
          <VerifyAccount />
        </>
      ),
    },
    {
      path: "/change-password",
      exact: true,
      element: (
        <>
          <ChangePassword />
        </>
      ),
    },
    {
      path: "/profile",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
             <div className={`sidebarWrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar />
              </div>
              <div 
              // onClick={() => setIsSidebarOpen(false)} 
               className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : `!w-[${100 - sidebarWidth}%]`}`}>
                <Profile />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/product/addRams",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
             <div 
             className={`sidebarWrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar />
              </div>
              <div 
              // onClick={() => setIsSidebarOpen(false)} 
              className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : `!w-[${100 - sidebarWidth}%]`}`}>
                <AddRAMS />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/product/addWeights",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
             <div className={`sidebarWrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar />
              </div>
              <div 
              // onClick={() => setIsSidebarOpen(false)}
               className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : `!w-[${100 - sidebarWidth}%]`}`}>
                <AddWEIGHT />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/product/addSizes",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
             <div className={`sidebarWrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar />
              </div>
              <div 
              // onClick={() => setIsSidebarOpen(false)} 
              className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : `!w-[${100 - sidebarWidth}%]`}`}>
                <AddSIZES />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/blog/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
             <div className={`sidebarWrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar />
              </div>
              <div 
              // onClick={() => setIsSidebarOpen(false)}
               className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : `!w-[${100 - sidebarWidth}%]`}`}>
                <BlogList />
              </div>
            </div>
          </section>
        </>
      ),
    },
  ]);
  const isRedirecting = useRef(false);


  // Make toast available globally for axios interceptor
  useEffect(() => {
    window.showToast = openAlertBox;
    return () => {
      delete window.showToast;
    };
  }, [openAlertBox]);

  // Session check function
  const checkUserSession = useCallback(async () => {
    const token = localStorage.getItem('accesstoken');

    if (!token) {
      setIsLogin(false);
      setuserData(null);
      return;
    }

    try {
      const res = await fetchDataFromApi(`/api/user/user-details`);

      if (res?.error === true) {
        // Session expired or error
        if (isRedirecting.current) return; // Prevent multiple redirects

        isRedirecting.current = true;
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshToken");
        setuserData(null);
        setIsLogin(false);
        openAlertBox("error", res?.message || "Your session has expired. Please login again.");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else if (res?.data) {
        // Valid response with user data
        setuserData(res.data);
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Error checking session:", err);
      // Don't redirect on network errors during periodic checks
      // The interceptor will handle actual auth failures
    }
  }, [openAlertBox]);

  // Initial session check on mount
  useEffect(() => {
    const token = localStorage.getItem('accesstoken');
    if (token) {
      checkUserSession();
    }
  }, []); // Run only once on mount

  // Periodic session check
  useEffect(() => {
    const intervalId = setInterval(() => {
      const token = localStorage.getItem('accesstoken');
      if (token && !isRedirecting.current) {
        checkUserSession();
      }

    }, 30000); // Check every 30 seconds

    return () => clearInterval(intervalId);
  }, [checkUserSession]);

  // const getCat= ()=>{
  //   fetchDataFromApi("/api/category").then((res) => {
  //     setCatData(res?.data);
  //   });
  // }

  const values = {
    sidebarWidth, setSidebarWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin, setIsLogin,
    isOpenFullScreenPanel, setIsOpenFullScreenPanel,
    openAlertBox,
    userData, setuserData,
    address, setAddress,
    catData, setCatData,
    getCat,
    isLoadingCategories,
    windowWidth, setWindowWidth
  }

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />

        <Toaster />

      </MyContext.Provider>
    </>
  );
}
export default App;
export { MyContext };
