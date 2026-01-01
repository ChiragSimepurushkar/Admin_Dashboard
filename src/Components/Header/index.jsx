import React, { useContext } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaRegBell } from "react-icons/fa";
import { useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MyContext } from '../../App'
import { RiMenuFold4Line } from "react-icons/ri";
import { RiMenuFold3Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import AddProduct from "../../Pages/Products/AddProduct"
import EditCategory from "../../Pages/Category/EditCategory"
import AddAddress from "../../Pages/Address/addAddress"
import AddSubCategory from "../../Pages/Category/addSubCategory"
import AddCategory from "../../Pages/Category/addCategory"
import AddHomeSlide from "../../Pages/HomeSliderBanners/addHomeSlide"
import EditProduct from '../../Pages/Products/EditProduct';
import { AddBannerV1 } from '../../Pages/Banners/addBannerV1';
import { EditBannerV1 } from '../../Pages/Banners/editBannerV1';
import AddBlog from '../../Pages/Blog/addBlog';
import EditBlog from '../../Pages/Blog/editBlog';
import EditHomeSlide from '../../Pages/HomeSliderBanners/EditHomeSlides';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
        padding: '0 4px',
    },
}));
const Header = () => {
    const [anchorMyAcc, setAnchorMyAcc] = useState(null);
    const openMyAcc = Boolean(anchorMyAcc);
    const handleClickMyAcc = (event) => {
        setAnchorMyAcc(event.currentTarget);
    };
    const handleCloseMyAcc = () => {
        setAnchorMyAcc(null);
    };
    // const history = useNavigate();
    const context = useContext(MyContext);

    const logout = () => {
        setAnchorMyAcc(null);

        const token = localStorage.getItem("accesstoken");

        // Clear everything first
        context.setIsLogin(false);
        context.setuserData(null);
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshToken");

        // If no token, just redirect
        if (!token) {
            context.openAlertBox("error", "Already logged out");
            setTimeout(() => {
                window.location.href = "/login";
            }, 500);
            return;
        }

        // Try to call the backend logout API
        fetchDataFromApi(`/api/user/logout?token=${token}`)
            .then((res) => {
                if (res?.success === true) {
                    context.openAlertBox("Success", "You have been logged out.");
                } else {
                    context.openAlertBox("error", res?.message || "Logged out.");
                }
            })
            .catch(err => {
                console.error("Logout failed:", err);
                context.openAlertBox("error", "Logged out.");
            })
            .finally(() => {
                // Always redirect after a delay
                setTimeout(() => {
                    window.location.href = "/login";
                }, 1000);
            });
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 z-[52] shadow-md flex items-center justify-between w-full h-auto py-2 pr-7 bg-[#fff] transition-all duration-300
  ${context.isSidebarOpen && context.windowWidth >= 992 ? 'sidebar-open' : 'sidebar-closed'}`}>

                <div className="part1">
                    <Button
                        onClick={() => context.setIsSidebarOpen(!context.isSidebarOpen)}
                        className="!w-[40px] !min-w-[40px] !h-[40px] !rounded-full !text-[rgba(0,0,0,0.8)]">
                        {
                            context.isSidebarOpen === true ?
                                <RiMenuFold3Line className="text-[20px] text-[rgba(0,0,0,0.8)]" />
                                :
                                <RiMenuFold4Line className="text-[20px] text-[rgba(0,0,0,0.8)]" />
                        }
                    </Button>
                </div>
                <div className="part2 w-[40%] flex items-center justify-end gap-5">
                    {/* <IconButton aria-label="cart">
                        <StyledBadge badgeContent={4} color="secondary">
                            <FaRegBell />
                        </StyledBadge>
                    </IconButton> */}
                    {
                        context.isLogin === true ?
                            <div className="relative">

                                {context?.userData?.avatar ? (
                                    <div
                                        onClick={handleClickMyAcc}
                                        className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer">

                                        <img
                                            src={context.userData.avatar}
                                            alt={context.userData.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div
                                        onClick={handleClickMyAcc}
                                        className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer">

                                        <img src="https://ecme-react.themenate.net/img/avatars/thumb-1.jpg"
                                            className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <Menu
                                    anchorEl={anchorMyAcc}
                                    id="account-menu"
                                    open={openMyAcc}
                                    onClose={handleCloseMyAcc}
                                    onClick={handleCloseMyAcc}
                                    slotProps={{
                                        paper: {
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleCloseMyAcc} className='!bg-white'>
                                        <div className="flex items-center gap-3">
                                            <div

                                                className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer">
                                                {context?.userData?.avatar ? (

                                                    <img
                                                        src={context.userData.avatar}
                                                        alt={context.userData.name}
                                                        className="w-full h-full object-cover"
                                                    />

                                                ) : (

                                                    <img src="https://ecme-react.themenate.net/img/avatars/thumb-1.jpg"
                                                        className="w-full h-full object-cover" />

                                                )}
                                            </div>
                                            <div className="info">
                                                <h3 className="text-[15px] font-[500] leading-5">{context?.userData?.name}</h3>
                                                <p className="text-[12px] font-[400] opacity-70">{context?.userData?.email}</p>
                                            </div>
                                        </div>
                                    </MenuItem>
                                    <Divider />
                                    <Link to="/profile">
                                        <MenuItem onClick={handleCloseMyAcc} className="flex items-center gap-3">
                                            <FaRegUser className='text-[16px]' /> <span className="text-[14px]">Profile</span>
                                        </MenuItem>
                                    </Link>
                                    <MenuItem onClick={logout} className="flex items-center gap-3">
                                        <HiOutlineLogout className='text-[18px]' /> <span className="text-[14px]">Sign out</span>
                                    </MenuItem>
                                </Menu>
                            </div>
                            :
                            <Link to="/login">
                                <Button className="btn-blue btn-sm !rounded-full">Sign In</Button>
                            </Link>
                    }
                </div>
            </header>
            <Dialog
                fullScreen
                open={context?.isOpenFullScreenPanel.open}
                onClose={() => context?.setIsOpenFullScreenPanel({
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
                            onClick={() => context?.setIsOpenFullScreenPanel({
                                open: false
                            })}
                            aria-label="close"
                        >
                            <IoMdClose className="text-gray-800" />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            <span className="text-gray-800">{context?.isOpenFullScreenPanel?.model}</span>
                        </Typography>
                    </Toolbar>
                </AppBar>
                {
                    context?.isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />
                }
                {
                    context?.isOpenFullScreenPanel?.model === "Add Home Slide" && <AddHomeSlide />
                },
                {
                    context?.isOpenFullScreenPanel?.model === "Edit Home Slide" && <EditHomeSlide />
                }
                {
                    context?.isOpenFullScreenPanel?.model === "Add New Category" && <AddCategory />
                }
                {
                    context?.isOpenFullScreenPanel?.model === "Add New Sub Category" && <AddSubCategory />
                }
                {
                    context?.isOpenFullScreenPanel?.model === "Add New Address" && <AddAddress />
                }
                {
                    context?.isOpenFullScreenPanel?.model === "Edit Category" && <EditCategory />
                }
                {
                    context?.isOpenFullScreenPanel?.model === "Edit Product" && <EditProduct />
                }
                {
                    context?.isOpenFullScreenPanel?.model === "Add BannerV1" && <AddBannerV1 />
                }
                {
                    context?.isOpenFullScreenPanel?.model === "Edit BannerV1" && <EditBannerV1 />
                }
                {
                    context?.isOpenFullScreenPanel?.model === "Add Blog" && <AddBlog />
                }
                {
                    context?.isOpenFullScreenPanel?.model === "Edit Blog" && <EditBlog />
                }
            </Dialog>
        </>
    );
}

export default Header;