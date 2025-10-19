import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import Badge from '../../Components/Badge';
import SearchBox from '../../Components/SearchBox';
export const Orders = () => {
    const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
    const isShowOrderProduct = (index) => {
        if (isOpenOrderProduct === index) {
            setIsOpenOrderProduct(null);
        } else {
            setIsOpenOrderProduct(index);
        }
    }

    return (
        <div className="card my-3 shadow-md sm:rounded-lg bg-white">
            <div className="flex items-center justify-between px-5 py-5">
                <h2 className='text-[19px] font-[600]'>Recent Orders</h2>
                <div className="w-[40%]">
                    <SearchBox/>
                </div>
            </div>
            <div className="relative overflow-x-auto mt-5 pb-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                    <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                &nbsp;
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Order ID
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Payment ID
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Products
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Phone Number
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Pincode
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Total Amount
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                User ID
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Order Status
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-gray-200">
                            <td className="px-6 py-4 font-[500]" >
                                <Button onClick={() => isShowOrderProduct(0)}
                                    className='!w-[35px] !bg-[#f1f1f1] !rounded-full !min-w-[35px] !h-[35px]'>
                                    {
                                        isOpenOrderProduct === 0 ? <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                            : <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                    }

                                </Button>
                            </td>
                            <td className="px-6 py-4 font-[500]" >
                                <span className='text-[#3872fa] font-[600]'>64646646</span>
                            </td>
                            <td className="px-6 py-4 font-[500]" >
                                <span className='text-[#3872fa] font-[600]'>64646646</span>
                            </td>
                            <td className="px-6 py-4 font-[500]" >
                                dhhdgdg
                            </td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap" >
                                dhhdgdg
                            </td>
                            <td className="px-6 py-4 font-[500]" >
                                <span className='block w-[400px]'>House wgsggdss sggsgs sgsgsg sgggsg sgsg</span>
                            </td>
                            <td className="px-6 py-4 font-[500]" >
                                dhhdgdg
                            </td>
                            <td className="px-6 py-4 font-[500]" >
                                dhhdgdg
                            </td>
                            <td className="px-6 py-4 font-[500]" >
                                dhhdgdg
                            </td>
                            <td className="px-6 py-4 font-[500]" >
                                dhhdgdg
                            </td>
                            <td className="px-6 py-4 font-[500]" >
                                <span className='text-[#3872fa] font-[600]'>dhdhdhdh</span>
                            </td>
                            <td className="px-6 py-4 font-[500]" >
                                <Badge status="confirm" />
                            </td>
                            <td className="px-6 py-4 font-[500]" >
                                dhhdgdg
                            </td>
                        </tr>
                        {
                            isOpenOrderProduct === 0 &&
                            (<tr>
                                <td className="pl-20" colSpan="6">
                                    <div className="relative overflow-x-auto">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                            <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                        Product ID
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                        Product Title
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                        Image
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                        Quantity
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                        Price
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                        Sub Total
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="bg-white border-b border-gray-200">
                                                    <td className="px-6 py-4 font-[500]" >
                                                        <span className='text-green-700'>64646646</span>
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]" >
                                                        <span className='text-[#3872fa] font-[600]'>64646646</span>
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]" >
                                                        <img src="https://tse3.mm.bing.net/th/id/OIP.PTZAREFwU9IbPy6MkUo_MAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
                                                            className='w-[40px] h-[40px] object-cover rounded-md' />
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]" >
                                                        dhhdgdg
                                                    </td>
                                                    <td className="px-6 py-4 font-[500] whitespace-nowrap" >
                                                        dhhdgdg
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]" >
                                                        <span className='block w-[400px]'>House wgsggdss sggsgs sgsgsg sgggsg sgsg</span>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b border-gray-200">
                                                    <td className="px-6 py-4 font-[500]" >
                                                        <span className='text-green-700'>64646646</span>
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]" >
                                                        <span className='text-[#3872fa] font-[600]'>64646646</span>
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]" >
                                                        <img src="https://tse3.mm.bing.net/th/id/OIP.PTZAREFwU9IbPy6MkUo_MAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
                                                            className='w-[40px] h-[40px] object-cover rounded-md' />
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]" >
                                                        dhhdgdg
                                                    </td>
                                                    <td className="px-6 py-4 font-[500] whitespace-nowrap" >
                                                        dhhdgdg
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]" >
                                                        <span className='block w-[400px]'>House wgsggdss sggsgs sgsgsg sgggsg sgsg</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-[#f1f1f1]" colSpan="12">
                                                    </td>                                              </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Orders;