import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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

const Sidebar = () => {
    const [subMenuIndex, setSubMenuIndex] = useState(null);
    const isOpenSubMenu = (index) => {
        if (subMenuIndex === index) {
            setSubMenuIndex(null);
        } else {
            setSubMenuIndex(index);
        }
    }
    const context = useContext(MyContext);
    return (
        <>
            <div
                className={`sidebar fixed top-0 left-0 bg-[#fff] h-full overflow-y-auto
border-r border-[rgba(0,0,0,0.1)] py-2 px-4 transition-all duration-300 z-10
${context.isSidebarOpen === true ? 'w-[18%]' : 'w-0 opacity-0 pointer-events-none'}`}>
                <div className="py-2 w-full">
                    <Link to="/">
                        <img src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg"
                            className="w-[200px]" />
                    </Link>
                </div>
                <ul className="mt-4">
                    <li>
                        <Link to="/">
                            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3 hover:!bg-[#f1f1f1]">
                                <MdSpaceDashboard className="!text-[20px]" />
                                <span>Dashboard</span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/users">
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
                                    <Link to="/products">
                                        <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                            <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>{" "}
                                            Product List
                                        </Button>
                                    </Link>
                                </li>
                                <li className="w-full">

                                    <Button onClick={() => context.setIsOpenFullScreenPanel({
                                        open: true,
                                        model: 'Add Product'
                                    })}
                                        className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                        <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                                        Product Upload
                                    </Button>

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
                                    <Link to="/category/list">
                                        <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                            <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>{" "}
                                            Category List
                                        </Button>
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Button onClick={() => context.setIsOpenFullScreenPanel({
                                        open: true,
                                        model: 'Add New Category'
                                    })} className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                        <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                                        Add a Category
                                    </Button>
                                </li>
                                <li className="w-full">
                                    <Link to="/subCategory/list">
                                        <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                            <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                                            Sub Category List
                                        </Button>
                                    </Link>
                                </li>
                                <li className="w-full">
                                        <Button onClick={() => context.setIsOpenFullScreenPanel({
                                            open: true,
                                            model: 'Add New Sub Category'
                                        })} className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                            <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                                            Add a Sub Category
                                        </Button>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li>
                        <Link to="/orders">
                            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3 hover:!bg-[#f1f1f1]">
                                <FaBoxArchive className="text-[20px]" />
                                <span>Orders</span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3 hover:!bg-[#f1f1f1]" onClick={() => isOpenSubMenu(5)}>
                            <IoIosImages className="text-[20px]" />
                            <span>Home Slides</span>
                            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' ><FaAngleDown className={`transition-all ${subMenuIndex === 5 ? 'rotate-180' : ''}`} /></span>
                        </Button>
                        <Collapse isOpened={subMenuIndex === 5 ? true : false}>
                            <ul className="w-full">
                                <li className="w-full">
                                    <Link to="/homeSlider/list">
                                        <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                            <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>{" "}
                                            Home Banners List
                                        </Button>
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Button onClick={() => context.setIsOpenFullScreenPanel({
                                        open: true,
                                        model: 'Add Home Slide'
                                    })} className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                                        <span className="block !w-[5px] !h-[5px] !rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                                        Add Home Banner Slide
                                    </Button>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li>
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3 hover:!bg-[#f1f1f1]">
                            <HiOutlineLogout className="text-[20px]" />
                            <span>Logout</span>
                        </Button>
                    </li>
                </ul>
            </div >
        </>
    );
}

export default Sidebar;