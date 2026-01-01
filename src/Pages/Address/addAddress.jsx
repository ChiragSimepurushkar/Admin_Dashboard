import React from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { fetchDataFromApi, postData } from '../../utils/api'
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useEffect } from 'react';

const AddAddress = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState(false);
    const context = useContext(MyContext)
    const [formFields, setFormFields] = useState({
        address_line1: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        mobile: '',
        status: false,
        userId: '',
        selected:false
    });
    useEffect(() => {
        setFormFields((prevState) => ({
            ...prevState,
            userId: context?.userData?._id
        }))
    }, [context?.userData]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }
    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        setFormFields((prevState) => ({
            ...prevState,
            status: event.target.value
        }))
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);
        if (formFields.address_line1 === "") {
            context.openAlertBox("error", "Please Enter Address Line 1")
            return false;
        }
        if (formFields.state === "") {
            context.openAlertBox("error", "Please Enter Your State Name")
            return false;
        }
        if (formFields.pincode === "") {
            context.openAlertBox("error", "Please Enter pincode")
            return false;
        }
        if (formFields.country === "") {
            context.openAlertBox("error", "Please Enter Country Name")
            return false;
        }
        if (phone === "") {
            context.openAlertBox("error", "Please Enter 10 digits Mobile Number")
            return false;
        }

        postData(`/api/address/add`, formFields, { withCredentials: true }).then((res) => {
            console.log(res)
            if (res?.success !== false) {
                setIsLoading(false);
                context.openAlertBox("success", res?.data?.message);
                context?.setIsOpenFullScreenPanel({
                    open: false
                })
                fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                    context?.setAddress(res.data);
                })

            } else {
                context.openAlertBox("error", res?.data?.message);
                setIsLoading(false);
            }
        })
    }
    return (

        <section className="p-5 bg-gray-50">
            <form className="form py-3 p-8" onSubmit={handleSubmit}>
                <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
                    <div className="grid grid-cols-2 mb-3 gap-4">
                        <div className="col w-[100%]">
                            <h3 className="text-[16px] font-[500] mb-1 text-black">Address Line 1</h3>
                            <input
                                onChange={onChangeInput}
                                name='address_line1'
                                value={formFields.address_line1}
                                type="text"
                                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                            />
                        </div>
                        <div className="col w-[100%]">
                            <h3 className="text-[16px] font-[500] mb-1 text-black">City</h3>
                            <input
                                onChange={onChangeInput}
                                value={formFields.city}
                                name='city'
                                type="text"
                                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 mb-3 gap-4">
                        <div className="col w-[100%]">
                            <h3 className="text-[16px] font-[500] mb-1 text-black">State</h3>
                            <input
                                onChange={onChangeInput}
                                name='state'
                                value={formFields.state}

                                type="text"
                                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                            />
                        </div>
                        <div className="col w-[100%]">
                            <h3 className="text-[16px] font-[500] mb-1 text-black">Pincode</h3>
                            <input
                                onChange={onChangeInput}
                                value={formFields.pincode}

                                name='pincode'
                                type="text"
                                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                            />
                        </div>
                        <div className="col w-[100%]">
                            <h3 className="text-[16px] font-[500] mb-1 text-black">Country</h3>
                            <input
                                onChange={onChangeInput}
                                name='country'
                                value={formFields.country}
                                type="text"
                                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                            />
                        </div>
                        <div className="col w-[100%]">
                            <h3 className="text-[16px] font-[500] mb-1 text-black">Mobile Number</h3>
                            <PhoneInput
                                name="mobile"
                                defaultCountry="in"
                                value={phone}
                                disabled={isLoading}
                                onChange={(phone) => {
                                    setPhone(phone);
                                    setFormFields((prevState) => ({
                                        ...prevState,
                                        mobile: phone
                                    }))
                                }}
                            />
                        </div>
                        <div className="col w-[100%]">
                            <h3 className="text-[16px] font-[500] mb-1 text-black">Status</h3>
                            <Select
                                className='w-full'
                                id="status"
                                value={status}
                                label="Status"
                                size='small'
                                displayEmpty
                                onChange={handleChangeStatus}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <br />
                    <br />
                </div>

                <br />
                <br />
                <div className="w-[250px]">
                    <Button type="submit" className="btn-blue btn-lg w-full flex gap-4">
                        <FaCloudUploadAlt className="text-[25px] text-white" />
                        Publish and View
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default AddAddress;