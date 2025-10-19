import "./App.css";
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { createContext, useState } from "react";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Products from "./Pages/Products";

import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import AddProduct from "./Pages/Products/addProduct";
import HomeSliderBanners from "./Pages/HomeSliderBanners";
import AddHomeSlide from "./Pages/HomeSliderBanners/addHomeSlide";
import Category from "./Pages/Category";
import AddCategory from "./Pages/Category/addCategory";
import SubCategory from "./Pages/Category/subCategory";
import AddSubCategory from "./Pages/Category/addSubCategory";
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyAccount from "./Pages/VerifyAccount";
import ChangePassword from "./Pages/ChangePassword";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: ''
  });

  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div className={`sidebarWrapper transition-all ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%]'}`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'}`}>
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
              <div className={`sidebarWrapper transition-all ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%]'}`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'}`}>
                <Products />
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
              <div className={`sidebarWrapper transition-all ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%]'}`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'}`}>
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
              <div className={`sidebarWrapper transition-all ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%]'}`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'}`}>
                <Category/>
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
              <div className={`sidebarWrapper transition-all ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%]'}`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'}`}>
                <SubCategory/>
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
              <div className={`sidebarWrapper transition-all ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%]'}`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'}`}>
                <Users/>
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
              <div className={`sidebarWrapper transition-all ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%]'}`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-3 px-5 transition-all ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'}`}>
                <Orders/>
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
  ]);

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin, setIsLogin,
    isOpenFullScreenPanel, setIsOpenFullScreenPanel
  }

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />

        <Dialog
          fullScreen
          open={isOpenFullScreenPanel.open}
          onClose={() => setIsOpenFullScreenPanel({
            open: false
          })}
          slots={{
            transition: Transition,
          }}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setIsOpenFullScreenPanel({
                  open: false
                })}
                aria-label="close"
              >
                <IoMdClose className="text-gray-800" />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <span className="text-gray-800">{isOpenFullScreenPanel?.model}</span>
              </Typography>
            </Toolbar>
          </AppBar>
          {
            isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />
          }
          {
            isOpenFullScreenPanel?.model === "Add Home Slide" && <AddHomeSlide />
          }
          {
            isOpenFullScreenPanel?.model === "Add New Category" && <AddCategory />
          }
          {
            isOpenFullScreenPanel?.model === "Add New Sub Category" && <AddSubCategory />
          }
        </Dialog>

      </MyContext.Provider>
    </>
  );
}
export default App;
export { MyContext };
