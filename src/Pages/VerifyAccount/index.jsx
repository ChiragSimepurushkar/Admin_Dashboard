import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { CgLogIn } from "react-icons/cg";
import { Link, NavLink } from 'react-router-dom';
import { FaEyeSlash, FaRegEye, FaRegUser } from "react-icons/fa";
import OtpBox from '../../Components/OtpBox';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';

const VerifyAccount = () => {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleOtpChange = (value) => {
        setOtp(value);
    };
    const history = useNavigate();
    const context = useContext(MyContext)

    const verifyOTP = (e) => {
        e.preventDefault();
        if (otp !== "") {
            setIsLoading(true)
            const actionType = localStorage.getItem("actionType")
            if (actionType !== "forgot-password") {
                postData("/api/user/verifyEmail", {
                    email: localStorage.getItem("userEmail"),
                    otp: otp
                }).then((res) => {
                    if (res?.success === true) {
                        context.openAlertBox("success", res?.message)
                        localStorage.removeItem("userEmail")
                        setIsLoading(false)
                        history("/login")
                    } else {
                        setIsLoading(false)
                        context.openAlertBox("error", res?.message)
                    }
                }).catch((error) => {
                    console.error("Error:", error);
                    context.openAlertBox("error", "Something went wrong!");
                });
            } else {
                postData("/api/user/verify-forgot-password-otp", {
                    email: localStorage.getItem("userEmail"),
                    otp: otp
                }).then((res) => {
                    if (res?.success === true) {
                        context.openAlertBox("success", res?.message)
                        history("/change-password")
                    } else {
                        setIsLoading(false)
                        context.openAlertBox("error", res?.message)
                    }
                }).catch((error) => {
                    console.error("Error:", error);
                    context.openAlertBox("error", "Something went wrong!");
                });
            }
        } else {
            context.openAlertBox("error", "Please Enter OTP!");

        }

    }
    return (
        <section className="bg-white w-full h-[100vh]">
            <header className="w-full static lg:fixed top-0 left-0 px-4 py-3 flex items-center justify-center 
            sm:justify-between z-50">
                <Link to="/">
                    <img
                        src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg"
                        className="w-[200px]"
                    />
                </Link>
                <div className="hidden sm:!flex items-center gap-0">
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
            <div className="loginBox card w-full md:w-[600px] h-[auto] pb-20 mx-auto !pt-5 lg:!pt-20 relative z-50">
                <div className="text-center">
                    <img src="/shield.png" className="w-[100px] m-auto" />
                </div>

                <h1 className="text-center text-[18px] sm:text-[35px] font-[800] mt-2 sm:mt-4">
                    Welcome Back!<br />
                    <span className='text-[#3872fa]'>Please Verify your Email.</span>
                </h1>
                <br />
                <p className="text-center sm:text-[15px] text-[12px]">
                    OTP send to &nbsp;
                    <span className="text-[#3872fa] text-[12px] sm:text-[15px] font-bold">{localStorage.getItem("userEmail")}</span>
                </p>
                <br />
                <form onSubmit={verifyOTP}>

                    <div className="text-center flex items-center justify-center flex-col">
                        <OtpBox length={6} onChange={handleOtpChange} />
                    </div>

                    <br />
                    <div className="w-[300px] m-auto">
                        <Button type="submit" className="btn-blue w-full">{
                            isLoading === true ? <CircularProgress color="inherit" />
                                :
                                'Verify OTP'
                        }</Button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default VerifyAccount;