import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdSpaceDashboard } from "react-icons/md";
import Button from '@mui/material/Button';
import { IoIosImages } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";
import { FaBoxArchive } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { TbCategoryPlus } from "react-icons/tb";
import { FaBoxesPacking } from "react-icons/fa6";
import { Collapse } from 'react-collapse';
import { useState } from 'react';
import { MyContext } from '../../App';
import { SiBloglovin } from "react-icons/si";
import { fetchDataFromApi } from '../../utils/api';
const Sidebar = () => {
    const [subMenuIndex, setSubMenuIndex] = useState(null);
    const isOpenSubMenu = (index) => {
        if (subMenuIndex === index) {
            setSubMenuIndex(null);
        } else {
            setSubMenuIndex(index);
        }
    }
    const history = useNavigate();

    const context = useContext(MyContext);


    const logout = () => {
        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
        setSubMenuIndex(null);
        fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem('accesstoken')}`, {
            withCredentials: true
        }).then((res) => {
            if (res?.error === false) {
                context.setIsLogin(false);
                localStorage.removeItem("accesstoken");
                localStorage.removeItem("refreshToken");
                history("/login")
            }
        })
    }
    return (
        <>
            <div className="z-[52] sidebar bg-[#fff] overflow-y-auto border-r border-[rgba(0,0,0,0.1)] py-2 px-4">
                <div className="py-2 w-full"
                    onClick={() => {
                        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                        setSubMenuIndex(null);
                    }}>
                    <Link to="/">
                        <img
                            src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg"
                            className="w-[180px]"
                            alt="Logo"
                        />
                    </Link>
                </div>
                <ul className="mt-4">
                    <li>
                        <Link to="/"
                            onClick={() => {
                                context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                setSubMenuIndex(null);
                            }}>
                            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3 hover:!bg-[#f1f1f1]">
                                <MdSpaceDashboard className="!text-[20px]" />
                                <span>Dashboard</span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/users"
                            onClick={() => {
                                context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                setSubMenuIndex(null);
                            }}>
                            <Button className="!py-3 w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center hover:!bg-[#f1f1f1]">
                                <LuUsers className="text-[20px]" />
                                <span>Users</span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3 hover:!bg-[#f1f1f1]" onClick={() => isOpenSubMenu(2)}>
                            <FaBoxesPacking className="text-[20px]" />
                            <span>Products</span>
                            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' ><FaAngleDown className={`transition-all ${subMenuIndex === 2 ? 'rotate-180' : ''}`} /></span>
                        </Button>
                        <Collapse isOpened={subMenuIndex === 2 ? true : false}>
                            <ul className="w-full">
                                <li className="w-full">
                                    <Link to="/products" onClick={() => {
                                        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                        setSubMenuIndex(null);
                                    }}>
                                        <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                            <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>{" "}
                                            Product List
                                        </Button>
                                    </Link>
                                </li>
                                <li className="w-full">

                                    <Button
                                        onClick={() => {
                                            context.setIsOpenFullScreenPanel({
                                                open: true,
                                                model: 'Add Product'
                                            })
                                            context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                            setSubMenuIndex(null);
                                        }
                                        }
                                        className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                        <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                                        Product Upload
                                    </Button>

                                </li>
                                <li className="w-full">

                                    <Link to="/product/addRams" onClick={() => {
                                        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                        setSubMenuIndex(null);
                                    }}>
                                        <Button
                                            className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                            <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                                            Add Product RAMS
                                        </Button>
                                    </Link>

                                </li>
                                <li className="w-full">
                                    <Link to="/product/addWeights" onClick={() => {
                                        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                        setSubMenuIndex(null);
                                    }}>
                                        <Button
                                            className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                            <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                                            Add Product WeightS
                                        </Button>
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link to="/product/addSizes" onClick={() => {
                                        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                        setSubMenuIndex(null);
                                    }}>
                                        <Button
                                            className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                            <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                                            Add Product Size
                                        </Button>
                                    </Link>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li>
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3 hover:!bg-[#f1f1f1]" onClick={() => isOpenSubMenu(3)}>
                            <TbCategoryPlus className="text-[20px]" />
                            <span>Category</span>
                            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' ><FaAngleDown className={`transition-all ${subMenuIndex === 3 ? 'rotate-180' : ''}`} /></span>
                        </Button>
                        <Collapse isOpened={subMenuIndex === 3 ? true : false}>
                            <ul className="w-full">
                                <li className="w-full">
                                    <Link to="/category/list" onClick={() => {
                                        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                        setSubMenuIndex(null);
                                    }}>
                                        <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                            <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>{" "}
                                            Category List
                                        </Button>
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Button onClick={() => {
                                        context.setIsOpenFullScreenPanel({
                                            open: true,
                                            model: 'Add New Category'
                                        })
                                        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                        setSubMenuIndex(null);
                                    }} className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                        <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                                        Add a Category
                                    </Button>
                                </li>
                                <li className="w-full">
                                    <Link to="/subCategory/list"
                                        onClick={() => {
                                            context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                            setSubMenuIndex(null);
                                        }}>
                                        <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                            <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                                            Sub Category List
                                        </Button>
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Button onClick={() => {
                                        context.setIsOpenFullScreenPanel({
                                            open: true,
                                            model: 'Add New Sub Category'
                                        })
                                        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                        setSubMenuIndex(null);

                                    }} className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                        <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                                        Add a Sub Category
                                    </Button>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li>
                        <Link to="/orders" onClick={() => {
                            context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                            setSubMenuIndex(null);
                        }}>
                            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3 hover:!bg-[#f1f1f1]">
                                <FaBoxArchive className="text-[20px]" />
                                <span>Orders</span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3 hover:!bg-[#f1f1f1]"
                            onClick={() => isOpenSubMenu(5)}>
                            <IoIosImages className="text-[20px]" />
                            <span>Banners</span>
                            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' ><FaAngleDown className={`transition-all ${subMenuIndex === 5 ? 'rotate-180' : ''}`} /></span>
                        </Button>
                        <Collapse isOpened={subMenuIndex === 5 ? true : false}>
                            <ul className="w-full">
                                <li className="w-full">
                                    <Link to="/bannerV1/List" onClick={() => {
                                        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                        setSubMenuIndex(null);
                                    }}>
                                        <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                            <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>{" "}
                                            Banner V1 List
                                        </Button>
                                    </Link>
                                </li>
                                <li className="w-full">

                                    <Button onClick={() => {
                                        context.setIsOpenFullScreenPanel({
                                            open: true,
                                            model: 'Add BannerV1'
                                        })
                                        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                        setSubMenuIndex(null);
                                    }}
                                        className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                        <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                                        Add Banner V1
                                    </Button>

                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li>
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3 hover:!bg-[#f1f1f1]" onClick={() => isOpenSubMenu(6)}>
                            <IoIosImages className="text-[20px]" />
                            <span>Home Slides</span>
                            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' ><FaAngleDown className={`transition-all ${subMenuIndex === 6 ? 'rotate-180' : ''}`} /></span>
                        </Button>
                        <Collapse isOpened={subMenuIndex === 6 ? true : false}>
                            <ul className="w-full">
                                <li className="w-full">
                                    <Link to="/homeSlider/list" onClick={() => {
                                        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                        setSubMenuIndex(null);
                                    }}>
                                        <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                            <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>{" "}
                                            Home Banners List
                                        </Button>
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Button onClick={() => {
                                        context.setIsOpenFullScreenPanel({
                                            open: true,
                                            model: 'Add Home Slide'
                                        })
                                        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                        setSubMenuIndex(null);
                                    }} className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                        <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                                        Add Home Banner Slide
                                    </Button>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li>
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3 hover:!bg-[#f1f1f1]" onClick={() => isOpenSubMenu(7)}>
                            <SiBloglovin className="text-[20px]" />
                            <span>Blogs</span>
                            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' ><FaAngleDown className={`transition-all ${subMenuIndex === 6 ? 'rotate-180' : ''}`} /></span>
                        </Button>
                        <Collapse isOpened={subMenuIndex === 7 ? true : false}>
                            <ul className="w-full">
                                <li className="w-full">
                                    <Link to="/blog/list" onClick={() => {
                                        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                        setSubMenuIndex(null);
                                    }}>
                                        <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                            <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>{" "}
                                            Blogs List
                                        </Button>
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Button onClick={() => {
                                        context.setIsOpenFullScreenPanel({
                                            open: true,
                                            model: 'Add Blog'
                                        })
                                        context?.windowWidth < 992 && context?.setIsSidebarOpen(false)
                                        setSubMenuIndex(null);
                                    }} className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                        <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                                        Add Blog
                                    </Button>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li>
                        <Button
                            onClick={logout}
                            className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3 hover:!bg-[#f1f1f1]">
                            <HiOutlineLogout className="text-[20px]" />
                            <span>Logout</span>
                        </Button>
                    </li>
                </ul>
            </div >

            {
                context?.isSidebarOpen &&
                <div
                    onClick={() => context?.setIsSidebarOpen(false)}
                    className="sidebarOverlay sm:hidden  fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-full z-[51]">
                </div>
            }
        </>
    );
}

export default Sidebar;