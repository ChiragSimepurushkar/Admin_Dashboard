import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { CgLogIn } from "react-icons/cg";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaRegEye, FaRegUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { fetchDataFromApi, postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from '../../firebase';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();


const SignUp = () => {
    const [loadingGoogle, setLoadingGoogle] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const context = useContext(MyContext);
    const history = useNavigate();

    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        password: ""
    })

    const authWithGoogle = () => {
        setLoadingGoogle(true);

        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                const fields = {
                    name: user.providerData[0].displayName,
                    email: user.providerData[0].email,
                    password: null,
                    avatar: user.providerData[0].photoURL,
                    mobile: user.providerData[0].phoneNumber,
                    role: "USER"
                };

                postData("/api/user/authWithGoogle", fields).then((res) => {
                    if (res?.success === true) {
                        setLoadingGoogle(false);
                        context.openAlertBox("success", res?.message);
                        localStorage.setItem("userEmail", fields.email);
                        localStorage.setItem("accesstoken", res?.data?.accesstoken);
                        localStorage.setItem("refreshToken", res?.data.refreshToken)
                        context.setIsLogin(true);
                        fetchDataFromApi(`/api/user/user-details`).then((userRes) => {
                            if (userRes?.data) {
                                context.setuserData(userRes.data);
                            }
                            // history("/");
                            window.location.href = "/";
                        });
                    } else {
                        context.openAlertBox("error", res?.message);
                        setLoadingGoogle(false);
                    }
                })
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [loadingfb, setLoadingfb] = React.useState(false);
    function handleClickfb() {
        setLoadingfb(true);
    }

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

        if (formFields.name === "") {
            context.openAlertBox("error", "Please Enter your Full Name")
            return false;
        }
        if (formFields.email === "") {
            context.openAlertBox("error", "Please Enter Email")
            return false;
        }
        if (formFields.password === "") {
            context.openAlertBox("error", "Please Enter Password")
            return false;
        }

        postData("/api/user/register", formFields).then((res) => {
            console.log(res)
            if (res?.success === true) {
                setIsLoading(false);
                context.openAlertBox("success", res?.message);
                localStorage.setItem("userEmail", formFields.email)
                setFormFields({
                    name: "",
                    email: "",
                    password: ""
                })
                history("/verify-account")
            } else {
                context.openAlertBox("error", res?.message);
                setIsLoading(false);
            }
        })
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
            <div className="loginBox card w-full md:w-[600px] h-[auto] pb-20 mx-auto !pt-5 lg:!pt-20 relative z-50">
                <div className="text-center">
                    <img src="/icon.png" className="m-auto h-[90px] w-[90px]" />
                </div>

                <h1 className="text-center text-[18px] sm:text-[35px] font-[800] mt-2 sm:mt-4">
                    Join us Today!<br />
                    <span className='text-[#3872fa]'> Get special benefits and stay up-to-date.</span>
                </h1>
                <div className="flex items-center justify-center w-full mt-5 gap-4">
                    <Button
                        size="small"
                        onClick={authWithGoogle}
                        endIcon={<FcGoogle />}
                        loading={loadingGoogle}
                        loadingPosition="end"
                        variant="outlined"
                        className='!text-[15px] !py-2 !bg-none !capitalize !px-5 !text-[rgba(0,0,0,0.7)]'
                    >
                        Sign Up with Google
                    </Button>
                    {/* <Button
                        size="small"
                        onClick={handleClickfb}
                        endIcon={<MdFacebook />}
                        loading={loadingfb}
                        loadingPosition="end"
                        variant="outlined"
                        className='!text-[15px] !py-2 !bg-none !capitalize !px-5 !text-[rgba(0,0,0,0.7)]'
                    >
                        SignIn with FaceBook
                    </Button> */}
                </div>
                <br />
                <div className="w-full flex items-center justify-center gap-3">
                    <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
                    <span className="text-[10px] lg:text-[14px] font-[500]">Or, Sign in with your email</span>
                    <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
                </div>
                <br />
                <form className="w-full px-8 mt-3" onSubmit={handleSubmit}><div className="form-group mb-4 w-full">
                    <h4 className="text-[14px] font-[500] mb-1">Full Name</h4>
                    <input
                        name="name"
                        value={formFields.name}
                        disabled={isLoading}
                        onChange={onChangeInput}
                        type="text"
                        className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                    />
                </div>
                    <div className="form-group mb-4 w-full">
                        <h4 className="text-[14px] font-[500] mb-1">Email</h4>
                        <input
                            name="email"
                            value={formFields.email}
                            disabled={isLoading}
                            onChange={onChangeInput}
                            type="email"
                            className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                        />
                    </div>
                    <div className="form-group mb-4 w-full">
                        <h4 className="text-[14px] font-[500] mb-1">Password</h4>
                        <div className="relative w-full">
                            <input
                                name="password"
                                value={formFields.password}
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
                    </div>
                    <div className="form-group mb-4 w-full flex items-center justify-between">
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Remember Me"
                        />
                        <Link
                            to="/forgot-password"
                            className="text-primary font-[700] text-[15px] hover:underline hover:text-gray-700"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[14px]">Already have an account?</span>
                        <Link to="/login"
                            className="text-[#3872fa] font-[700] text-[15px]
                            hover:underline hover:text-gray-700 cursor-pointer"
                        >
                            Sign In
                        </Link>
                    </div>
                    <Button type="submit" disabled={!valideValue} className="btn-blue btn-lg w-full">
                        {
                            isLoading === true ? <CircularProgress color="inherit" />
                                :
                                'Sign up'
                        }
                    </Button>
                </form>
            </div>
        </section>
    );
}

export default SignUp;