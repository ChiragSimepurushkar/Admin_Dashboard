import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { CgLogIn } from "react-icons/cg";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaRegEye, FaRegUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/api'
import { useContext } from 'react';
const ChangePassword = () => {

    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isPasswordShow2, setIsPasswordShow2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        email: localStorage.getItem("userEmail") || '',
        newPassword: '',
        confirmPassword: ''
    });

    const context = useContext(MyContext)
    const history = useNavigate();

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }
    const valideValue = Object.values(formFields).every(el => el);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);
        if (formFields.newPassword === "") {
            context.openAlertBox("error", "Please Enter new Password")
            setIsLoading(false);
            return false;
        }
        if (formFields.confirmPassword === "") {
            context.openAlertBox("error", "Please Enter Confirm Password")
            setIsLoading(false);
            return false;
        }
        if (formFields.confirmPassword !== formFields.newPassword) {
            context.openAlertBox("error", "Confirm Password & New Password Do not Match")
            setIsLoading(false);
            return false;
        }
        postData('/api/user/reset-password', formFields)
            .then((res) => {
                console.log(res);
                if (res?.success === true) {
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("actionType");
                    context.openAlertBox("success", res?.message);
                    setIsLoading(false);
                    history("/login")
                } else {
                    context.openAlertBox("error", res?.message);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Password reset failed:", error);
                setIsLoading(false);
            });
    }

    return (
        <section className="bg-white w-full">
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
            <div className="loginBox card w-full md:w-[600px] h-[auto] px-3 pb-20 mx-auto !pt-5 lg:!pt-20 relative z-50">
                <div className="text-center">
                    <img src="/icon.png" className="m-auto h-[90px] w-[90px]" />
                </div>

                <h1 className="text-center text-[18px] sm:text-[35px] font-[800] mt-2 sm:mt-4">
                    Welcome Back!<br />
                    <span className='text-[#3872fa]'>Enter Your New Password.</span>
                </h1>

                <br />
                <form className="w-full px-3 md:px-8 mt-3" onSubmit={handleSubmit}>
                    <div className="form-group mb-4 w-full">
                        <h4 className="text-[14px] font-[500] mb-1">New Password</h4>
                        <div className="relative w-full">
                            <input
                                name="newPassword"
                                value={formFields.newPassword}
                                disabled={isLoading}
                                onChange={onChangeInput}
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
                        <h4 className="text-[14px] font-[500] mt-3 mb-1">Confirm Password</h4>
                        <div className="relative w-full">
                            <input
                                name="confirmPassword"
                                value={formFields.confirmPassword}
                                disabled={isLoading}
                                onChange={onChangeInput}
                                type={isPasswordShow2 === true ? "password" : "text"}
                                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                            />
                            <Button className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600"
                                onClick={() => setIsPasswordShow2(!isPasswordShow2)}>
                                {isPasswordShow2 === false ? (
                                    <FaRegEye className="text-[18px]" />
                                ) : (
                                    <FaEyeSlash className="text-[18px]" />
                                )}
                            </Button>
                        </div>
                    </div>
                    <Button className="btn-blue btn-lg w-full mt-5" disabled={!valideValue} type="submit">
                        {
                            isLoading === true ? <CircularProgress color="inherit" />
                                :
                                'Change Password'
                        }</Button>
                </form>
            </div>
        </section>
    );
}

export default ChangePassword;