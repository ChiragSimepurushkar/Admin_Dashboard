import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { LuUpload } from 'react-icons/lu';
import { fetchDataFromApi, uploadImage } from '../../utils/api';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { editData, postData } from '../../utils/api';
import Collapse from '@mui/material/Collapse';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Radio from '@mui/material/Radio';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Profile = () => {
    const [phone, setPhone] = useState('');
    const [previews, setPreviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [userId, setuserId] = useState("");
    const [isChangedPasswordFormShow, setIsChangedPasswordFormShow] = useState(false);
    const [address, setAddress] = useState([])
    const context = useContext(MyContext);
    useEffect(() => {
        const userAvatar = [];
        if (context?.userData?.avatar !== "" && context?.userData?.avatar !== undefined) {
            userAvatar.push(context?.userData?.avatar);
            setPreviews(userAvatar)
        }
    }, [context?.userData])

    const formdata = new FormData();
    let selectedImages = [];

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            setPreviews([]);
            const files = e.target.files;
            setUploading(true);
            console.log(files);

            for (var i = 0; i < files.length; i++) {
                // Check if the file exists and its MIME type is a valid image format
                if (files[i] &&
                    (files[i].type === "image/jpeg" ||
                        files[i].type === "image/jpg" ||
                        files[i].type === "image/png" ||
                        files[i].type === "image/webp")
                ) {
                    const file = files[i];
                    selectedImages.push(file);
                    formdata.append('avatar', file);
                } else {
                    setUploading(false);
                    context.setAlertBox("error", "Please select a valid JPG, PNG or webp image file.",);
                    // Stop processing immediately
                    return false;
                }
                uploadImage("/api/user/user-avatar", formdata).then((res) => {
                    setUploading(false);
                    let avatar = [];
                    avatar.push(res?.data?.avtar);
                    setPreviews(avatar)
                })
            }

        } catch (error) {
            console.log(error);
            // Ensure uploading state is set to false here on error
            setUploading(false);
        }
    };

    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        mobile: ''
    });

    const [changePassword, setChangePassword] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const history = useNavigate();
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })

        setChangePassword(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const valideValue = Object.values(formFields).every(el => el);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);
        if (formFields.name === "") {
            context.openAlertBox("error", "Please Enter Full Name")
            return false;
        }
        if (formFields.email === "") {
            context.openAlertBox("error", "Please Enter Email ID")
            return false;
        }
        if (formFields.mobile === "") {
            context.openAlertBox("error", "Please Enter Mobile Number")
            return false;
        }

        editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then((res) => {
            console.log(res)
            if (res?.success !== false) {
                setIsLoading(false);
                context.openAlertBox("success", res?.data?.message);
                context?.setIsOpenFullScreenPanel({
                    open: false
                })
            } else {
                context.openAlertBox("error", res?.data?.message);
                setIsLoading(false);
            }
        })
    }
    useEffect(() => {
        setFormFields((prevState) => ({
            ...prevState,
            userId: context?.userData?._id
        }))
    }, [context?.userData]);

    const valideValue2 = Object.values(formFields).every(el => el);

    const handleSubmitChangePassword = (e) => {
        e.preventDefault();

        setIsLoading2(true);
        if (changePassword.oldPassword === "") {
            context.openAlertBox("error", "Please Enter Old Password")
            setIsLoading2(false);

            return false;
        }
        if (changePassword.newPassword === "") {
            context.openAlertBox("error", "Please Enter New Password")
            setIsLoading2(false);
            return false;
        }
        if (changePassword.confirmPassword === "") {
            context.openAlertBox("error", "Please Enter Confirm Password")
            setIsLoading2(false);
            return false;
        }
        if (changePassword.confirmPassword !== changePassword.newPassword) {
            context.openAlertBox("error", "new Password & Confirm Password are mismatched")
            setIsLoading2(false);
            return false;
        }

        postData(`/api/user/reset-password`, changePassword, { withCredentials: true }).then((res) => {
            if (res?.success !== false) {
                setIsLoading2(false);
                context.openAlertBox("success", res?.message);
                setIsChangedPasswordFormShow(false)
            } else {
                context.openAlertBox("error", res?.message);
                setIsLoading2(false);
            }
        })
    }

    useEffect(() => {
        const token = localStorage.getItem("accesstoken");

        if (!token) {
            history("/login");
        }

    }, [context?.isLogin, history])


    useEffect(() => {
        if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
            fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                setAddress(res.data);
                context?.setAddress(res.data);
            })

            setuserId(context?.userData?._id)
            setFormFields({
                name: context?.userData?.name,
                email: context?.userData?.email,
                mobile: context?.userData?.mobile,
            })
            const ph = `"${context?.userData?.mobile}"`;
            setPhone(ph)
            setChangePassword({
                email: context?.userData?.email,
            })
        }
    }, [context?.userData])

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        // if (event.target.checked === true) {
        //     editData(`/api/address/selectAddress/${event.target.value}`, { selected: true })
        // } else {
        //     editData(`/api/address/selectAddress/${event.target.value}`, { selected: false })
        // }
    };

    return (
        <>
            <div className="card pt-5 !my-0 w-[100%] sm:w-[100%] lg:w-[65%] shadow-md sm:rounded-lg bg-white px-5 pb-5 rounded-md ">
                <div className="flex items-center justify-between">
                    <h2 className='text-[19px] font-[600]'>Users Profile
                    </h2>
                    <Button className='!ml-auto' onClick={() => setIsChangedPasswordFormShow(!isChangedPasswordFormShow)}>Change Password</Button>
                </div>
                <br />
                <div className="w-[110px] relative h-[110px] !mb-4 rounded-full
                 overflow-hidden group flex items-center justify-center bg-gray-200">
                    {
                        uploading === true ? <CircularProgress color="inherit" /> :
                            <>
                                {
                                    previews?.length !== 0 ?
                                        previews.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                className="w-full h-full object-cover"
                                            />
                                        ))
                                        :
                                        <img
                                            src={'/user.png'}
                                            className="w-full h-full object-cover"
                                        />
                                }
                            </>
                    }
                    <div
                        className="overlay w-[100%] h-[100%] flex items-center justify-center
                                absolute top-0 opacity-0 transition-all left-0 z-50 bg-[rgba(0,0,0,0.7)]
                                 cursor-pointer group-hover:opacity-100">
                        <LuUpload className='text-[#fff] text-[25px]' />
                        <input type='file'
                            accept="image/*"
                            onChange={(e) => {
                                onChangeFile(e, "/api/user/user-avatar")
                            }}
                            name="avatar"
                            className='w-full cursor-pointer opacity-0 h-full absolute top-0 left-0' />
                    </div>
                </div>

                <form className='form !mt-8 ' onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="col">
                            <TextField
                                name="name"
                                value={formFields.name}
                                disabled={isLoading}
                                onChange={onChangeInput}
                                size="small" className='!w-full'
                                label="Full Name" variant="outlined" />
                        </div>
                        <div className="col">
                            <TextField name="email"
                                value={formFields.email}
                                type="email"
                                disabled={true}
                                onChange={onChangeInput} size="small" className='!w-full'
                                label="Email" variant="outlined" />
                        </div>
                        <div className="col">
                            <div>
                                <PhoneInput
                                    name="mobile"
                                    defaultCountry="in"
                                    value={phone}
                                    disabled={isLoading}
                                    onChange={(phone) => {
                                        setPhone(phone);
                                        setFormFields(prev => ({
                                            ...prev,
                                            mobile: phone
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex !mt-4 items-center gap-5">
                        {/* <div className="col">
                            <div>
                                <PhoneInput
                                    name="mobile"
                                    defaultCountry="in"
                                    value={phone}
                                    disabled={isLoading}
                                    onChange={(phone) => {
                                        setPhone(phone);
                                        setFormFields(prev => ({
                                            ...prev,
                                            mobile: phone
                                        }));
                                    }}
                                />
                            </div>
                             <TextField name="mobile"
                                value={formFields.mobile}
                                disabled={isLoading}
                                onChange={onChangeInput} size="small" className='!w-full'
                                label="Phone Number" variant="outlined" /> 
                        </div> 
                    </div> */}
                    <br></br>
                    <div className="flex items-center rounded-md
                     justify-center p-5 border border-dashed 
                     border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e0f3fe] cursor-pointer">
                        <span className='text-[14px] font-[500]'
                            onClick={() => context.setIsOpenFullScreenPanel({
                                open: true,
                                model: 'Add New Address'
                            })}
                        >
                            Add Address</span>
                    </div>
                    <div className="flex gap-2 flex-col mt-4">
                        {
                            address?.length > 0 && address?.map((address, index) => {
                                return (
                                    <>
                                        <label key={address?._id || index}
                                            className='border border-dashed border-[rgba(0, 0, 0, 0.2)] addressBox w-full flex items-center justify-center bg-[#f1f1f1] p-3 rounded-md cursor-pointer'>
                                            <Radio onChange={handleChange} {...label}
                                                checked={
                                                    selectedValue ===
                                                    (
                                                        address?._id
                                                    )
                                                }
                                                name="address"
                                                value={address?._id} />
                                            <span className='text-[12px]'>
                                                {address?.address_line1 + " " +
                                                    address?.city + " " +
                                                    address?.country + " " +
                                                    address?.state + " " +
                                                    address?.pincode}
                                            </span>
                                        </label>
                                    </>
                                )
                            })
                        }
                    </div>

                    <br>
                    </br>
                    <div className="flex items-center gap-4">
                        <Button disabled={!valideValue || isLoading} type="submit"
                            className="btn-blue btn-lg w-full">
                            {
                                isLoading === true ? <CircularProgress color="inherit" />
                                    :
                                    'Update Profile'
                            }
                        </Button>

                    </div>
                </form>
            </div>
            <Collapse in={isChangedPasswordFormShow}>
                <div className="card  w-[100%] sm:w-[100%] lg:w-[65%] bg-white p-5 shadow-md rounded-md !mt-5">
                    <div className="text-[19px] font-[600] flex items-center pb-3">
                        <h2 className="pb-0">Change Password</h2>
                    </div>
                    <hr className='text-[rgba(0,0,0,0.2)]' />
                    <form className='!mt-8 ' onSubmit={handleSubmitChangePassword}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {
                                context?.userData?.signUpWithGoogle === false &&
                                <div className="col">
                                    <TextField
                                        name="oldPassword"
                                        value={changePassword.oldPassword}
                                        disabled={isLoading2}
                                        onChange={onChangeInput}
                                        size="small" className='!w-full'
                                        label="Old Password" variant="outlined" />
                                </div>
                            }
                            <div className="col">
                                <TextField name="newPassword"
                                    value={changePassword.newPassword}
                                    onChange={onChangeInput} size="small" className='!w-full'
                                    label="New Password" variant="outlined" />
                            </div>
                            <div className="col">
                                <TextField name="confirmPassword"
                                    value={changePassword.confirmPassword}
                                    onChange={onChangeInput} size="small" className='!w-full'
                                    label="Confirm Password" variant="outlined" />
                            </div>
                        </div>
                        {/* <div className="flex !mt-4 items-center gap-5">
                            <div className="w-[50%]">
                                <TextField name="confirmPassword"
                                    value={changePassword.confirmPassword}
                                    onChange={onChangeInput} size="small" className='!w-full'
                                    label="Confirm Password" variant="outlined" />
                            </div>
                        </div> */}
                        <br></br>
                        <div className="flex items-center gap-4">
                            <Button 
                            // disabled={!valideValue2}
                             type="submit"
                                className="btn-blue btn-lg w-[100%]">
                                {
                                    isLoading2 === true ? <CircularProgress color="inherit" />
                                        :
                                        'Change Password'
                                }
                            </Button>

                        </div>
                    </form>
                </div>
            </Collapse>

        </>
    );
}

export default Profile;