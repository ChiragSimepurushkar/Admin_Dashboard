import React, { useContext } from 'react';
import DashboardBoxes from '../../Components/DashboardBoxes';
import Button from '@mui/material/Button';
import { FaPlus } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import Badge from '../../Components/Badge';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { MdModeEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import Progress from '../../Components/Progess';
import TooltipMUI from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { MyContext } from '../../App';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const columns = [
    { id: 'product', label: 'PRODUCT', minWidth: 150 },
    { id: 'category', label: 'CATEGORY', minWidth: 100 },
    {
        id: 'subcategory',
        label: 'SUB CATEGORY',
        minWidth: 150,
    },
    {
        id: 'price',
        label: 'PRICE',
        minWidth: 130,
    },
    {
        id: 'sales',
        label: 'SALES',
        minWidth: 100,
    },
    {
        id: 'action',
        label: 'ACTION',
        minWidth: 120,
    },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}


const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Dashboard = () => {
    const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
    const [chart1Data, setChart1Data] = useState([
        {
            name: 'JAN',
            TotalUsers: 4000,
            TotalSales: 2400,
            amt: 2400,
        },
        {
            name: 'FEB',
            TotalUsers: 3000,
            TotalSales: 1398,
            amt: 2210,
        },
        {
            name: 'MAR',
            TotalUsers: 2000,
            TotalSales: 9800,
            amt: 2290,
        },
        {
            name: 'APR',
            TotalUsers: 2780,
            TotalSales: 3908,
            amt: 2000,
        },
        {
            name: 'MAY',
            TotalUsers: 1890,
            TotalSales: 4800,
            amt: 2181,
        },
        {
            name: 'JUNE',
            TotalUsers: 2390,
            TotalSales: 3800,
            amt: 2500,
        },
        {
            name: 'JULY',
            TotalUsers: 3490,
            TotalSales: 5900,
            amt: 2100,
        },
        {
            name: 'AUG',
            TotalUsers: 3490,
            TotalSales: 2300,
            amt: 2100,
        },
        {
            name: 'SEP',
            TotalUsers: 3460,
            TotalSales: 500,
            amt: 2100,
        },
        {
            name: 'OCT',
            TotalUsers: 3490,
            TotalSales: 4500,
            amt: 2100,
        },
        {
            name: 'NOV',
            TotalUsers: 2490,
            TotalSales: 4500,
            amt: 2100,
        },
        {
            name: 'DEC',
            TotalUsers: 5490,
            TotalSales: 4300,
            amt: 2100,
        },
    ])
    const isShowOrderProduct = (index) => {
        if (isOpenOrderProduct === index) {
            setIsOpenOrderProduct(null);
        } else {
            setIsOpenOrderProduct(index);
        }
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [categoryFilterVal, setCategoryFilterVal] = React.useState('');
    const context = useContext(MyContext);
    const handleChangeCatFilter = (event) => {
        setCategoryFilterVal(event.target.value);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <div className="w-full bg-white !py-3 !px-8 border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
                <div className="info">
                    <h1 className="text-[35px] font-bold leading-10 !mb-3">Good Morning,<br />
                        Cameron</h1>
                    <p>Here's what's happening on your store today. See the statistics at once.</p>
                    <br></br>
                    <Button onClick={() => context.setIsOpenFullScreenPanel({
                        open: true,
                        model: 'Add Product'
                    })}
                        className="btn-blue !capitalize flex gap-2">
                        <FaPlus /> Add Product
                    </Button>
                </div>
                <img src="https://ecommerce-admin-view.netlify.app/shop-illustration.webp" className="w-[250px]" />
            </div>
            <DashboardBoxes />
            <div className="card my-3 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center justify-between px-5 py-5">
                    <h2 className='text-[19px] font-[600]'>Recent Orders</h2>
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

            <div className="card my-3 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center justify-between px-5 py-5">
                    <h2 className='text-[19px] font-[600]'>Products
                        <span className='font-[400] text-[14px]'>(Tailwind css Table)</span>
                    </h2>
                </div>
                <div className="flex items-center w-full pl-5 justify-between pr-5">
                    <div className="col w-[20%]">
                        <h4 className='font-[600] text-[13px] mb-2'>Category By</h4>
                        <Select
                            className='w-full'
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryFilterVal}
                            label="category"
                            onChange={handleChangeCatFilter}
                        >
                            <MenuItem value={10}>Men</MenuItem>
                            <MenuItem value={20}>Women</MenuItem>
                            <MenuItem value={30}>kids</MenuItem>
                        </Select>
                    </div>
                    <div className="col w-[25%] ml-auto flex items-center gap-3">
                        <Button className="btn !bg-green-600 !text-white btn-sm">Export</Button>
                        <Button className="btn-blue btn-sm"onClick={()=>context.setIsOpenFullScreenPanel({
                                            open:true,
                                            model:'Add Product'
                                        })}>Add Products</Button>
                    </div>
                </div>
                <div className="relative overflow-x-auto mt-5 pb-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                        <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 pr-0 py-3 " width="10%">
                                    <div className="w-[60px]">
                                        <Checkbox {...label} size="small" />
                                    </div>
                                </th>
                                <th scope="col" className="px-0 py-3 whitespace-nowrap">
                                    PRODUCT
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    CATEGORY
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    SUB CATEGORY
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    PRICE
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    SALES
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                <td className="px-6 pr-0 py-2 " >
                                    <div className="w-[60px]">
                                        <Checkbox {...label} size="small" />
                                    </div>
                                </td>
                                <td className="px-0 py-2">
                                    <div className="flex items-center gap-4 w-[300px]">
                                        <div className=" group img w-[65px] h-[65px] rounded-md overflow-hidden">
                                            <Link to="/product/35545">
                                                <img
                                                    src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                                                    className="w-full group-hover:scale-105 transition-all"
                                                />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                                                <Link to="/product/45745">
                                                    VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women
                                                </Link>
                                            </h3>
                                            <span className="text-[12px]">Books</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-2">Electronics</td>
                                <td className="px-6 py-2">Women</td>
                                <td className="px-6 py-2"><div className="flex gap-1 flex-col">
                                    <span className="oldPrice leading-3 line-through text-gray-500 text-[14px] font-[500]">
                                        $58.00
                                    </span>
                                    <span className="price text-[#3872fa] text-[14px] font-[600]">
                                        $58.00
                                    </span>
                                </div>
                                </td>
                                <td className="px-6 py-2">
                                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span> sale</p>
                                    <Progress value={40} type="warning" />
                                </td>
                                <td className="px-6 py-2">
                                    <div className="flex items-center gap-1">
                                        <TooltipMUI title="Edit Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <MdModeEdit className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View Product Details" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaEye className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaTrashAlt className="text-[rgba(0,0,0,1)] text-[17px]" />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </td>
                            </tr>
                            <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                <td className="px-6 pr-0 py-2 " >
                                    <div className="w-[60px]">
                                        <Checkbox {...label} size="small" />
                                    </div>
                                </td>
                                <td className="px-0 py-2">
                                    <div className="flex items-center gap-4 w-[300px]">
                                        <div className=" group img w-[65px] h-[65px] rounded-md overflow-hidden">
                                            <Link to="/product/35545">
                                                <img
                                                    src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                                                    className="w-full group-hover:scale-105 transition-all"
                                                />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                                                <Link to="/product/45745">
                                                    VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women
                                                </Link>
                                            </h3>
                                            <span className="text-[12px]">Books</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-2">Electronics</td>
                                <td className="px-6 py-2">Women</td>
                                <td className="px-6 py-2">
                                    <div className="flex gap-1 flex-col">
                                        <span className="oldPrice leading-3 line-through text-gray-500 text-[14px] font-[500]">
                                            $58.00
                                        </span>
                                        <span className="price text-[#3872fa] text-[14px] font-[600]">
                                            $58.00
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-2">
                                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span> sale</p>
                                    <Progress value={40} type="warning" />
                                </td>
                                <td className="px-6 py-2">
                                    <div className="flex items-center gap-1">
                                        <TooltipMUI title="Edit Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <MdModeEdit className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View Product Details" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaEye className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaTrashAlt className="text-[rgba(0,0,0,1)] text-[17px]" />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </td>
                            </tr>
                            <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                <td className="px-6 pr-0 py-2 " >
                                    <div className="w-[60px]">
                                        <Checkbox {...label} size="small" />
                                    </div>
                                </td>
                                <td className="px-0 py-2">
                                    <div className="flex items-center gap-4 w-[300px]">
                                        <div className=" group img w-[65px] h-[65px] rounded-md overflow-hidden">
                                            <Link to="/product/35545">
                                                <img
                                                    src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                                                    className="w-full group-hover:scale-105 transition-all"
                                                />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                                                <Link to="/product/45745">
                                                    VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women
                                                </Link>
                                            </h3>
                                            <span className="text-[12px]">Books</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-2">Electronics</td>
                                <td className="px-6 py-2">Women</td>
                                <td className="px-6 py-2"><div className="flex gap-1 flex-col">
                                    <span className="oldPrice leading-3 line-through text-gray-500 text-[14px] font-[500]">
                                        $58.00
                                    </span>
                                    <span className="price text-[#3872fa] text-[14px] font-[600]">
                                        $58.00
                                    </span>
                                </div>
                                </td>
                                <td className="px-6 py-2">
                                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span> sale</p>
                                    <Progress value={40} type="warning" />
                                </td>
                                <td className="px-6 py-2">
                                    <div className="flex items-center gap-1">
                                        <TooltipMUI title="Edit Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <MdModeEdit className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View Product Details" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaEye className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaTrashAlt className="text-[rgba(0,0,0,1)] text-[17px]" />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </td>
                            </tr>
                            <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                <td className="px-6 pr-0 py-2 " >
                                    <div className="w-[60px]">
                                        <Checkbox {...label} size="small" />
                                    </div>
                                </td>
                                <td className="px-0 py-2">
                                    <div className="flex items-center gap-4 w-[300px]">
                                        <div className=" group img w-[65px] h-[65px] rounded-md overflow-hidden">
                                            <Link to="/product/35545">
                                                <img
                                                    src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                                                    className="w-full group-hover:scale-105 transition-all"
                                                />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                                                <Link to="/product/45745">
                                                    VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women
                                                </Link>
                                            </h3>
                                            <span className="text-[12px]">Books</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-2">Electronics</td>
                                <td className="px-6 py-2">Women</td>
                                <td className="px-6 py-2"><div className="flex gap-1 flex-col">
                                    <span className="oldPrice leading-3 line-through text-gray-500 text-[14px] font-[500]">
                                        $58.00
                                    </span>
                                    <span className="price text-[#3872fa] text-[14px] font-[600]">
                                        $58.00
                                    </span>
                                </div>
                                </td>
                                <td className="px-6 py-2">
                                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span> sale</p>
                                    <Progress value={40} type="warning" />
                                </td>
                                <td className="px-6 py-2">
                                    <div className="flex items-center gap-1">
                                        <TooltipMUI title="Edit Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <MdModeEdit className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View Product Details" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaEye className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaTrashAlt className="text-[rgba(0,0,0,1)] text-[17px]" />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </td>
                            </tr>
                            <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                <td className="px-6 pr-0 py-2 " >
                                    <div className="w-[60px]">
                                        <Checkbox {...label} size="small" />
                                    </div>
                                </td>
                                <td className="px-0 py-2">
                                    <div className="flex items-center gap-4 w-[300px]">
                                        <div className=" group img w-[65px] h-[65px] rounded-md overflow-hidden">
                                            <Link to="/product/35545">
                                                <img
                                                    src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                                                    className="w-full group-hover:scale-105 transition-all"
                                                />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                                                <Link to="/product/45745">
                                                    VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women
                                                </Link>
                                            </h3>
                                            <span className="text-[12px]">Books</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-2">Electronics</td>
                                <td className="px-6 py-2">Women</td>
                                <td className="px-6 py-2"><div className="flex gap-1 flex-col">
                                    <span className="oldPrice leading-3 line-through text-gray-500 text-[14px] font-[500]">
                                        $58.00
                                    </span>
                                    <span className="price text-[#3872fa] text-[14px] font-[600]">
                                        $58.00
                                    </span>
                                </div>
                                </td>
                                <td className="px-6 py-2">
                                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span> sale</p>
                                    <Progress value={40} type="warning" />
                                </td>
                                <td className="px-6 py-2">
                                    <div className="flex items-center gap-1">
                                        <TooltipMUI title="Edit Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <MdModeEdit className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View Product Details" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaEye className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaTrashAlt className="text-[rgba(0,0,0,1)] text-[17px]" />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-end pt-5 pb-5 px-4">
                    <Pagination count={10} color="primary" />
                </div>
            </div>

            <div className="card my-3 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center justify-between px-5 py-5">
                    <h2 className='text-[19px] font-[600]'>Products
                        <span className='font-[400] text-[14px]'>(Material UI Table)</span></h2>
                </div>
                <div className="flex items-center w-full pl-5 justify-between pr-5">
                    <div className="col w-[20%]">
                        <h4 className='font-[600] text-[13px] mb-2'>Category By</h4>
                        <Select
                            className='w-full'
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryFilterVal}
                            label="category"
                            onChange={handleChangeCatFilter}
                        >
                            <MenuItem value={10}>Men</MenuItem>
                            <MenuItem value={20}>Women</MenuItem>
                            <MenuItem value={30}>kids</MenuItem>
                        </Select>
                    </div>
                    <div className="col w-[25%] ml-auto flex items-center gap-3">
                        <Button className="btn !bg-green-600 !text-white btn-sm">Export</Button>
                        <Button className="btn-blue btn-sm"onClick={()=>context.setIsOpenFullScreenPanel({
                                            open:true,
                                            model:'Add Product'
                                        })}>Add Products</Button>
                    </div>
                </div>
                <br></br>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow>
                                <TableCell>
                                    <Checkbox {...label} size="small" />
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size="small" />
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-4 w-[300px]">
                                        <div className=" group img w-[65px] h-[65px] rounded-md overflow-hidden">
                                            <Link to="/product/35545">
                                                <img
                                                    src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                                                    className="w-full group-hover:scale-105 transition-all"
                                                />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                                                <Link to="/product/45745">
                                                    VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women
                                                </Link>
                                            </h3>
                                            <span className="text-[12px]">Books</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Electronics
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Womens
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex gap-1 flex-col">
                                        <span className="oldPrice leading-3 line-through text-gray-500 text-[14px] font-[500]">
                                            $58.00
                                        </span>
                                        <span className="price text-[#3872fa] text-[14px] font-[600]">
                                            $58.00
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span> sale</p>
                                    <Progress value={40} type="success" />
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-1">
                                        <TooltipMUI title="Edit Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <MdModeEdit className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View Product Details" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaEye className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaTrashAlt className="text-[rgba(0,0,0,1)] text-[17px]" />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size="small" />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-4 w-[300px]">
                                        <div className=" group img w-[65px] h-[65px] rounded-md overflow-hidden">
                                            <Link to="/product/35545">
                                                <img
                                                    src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                                                    className="w-full group-hover:scale-105 transition-all"
                                                />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                                                <Link to="/product/45745">
                                                    VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women
                                                </Link>
                                            </h3>
                                            <span className="text-[12px]">Books</span>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Electronics
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Womens
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex gap-1 flex-col">
                                        <span className="oldPrice leading-3 line-through text-gray-500 text-[14px] font-[500]">
                                            $58.00
                                        </span>
                                        <span className="price text-[#3872fa] text-[14px] font-[600]">
                                            $58.00
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span> sale</p>
                                    <Progress value={40} type="success" />
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-1">
                                        <TooltipMUI title="Edit Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <MdModeEdit className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View Product Details" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaEye className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaTrashAlt className="text-[rgba(0,0,0,1)] text-[17px]" />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size="small" />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-4 w-[300px]">
                                        <div className=" group img w-[65px] h-[65px] rounded-md overflow-hidden">
                                            <Link to="/product/35545">
                                                <img
                                                    src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                                                    className="w-full group-hover:scale-105 transition-all"
                                                />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                                                <Link to="/product/45745">
                                                    VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women
                                                </Link>
                                            </h3>
                                            <span className="text-[12px]">Books</span>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Electronics
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Womens
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex gap-1 flex-col">
                                        <span className="oldPrice leading-3 line-through text-gray-500 text-[14px] font-[500]">
                                            $58.00
                                        </span>
                                        <span className="price text-[#3872fa] text-[14px] font-[600]">
                                            $58.00
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span> sale</p>
                                    <Progress value={40} type="success" />
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-1">
                                        <TooltipMUI title="Edit Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <MdModeEdit className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View Product Details" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaEye className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaTrashAlt className="text-[rgba(0,0,0,1)] text-[17px]" />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size="small" />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-4 w-[300px]">
                                        <div className=" group img w-[65px] h-[65px] rounded-md overflow-hidden">
                                            <Link to="/product/35545">
                                                <img
                                                    src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                                                    className="w-full group-hover:scale-105 transition-all"
                                                />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                                                <Link to="/product/45745">
                                                    VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women
                                                </Link>
                                            </h3>
                                            <span className="text-[12px]">Books</span>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Electronics
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Womens
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex gap-1 flex-col">
                                        <span className="oldPrice leading-3 line-through text-gray-500 text-[14px] font-[500]">
                                            $58.00
                                        </span>
                                        <span className="price text-[#3872fa] text-[14px] font-[600]">
                                            $58.00
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span> sale</p>
                                    <Progress value={40} type="success" />
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-1">
                                        <TooltipMUI title="Edit Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <MdModeEdit className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View Product Details" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaEye className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaTrashAlt className="text-[rgba(0,0,0,1)] text-[17px]" />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size="small" />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-4 w-[300px]">
                                        <div className=" group img w-[65px] h-[65px] rounded-md overflow-hidden">
                                            <Link to="/product/35545">
                                                <img
                                                    src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                                                    className="w-full group-hover:scale-105 transition-all"
                                                />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                                                <Link to="/product/45745">
                                                    VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women
                                                </Link>
                                            </h3>
                                            <span className="text-[12px]">Books</span>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Electronics
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Womens
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex gap-1 flex-col">
                                        <span className="oldPrice leading-3 line-through text-gray-500 text-[14px] font-[500]">
                                            $58.00
                                        </span>
                                        <span className="price text-[#3872fa] text-[14px] font-[600]">
                                            $58.00
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span> sale</p>
                                    <Progress value={40} type="success" />
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-1">
                                        <TooltipMUI title="Edit Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <MdModeEdit className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="View Product Details" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaEye className="text-[rgba(0,0,0,1)] text-[20px]" />
                                            </Button>
                                        </TooltipMUI>
                                        <TooltipMUI title="Remove Product" placement="top">
                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                <FaTrashAlt className="text-[rgba(0,0,0,1)] text-[17px]" />
                                            </Button>
                                        </TooltipMUI>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>

            <div className="card my-3 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center justify-between px-5 py-5 pb-0">
                    <h2 className='text-[19px] font-[600]'>Total Users & Total Sales</h2>
                </div>
                <div className="flex items-center gap-5 px-5 py-5 pt-1">
                    <span className="flex items-center gap-1 text-[15px]">
                        <span className="block w-[8px] h-[8px] rounded-full bg-green-600"></span>
                        Total Users
                    </span>
                    <span className="flex items-center gap-1 text-[15px]">
                        <span className="block w-[8px] h-[8px] rounded-full bg-[#8884d8]"></span>
                        Total Sales
                    </span>
                </div>
                <LineChart
                    width={1000}
                    height={500}
                    data={chart1Data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="none" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="TotalSales" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="TotalUsers" stroke="#82ca9d" strokeWidth={3} />
                </LineChart>
            </div>
        </>
    );
}

export default Dashboard;