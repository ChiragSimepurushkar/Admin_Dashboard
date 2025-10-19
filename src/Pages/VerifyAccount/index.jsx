import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { CgLogIn } from "react-icons/cg";
import { Link, NavLink } from 'react-router-dom';
import { FaEyeSlash, FaRegEye, FaRegUser } from "react-icons/fa";
import OtpBox from '../../Components/OtpBox';
const VerifyAccount = () => {
    const [otp, setOtp] = useState("");
    const handleOtpChange = (value) => {
        setOtp(value);
    };
    return (
        <section className="bg-white w-full h-[100vh]">
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
                    <img src="/shield.png" className="w-[100px] m-auto" />
                </div>

                <h1 className="text-center text-[35px] font-[800] mt-4">
                    Welcome Back!<br />
                    <span className='text-[#3872fa]'>Please Verify your Email.</span>
                </h1>
                <br />
                <p className="text-center text-[15px]">
                    OTP send to &nbsp;
                    <span className="text-primary font-bold">rinkuv97@gmail.com</span>
                </p>
                <br />
                <div className="text-center flex items-center justify-center flex-col">
                    <OtpBox length={6} onChange={handleOtpChange} />
                </div>
                <br />
                <div className="w-[300px] m-auto">
                    <Button className="btn-blue w-full">Verify OTP</Button>
                </div>
            </div>
        </section>
    );
}

export default VerifyAccount;