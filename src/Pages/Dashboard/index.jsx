import React, { useContext, useEffect } from 'react';
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
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import { deleteMultipleData, fetchDataFromApi } from '../../utils/api';
import SearchBox from '../../Components/SearchBox';
import CircularProgress from '@mui/material/CircularProgress';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Rating from '@mui/material/Rating';


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
        id: 'ratings',
        label: 'RATINGS',
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

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [categoryFilterVal, setCategoryFilterVal] = useState('');
    const context = useContext(MyContext);
    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [productThirdLavelCat, setProductThirdLavelCat] = useState('');
    const [productData, setProductData] = useState([]);
    const [sortedIds, setSortedIds] = useState([]);
    const [orders, setOrders] = useState([]);
    // const [ordersData, setOrdersData] = useState([]);
    const [totalOrdersData, setTotalOrdersData] = useState([]);
    const [ordersCount, setOrdersCount] = useState(0);
    const [pageOrder, setPageOrder] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const [ordersData, setOrdersData] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        totalPages: 0
    });

    const [users, setUsers] = useState([]);
    const [allReviews, setAllReviews] = useState([]);

    const [graphType, setGraphType] = useState('bar'); // Options: 'bar' or 'line'
    const [chartData, setChartData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());

    const [totalPosts, setTotalPosts] = useState(0);

    const [pageOrder2, setPageOrder2] = useState(1);
    const [searchQuery2, setSearchQuery2] = useState('');

    useEffect(() => {
        getProducts()
    }, [context?.isOpenFullScreenPanel]);

    useEffect(() => {
        fetchDataFromApi(`/api/order/order-list?page=${pageOrder}&limit=2`)
            .then((res) => {
                if (!res?.error) {
                    setOrdersData(res.data);
                    setPagination({
                        total: res.total,
                        page: res.page,
                        totalPages: res.totalPages
                    });
                }
            });
    }, [pageOrder]);


    useEffect(() => {
        // console.log(totalOrdersData)
        // fetchDataFromApi("/api/order/order-list").then((res) => {
        // fetchDataFromApi(`/api/order/order-list?page=${pageOrder}&limit=2`).then((res) => {
        //     if (res?.error === false) {
        //         setOrdersData(res?.data)
        //         // setOrders(res);
        //     }
        // }).catch((error) => {
        //     console.error("Error fetching orders:", error);
        // });
        fetchDataFromApi(`/api/order/order-list`).then((res) => {
            if (res?.error === false) {
                setTotalOrdersData(res)
            }
        })

        fetchDataFromApi(`/api/order/count`).then((res) => {
            if (res?.error === false) {
                setOrdersCount(res?.count)
            }
        })
    }, [pageOrder]);

    useEffect(() => {

        // Filter orders based on search query
        if (searchQuery !== "") {
            const filteredOrders = totalOrdersData?.data?.filter((order) =>
                order._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order?.userId?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order?.userId?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order?.createdAt.includes(searchQuery)
            );
            setOrdersData(filteredOrders)
        } else {
            fetchDataFromApi(`/api/order/order-list?page=${pageOrder}&limit=3`).then((res) => {
                if (res?.error === false) {
                    setOrders(res)
                    setOrdersData(res?.data)
                }
            })
        }

        if (searchQuery2 !== "") {
            // Filter productData based on product-specific attributes
            const filteredProducts = productData.filter((product) =>
                product?.name?.toLowerCase().includes(searchQuery2.toLowerCase()) ||
                product?.brand?.toLowerCase().includes(searchQuery2.toLowerCase()) ||
                product?.catName?.toLowerCase().includes(searchQuery2.toLowerCase()) ||
                product?.subCat?.toLowerCase().includes(searchQuery2.toLowerCase())
            );
            setProductData(filteredProducts);
        } else {
            // If search is cleared, fetch the original data again
            getProducts();
        }
    }, [searchQuery, searchQuery2])

    useEffect(() => {
        getProducts();
    }, [page, rowsPerPage, context?.isOpenFullScreenPanel]);

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

    const getProducts = async () => {
        setIsLoading(true)
        fetchDataFromApi("/api/product/getAllProducts").then((res) => {
            let productArr = [];
            if (res?.error === false) {
                for (let i = 0; i < res?.products?.length; i++) {
                    productArr[i] = res?.products[i];
                    productArr[i].checked = false;
                    // console.log(res?.products[i])
                }
                setTimeout(() => {
                    setProductData(productArr);
                    setIsLoading(false)
                }, 500)
            }
        })
    }

    useEffect(() => {
        getTotalSalesByYear();

        fetchDataFromApi("/api/user/getAllUsers").then((res) => {
            if (res?.error === false) {
                setUsers(res?.users)
            }
        })

        fetchDataFromApi("/api/user/getAllReviews").then((res) => {
            if (res?.error === false) {
                setAllReviews(res?.reviews)
            }
        })
    }, [])


    const handleChangeCatFilter = (event) => {
        setCategoryFilterVal(event.target.value);
    };
    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // const handleChangeProductCat = (event) => {
    //     setProductCat(event.target.value);
    //     setProductSubCat('');
    //     setProductThirdLavelCat('');
    //     setIsLoading(true)
    //     fetchDataFromApi(`/api/product/getAllProductsByCatId/${event.target.value}`).then((res) => {
    //         if (res?.error === false) {
    //             setProductData(res?.products)
    //             setTimeout(() => {
    //                 setIsLoading(false)
    //             }, 300)
    //         }
    //     })
    // };
    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;

        // Update all items' checked status
        const updatedItems = productData.map((item) => ({
            ...item,
            checked: isChecked,
        }));

        setProductData(updatedItems);
        // console.log(updatedItems)
        // Update the sorted IDs state
        if (isChecked) {
            const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
            console.log(ids)
            setSortedIds(ids);
        } else {
            setSortedIds([]);
        }
    }
    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        setProductSubCat('');
        setProductThirdLavelCat('');
        setIsLoading(true)
        fetchDataFromApi(`/api/product/getAllProductsByCatId/${event.target.value}`).then((res) => {
            if (res?.error === false) {
                setProductData(res?.products)
                setTimeout(() => {
                    setIsLoading(false)
                }, 300)
            }
        })
    };
    const handleChangeProductSubCat = (event) => {
        setProductSubCat(event.target.value);
        setProductCat('');
        setProductThirdLavelCat('');
        setIsLoading(true)
        fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${event.target.value}`).then((res) => {
            if (res?.error === false) {
                setProductData(res?.products)
                setTimeout(() => {
                    setIsLoading(false)
                }, 300)
            }
        })
    };
    const handleChangeProductThirdLavelCat = (event) => {
        setProductThirdLavelCat(event.target.value);
        setProductCat('');
        setProductSubCat('');
        setIsLoading(true)
        fetchDataFromApi(`/api/product/getAllProductsByThirdLevelCatId/${event.target.value}`).then((res) => {
            if (res?.error === false) {
                setProductData(res?.products)
                setTimeout(() => {
                    setIsLoading(false)
                }, 300)
            }
        })
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const deleteProduct = (id) => {
        deleteData(`/api/product/${id}`).then((res) => {
            if (res?.error === false) {
                getProducts();
                context.openAlertBox("success", res?.message);
            } else {
                context.openAlertBox("error", res?.message);
            }
        });
    };

    // Handler to toggle individual checkboxes
    const handleCheckboxChange = (e, id, index) => {

        const updatedItems = productData.map((item) =>
            item._id === id ? { ...item, checked: e.target.checked } : item
        );
        setProductData(updatedItems);

        // Update the sorted IDs state
        const selectedIds = updatedItems
            .filter((item) => item.checked)
            .map((item) => item._id)
            .sort((a, b) => a - b);
        setSortedIds(selectedIds);
    };

    const deleteMultipleProduct = async () => {
        if (sortedIds.length === 0) {
            context.openAlertBox('error', 'Please select items to delete.');
            return;
        }

        try {
            const res = await deleteMultipleData('/api/product/deleteMultipleProduct', {
                data: { ids: sortedIds }
            });

            if (res?.success === true) {
                getProducts();
                setSortedIds([]);
                context.openAlertBox("success", res?.message || "Products deleted successfully");
            } else {
                context.openAlertBox("error", res?.message || "Failed to delete products");
            }
        } catch (error) {
            console.error("Delete error:", error);
            context.openAlertBox('error', 'Error deleting items.');
        }
    }



    const getTotalSalesByYear = () => {
        fetchDataFromApi(`/api/order/sales`).then((res) => {
            const sales = [];
            res?.monthlySales?.length !== 0 &&
                res?.monthlySales?.map((item) => {
                    sales.push({
                        name: item?.name,
                        TotalSales: parseInt(item?.TotalSales),
                    });
                });

            // Filter to ensure unique month entries
            const uniqueArr = sales.filter((obj, index, self) =>
                index === self.findIndex((t) => t.name === obj.name)
            );
            setChartData(uniqueArr);
        });
    };

    const getTotalUsersByYear = () => {
        fetchDataFromApi(`/api/order/users`).then((res) => {
            const users = [];
            res?.TotalUsers?.length !== 0 &&
                res?.TotalUsers?.map((item) => {
                    users.push({
                        name: item?.name,
                        TotalUsers: parseInt(item?.TotalUsers),
                    });
                });

            const uniqueArr = users.filter((obj, index, self) =>
                index === self.findIndex((t) => t.name === obj.name)
            );
            setChartData(uniqueArr);
        });
    };

    return (
        <>
            <div className="w-full bg-white !py-6 !px-5 border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
                <div className="info">
                    <h1 className="text-[22px] sm:text-[35px] font-bold leading-10 !mb-3">Welcome,<br />
                        <span className='text-[#3872fa]'>{context?.userData?.name}</span></h1>
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
                <img src="https://ecommerce-admin-view.netlify.app/shop-illustration.webp" className="w-[250px] hidden lg:block" />
            </div>
            {
                productData?.length !== 0 && users?.length !== 0 && allReviews?.length !== 0
                && <DashboardBoxes orders={ordersCount} products={productData?.length}
                    users={users?.length} reviews={allReviews?.length}
                    category={context?.catData?.length} />
            }
            <div className="card my-2 md:mt-4 shadow-md sm:rounded-lg bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 px-5 py-5 flex-col sm:flex-row">
                    <h2 className="text-[18px] font-[600] text-left mb-2 lg:mb-0">Recent Orders</h2>
                    <div className="ml-auto w-full">
                        <SearchBox
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            setPageOrder={setPageOrder}
                        />
                    </div>
                </div>
                <div className="relative overflow-x-auto mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                        <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">&nbsp;</th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Order ID</th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Payment ID</th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Name</th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Phone Number</th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Address</th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Pincode</th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Total Amount</th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Email</th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Order Status</th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersData?.length !== 0 && ordersData?.map((order, index) => (
                                <React.Fragment key={order._id}>
                                    <tr className="bg-white border-b border-gray-200">
                                        <td className="px-6 py-4 font-[500]">
                                            <Button
                                                onClick={() => isShowOrderProduct(index)}
                                                className='!w-[35px] !bg-[#f1f1f1] !rounded-full !min-w-[35px] !h-[35px]'>
                                                {isOpenOrderProduct === index ?
                                                    <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' /> :
                                                    <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                                }
                                            </Button>
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                            <span className='text-[#ff5252]'>{order?._id}</span>
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                            <span className='text-[#ff5252]'>
                                                {order?.paymentId || "CASH ON DELIVERY"}
                                            </span>
                                        </td>
                                        <td className=" py-4 font-[500]">
                                            {order?.userId?.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                            +{order?.userId?.mobile || 'N/A'}
                                        </td>
                                        <td className="px-2 py-4 font-[500] max-w-[180px] whitespace-normal leading-tight">
                                            {order?.delivery_address ? (
                                                <div className="text-sm">
                                                    {order.delivery_address.address_line1}, {order.delivery_address.landmark && `${order.delivery_address.landmark}, `}
                                                    {order.delivery_address.city}, {order.delivery_address.state}
                                                </div>
                                            ) : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 font-[500] ">
                                            {order?.delivery_address?.pincode || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                            ₹{order?.totalAmt?.toFixed(2) || '0.00'}
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                            {order?.userId?.email || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                            <Badge status={order?.order_status} />
                                        </td>
                                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                            {order?.createdAt?.split('T')[0]}
                                        </td>
                                    </tr>

                                    {isOpenOrderProduct === index && (
                                        <tr>
                                            <td colSpan="11" className="pl-20">
                                                <div className="relative overflow-x-auto">
                                                    <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                                        <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                                                            <tr>
                                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Product ID</th>
                                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Product Title</th>
                                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Image</th>
                                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Quantity</th>
                                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Price</th>
                                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">Sub Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {order?.products?.map((product, i) => (
                                                                <tr key={i} className="bg-white border-b border-gray-200">
                                                                    <td className="px-6 py-4">
                                                                        <span className='text-green-700'>{product.productId}</span>
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        <span className='text-[#ff5252]'>{product.productTitle}</span>
                                                                    </td>
                                                                    <td className="px-6 py-4 font-[500]">
                                                                        <img
                                                                            src={product.image}
                                                                            alt={product.productTitle}
                                                                            className="w-[40px] h-[40px] object-cover rounded-md"
                                                                        />
                                                                    </td>
                                                                    <td className="px-6 py-4">{product.quantity}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        ₹{product.price?.toFixed(2)}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        ₹{(product.quantity * product.price).toFixed(2)}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {pagination.totalPages > 1 && (
                        <div className="flex items-center justify-center mt-10 pb-5">
                            <Pagination
                                count={pagination.totalPages}
                                page={pageOrder}
                                onChange={(e, value) => setPageOrder(value)}
                                showFirstButton
                                showLastButton
                            />
                        </div>
                    )}

                </div>
            </div>

            {/* <div className="card my-3 shadow-md sm:rounded-lg bg-white">
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
            </div> */}
            <div className="card pt-0 my-3 shadow-md sm:rounded-lg bg-white">
                <div className="card pt-5 my-3 shadow-md sm:rounded-lg bg-white overflow-hidden">
                    <h2 className='text-[18px] md:text-[19px] font-[600] whitespace-nowrap pl-6 mb-4'>Products</h2>
                    <div className="flex flex-row flex-wrap items-end w-full px-4 md:px-6 justify-between gap-2 md:gap-4">
                        <div className="flex-1 min-w-0">
                            <h4 className='font-[600] text-[10px] md:text-[13px] mb-1 truncate pl-4'>Category</h4>
                            {
                                context?.catData?.length !== 0 &&
                                <Select
                                    style={{ zoom: "70%", width: '100%' }}
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    size="small"
                                    className='w-full'
                                    value={productCat}
                                    label="Category"
                                    onChange={handleChangeProductCat}
                                >
                                    {
                                        context?.catData?.map((cat, index) => {
                                            return (
                                                <MenuItem key={index} value={cat?._id}>{cat?.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            }
                        </div>

                        <div className="flex-1 min-w-0">

                            <h4 className='font-[600] text-[10px] md:text-[13px] mb-1 truncate'>Sub Category</h4>
                            {
                                context?.catData?.length !== 0 &&
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    style={{ zoom: "70%", width: '100%' }}
                                    size="small"
                                    className='w-full'
                                    value={productSubCat}
                                    label="Sub Category"
                                    onChange={handleChangeProductSubCat}
                                >
                                    {
                                        context?.catData?.map((cat) => {
                                            return (
                                                cat?.children?.length !== 0 && cat?.children?.map((subCat, index_) => {
                                                    return (
                                                        <MenuItem key={index_} value={subCat?._id}>{subCat?.name}</MenuItem>
                                                    )
                                                })
                                            )
                                        })
                                    }
                                </Select>
                            }
                        </div>

                        <div className="flex-1 min-w-0">

                            <h4 className='font-[600] text-[10px] md:text-[13px] mb-1 truncate'>Third Level</h4>
                            {
                                context?.catData?.length !== 0 &&
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    style={{ zoom: "70%", width: '100%' }}
                                    size="small"
                                    className='w-full'
                                    value={productThirdLavelCat}
                                    label="Third Lavel Category"
                                    onChange={handleChangeProductThirdLavelCat}
                                >
                                    {
                                        context?.catData?.map((cat) => {
                                            return (
                                                cat?.children?.length !== 0 && cat?.children?.map((subCat) => {
                                                    return (
                                                        subCat?.children?.length !== 0 &&
                                                        subCat?.children?.map((thirdLavelCat, index) => {
                                                            return (
                                                                <MenuItem value={thirdLavelCat?._id} key={index}>
                                                                    {thirdLavelCat?.name}
                                                                </MenuItem>
                                                            );
                                                        })
                                                    );
                                                })
                                            );
                                        })
                                    }
                                </Select>
                            }
                        </div>

                        <div className="w-full md:w-[35%] mt-3 md:mt-0 md:ml-auto">
                            <div className="scale-[0.85] md:scale-100 origin-left md:origin-right">
                                <SearchBox
                                    searchQuery={searchQuery2}
                                    setSearchQuery={setSearchQuery2}
                                    setPageOrder={setPageOrder2}
                                />
                            </div>
                        </div>

                    </div>
                    <br />
                </div>
                <br></br>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow>
                                {/* <TableCell>
                                    <Checkbox {...label} size="small"
                                        onChange={handleSelectAll}
                                        checked={(productData?.length > 0 ? productData.every((item) => item.checked) : false)} />
                                </TableCell> */}
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
                            {
                                isLoading === false ?
                                    productData?.length !== 0 &&
                                    <>
                                        {
                                            productData?.length !== 0 &&
                                            productData?.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                                ?.map((product, index) => {
                                                    return (
                                                        <TableRow key={index}>
                                                            {/* <TableCell style={{ minWidth: columns.minWidth }}>
                                                                <Checkbox {...label} size="small"
                                                                    checked={product?.checked === true ? true : false}
                                                                    onChange={(e) => handleCheckboxChange(e, product?._id, index)}
                                                                />
                                                            </TableCell> */}
                                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                                <div className="flex items-center gap-4 w-[300px]">
                                                                    <div className=" group img w-[65px] h-[65px] rounded-md overflow-hidden">
                                                                        <Link to={`/products/${product?._id}`}>
                                                                            <LazyLoadImage
                                                                                alt={"image"}
                                                                                effect="blur"
                                                                                className="w-full group-hover:scale-105 transition-all"
                                                                                src={product?.images[0]}
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                    <div className="info w-[75%]">
                                                                        <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                                                                            <Link to={`/products/${product?._id}`}>
                                                                                {product?.name}
                                                                            </Link>
                                                                        </h3>
                                                                        <span className="text-[12px]">{product?.brand}</span>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                                {product?.catName}
                                                            </TableCell>
                                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                                {product?.subCat}
                                                            </TableCell>
                                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                                <div className="flex gap-1 flex-col">
                                                                    <span className="oldPrice leading-3 line-through text-gray-500 text-[14px] font-[500]">
                                                                        &#x20b9;{product?.price}
                                                                    </span>
                                                                    <span className="price text-[#3872fa] text-[14px] font-[600]">
                                                                        &#x20b9;{product?.oldPrice}
                                                                    </span>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                                <p className="text-[14px] w-[100px]"><span className="font-[600]">
                                                                    {product?.sale}</span> sale</p>
                                                                <Progress value={product?.sale} type="success" />
                                                            </TableCell>
                                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                                <p className="text-[14px] w-[100px]">
                                                                    <Rating
                                                                        size="small"
                                                                        name="half-rating"
                                                                        value={product?.rating}
                                                                        precision={0.5}
                                                                        readOnly
                                                                    />

                                                                </p>
                                                            </TableCell>
                                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                                <div className="flex items-center gap-1">
                                                                    <TooltipMUI title="Edit Product" placement="top">
                                                                        <Button
                                                                            onClick={() => context.setIsOpenFullScreenPanel({
                                                                                open: true,
                                                                                model: 'Edit Product',
                                                                                id: product?._id
                                                                            })}
                                                                            className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                                            <MdModeEdit className="text-[rgba(0,0,0,1)] text-[20px]" />
                                                                        </Button>
                                                                    </TooltipMUI>
                                                                    <TooltipMUI title="View Product Details" placement="top">
                                                                        <Link to={`/product/${product?._id}`}>
                                                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                                                <FaEye className="text-[rgba(0,0,0,1)] text-[20px]" />
                                                                            </Button>
                                                                        </Link>
                                                                    </TooltipMUI>
                                                                    <TooltipMUI title="Remove Product" placement="top">
                                                                        <Button
                                                                            onClick={() => deleteProduct(product?._id)}
                                                                            className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                                            <FaTrashAlt className="text-[rgba(0,0,0,1)] text-[17px]" />
                                                                        </Button>
                                                                    </TooltipMUI>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                        }
                                    </>
                                    :
                                    <>
                                        <TableRow>
                                            <TableCell colSpan={8}>
                                                <div className="flex items-center justify-center w-full min-h-[400px]">
                                                    <CircularProgress color="inherit" />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </>
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[1, 10, 25, 100]}
                    component="div"
                    count={productData?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>

            <div className="card my-3 shadow-md sm:rounded-lg bg-white">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-3 md:px-5 py-5 pb-0 gap-3">
                    <h2 className='text-[16px] md:text-[19px] font-[600]'>Total Users & Total Sales</h2>

                    <div className="flex flex-row flex-nowrap items-center gap-3 md:gap-5 px-3 md:px-5 py-5 pt-1 overflow-hidden">
                        <div className='text-[8px] md:text-[9px] whitespace-nowrap opacity-60'>
                            (Click here)
                        </div>

                        <span className="flex items-center gap-1 text-[12px] md:text-[15px] cursor-pointer whitespace-nowrap" onClick={getTotalUsersByYear}>
                            <span className="block w-[6px] h-[6px] md:w-[8px] md:h-[8px] rounded-full bg-[#2268fd]"></span>
                            Total Users
                        </span>

                        <span className="flex items-center gap-1 text-[12px] md:text-[15px] cursor-pointer whitespace-nowrap" onClick={getTotalSalesByYear}>
                            <span className="block w-[6px] h-[6px] md:w-[8px] md:h-[8px] rounded-full bg-green-600"></span>
                            Total Sales
                        </span>
                    </div>

                    <div className="card m-3 p-3 shadow-sm border border-gray-100 sm:rounded-lg bg-white">
                        <div className="flex flex-row items-center justify-between pb-0 gap-2">
                            <h2 className='text-[14px] md:text-[19px] font-[600] truncate'>Analytics Overview</h2>

                            <div className="flex bg-gray-100 p-1 rounded-lg scale-[0.85] md:scale-100 origin-right">
                                <Button
                                    onClick={() => setGraphType('bar')}
                                    className={`!py-1 !px-3 md:!px-4 !min-w-[60px] md:!min-w-[80px] !text-[10px] md:!text-[12px] ${graphType === 'bar' ? 'btn-blue !shadow-md' : '!text-gray-600'}`}
                                >
                                    Bar
                                </Button>
                                <Button
                                    onClick={() => setGraphType('line')}
                                    className={`!py-1 !px-3 md:!px-4 !min-w-[60px] md:!min-w-[80px] !text-[10px] md:!text-[12px] ${graphType === 'line' ? 'btn-blue !shadow-md' : '!text-gray-600'}`}
                                >
                                    Line
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-[400px] md:h-[550px] flex items-center justify-center p-2 md:p-5 overflow-hidden">
                    {chartData?.length !== 0 && (
                        <ResponsiveContainer width="100%" height="100%">
                            {graphType === 'bar' ? (
                                <BarChart
                                    /* Increased mobile width by changing -50 to -20 */
                                    width={context?.windowWidth > 920 ? (context?.windowWidth - 300) : (context?.windowWidth - 20)}
                                    height={context?.windowWidth > 920 ? 500 : 320}
                                    data={chartData}
                                    margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                                >
                                    <XAxis
                                        dataKey="name"
                                        scale="point"
                                        padding={{ left: 10, right: 10 }}
                                        tick={{ fontSize: 10 }} // Smaller font for mobile
                                        style={{ fill: context?.theme === "dark" ? "white" : "#000" }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 10 }}
                                        style={{ fill: context?.theme === "dark" ? "white" : "#000" }}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#071739", color: "white" }}
                                    />
                                    <Legend iconSize={10} wrapperStyle={{ fontSize: '12px' }} />
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
                                    <Bar dataKey="TotalSales" stackId="a" fill="#16a34a" />
                                    <Bar dataKey="TotalUsers" stackId="b" fill="#0858f7" />
                                </BarChart>
                            ) : (
                                <LineChart
                                    /* Increased mobile width by changing -50 to -20 */
                                    width={context?.windowWidth > 920 ? (context?.windowWidth - 300) : (context?.windowWidth - 20)}
                                    height={context?.windowWidth > 920 ? 500 : 320}
                                    data={chartData}
                                    margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                                >
                                    <XAxis
                                        dataKey="name"
                                        padding={{ left: 10, right: 10 }}
                                        tick={{ fontSize: 10 }}
                                        style={{ fill: context?.theme === "dark" ? "white" : "#000" }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 10 }}
                                        style={{ fill: context?.theme === "dark" ? "white" : "#000" }}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#071739", color: "white", borderRadius: '8px' }}
                                    />
                                    <Legend verticalAlign="top" height={36} iconSize={10} wrapperStyle={{ fontSize: '12px' }} />
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                                    <Line type="monotone" dataKey="TotalSales" stroke="#16a34a" strokeWidth={3} dot={{ r: 4 }} />
                                    <Line type="monotone" dataKey="TotalUsers" stroke="#0858f7" strokeWidth={3} dot={{ r: 4 }} />
                                </LineChart>
                            )}
                        </ResponsiveContainer>
                    )}
                </div>
            </div >
        </>
    );
}

export default Dashboard;