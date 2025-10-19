import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { CgLogIn } from "react-icons/cg";
import { Link, NavLink } from 'react-router-dom';
import { FaEyeSlash, FaRegEye, FaRegUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const Login = () => {
    const [loadingGoogle, setLoadingGoogle] = React.useState(false);
    function handleClickGoogle() {
        setLoadingGoogle(true);
    } const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [loadingfb, setLoadingfb] = React.useState(false);
    function handleClickfb() {
        setLoadingfb(true);
    }
    return (
        <section className="bg-white w-full">
            <header className="w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50">
                <Link to="/">
                    <img
                        src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg"
                        className="w-[200px]"
                    />
                </Link>
                <div className="flex items-center gap-0">
                    <NavLink to="/login" exact={true} activeClassName="isActive">
                        <Button className="!rounded-full flex gap-2 !text-[rgba(0,0,0,0.8)] !px-5">
                            <CgLogIn className='text-[18px]' />Login
                        </Button>
                    </NavLink>
                    <NavLink to="/sign-up" exact={true} activeClassName="isActive">
                        <Button className="!rounded-full flex gap-2 !text-[rgba(0,0,0,0.8)] !px-5">
                            <FaRegUser className='text-[16px]' />Sign Up
                        </Button>
                    </NavLink>
                </div>

            </header>
            <img src="/pattern.png" className="w-full fixed top-0 left-0 opacity-5" />
            <div className="loginBox card w-[600px] h-[auto] pb-20 mx-auto pt-20 relative z-50">
                <div className="text-center">
                    <img src="/icon.png" className="m-auto h-[90px] w-[90px]" />
                </div>

                <h1 className="text-center text-[35px] font-[800] mt-4">
                    Welcome Back!<br />
                    <span className='text-[#3872fa]'>Sign in with your credentials.</span>
                </h1>
                <div className="flex items-center justify-center w-full mt-5 gap-4">
                    <Button
                        size="small"
                        onClick={handleClickGoogle}
                        endIcon={<FcGoogle />}
                        loading={loadingGoogle}
                        loadingPosition="end"
                        variant="outlined"
                        className='!text-[15px] !py-2 !bg-none !capitalize !px-5 !text-[rgba(0,0,0,0.7)]'
                    >
                        SignIn with Google
                    </Button>
                    <Button
                        size="small"
                        onClick={handleClickfb}
                        endIcon={<MdFacebook />}
                        loading={loadingfb}
                        loadingPosition="end"
                        variant="outlined"
                        className='!text-[15px] !py-2 !bg-none !capitalize !px-5 !text-[rgba(0,0,0,0.7)]'
                    >
                        SignIn with FaceBook
                    </Button>
                </div>
                <br />
                <div className="w-full flex items-center justify-center gap-3">
                    <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
                    <span className="text-[14px] font-[500]">Or, Sign in with your email</span>
                    <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
                </div>
                <br />
                <form className="w-full px-8 mt-3">
                    <div className="form-group mb-4 w-full">
                        <h4 className="text-[14px] font-[500] mb-1">Email</h4>
                        <input
                            type="email"
                            className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                        />
                    </div>
                    <div className="form-group mb-4 w-full">
                        <h4 className="text-[14px] font-[500] mb-1">Password</h4>
                        <div className="relative w-full">
                            <input
                                type={isPasswordShow === true ? "password" : "text"}
                                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                            />
                            <Button className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600"
                                onClick={() => setIsPasswordShow(!isPasswordShow)}>
                                {isPasswordShow === false ? (
                                    <FaRegEye className="text-[18px]" />
                                ) : (
                                    <FaEyeSlash className="text-[18px]" />
                                )}
                            </Button>
                        </div>
                    </div>
                    <div className="form-group mb-4 w-full flex items-center justify-between">
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Remember Me"
                        />
                        <Link
                            to="/forgot-password"
                            className="text-[#3872fa] font-[700] text-[15px] hover:underline hover:text-gray-700"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <Button className="btn-blue btn-lg w-full">Sign In</Button>
                </form>
            </div>
        </section>
    );
}

export default Login;