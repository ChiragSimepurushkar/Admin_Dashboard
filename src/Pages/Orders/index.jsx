import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import Badge from '../../Components/Badge';
import SearchBox from '../../Components/SearchBox';
import { useEffect } from 'react';
import { editData, fetchDataFromApi } from '../../utils/api';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import { MyContext } from '../../App';
import Pagination from '@mui/material/Pagination';

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState('');
    const [totalOrdersData, setTotalOrdersData] = useState([]);


    const [pageOrder, setPageOrder] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [ordersData, setOrdersData] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        totalPages: 0
    });

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

    const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
    const isShowOrderProduct = (index) => {
        if (isOpenOrderProduct === index) {
            setIsOpenOrderProduct(null);
        } else {
            setIsOpenOrderProduct(index);
        }
    }
    const context = useContext(MyContext)

    const handleChange = (event, id) => {
        setOrderStatus(event.target.value);
        const obj = {
            id: id,
            order_status: event.target.value
        }

        editData(`/api/order/order-status/${id}`, obj).then((res) => {
            console.log(res)
            if (res?.error === false) {
                context?.openAlertBox("success", res?.message)
                fetchOrders();
            }
        })
    };

    // useEffect(() => {
    //     fetchDataFromApi("/api/order/order-list").then((res) => {
    //         if (res?.error === false) {
    //             setOrders(res?.data);
    //         }
    //     }).catch((error) => {
    //         console.error("Error fetching orders:", error);
    //     });
    // }, [orderStatus]);

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
    }, [searchQuery])

    const fetchOrders = () => {
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
    };

    return (
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
                                    <td className="px-6 py-4 font-[500]">
                                        {order?.delivery_address?.pincode || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 font-[500]">
                                        ₹{order?.totalAmt?.toFixed(2) || '0.00'}
                                    </td>
                                    <td className="px-6 py-4 font-[500]">
                                        {order?.userId?.email || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 font-[500]">

                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={order?.order_status != null ?
                                                order?.order_status : orderStatus
                                            }
                                            label="Status"
                                            size='small'
                                            style={{zoom:'80%'}}
                                            className='w-full'
                                            onChange={(e) => handleChange(e, order?._id)}
                                        >
                                            <MenuItem value={'pending'}>Pending</MenuItem>
                                            <MenuItem value={'confirm'}>Confirm</MenuItem>
                                            <MenuItem value={'delivered'}>Delivered</MenuItem>
                                        </Select>
                                        {/* <Badge status={order?.order_status} /> */}
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
    )
}

export default Orders;



// import React, { useState, useEffect } from 'react';
// import { Search, ChevronDown, ChevronUp } from 'lucide-react';
// import SearchBox from '../../Components/SearchBox';
// import Badge from '../../Components/Badge';
// import { fetchDataFromApi } from '../../../../Ecommerce/src/utils/api';




// const Orders = () => {
//     const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
//     const [orders, setOrders] = useState([]);
//     const [filteredOrders, setFilteredOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     useEffect(() => {
//         if (searchQuery.trim() === '') {
//             setFilteredOrders(orders);
//         } else {
//             const query = searchQuery.toLowerCase();
//             const filtered = orders.filter(order =>
//                 order._id?.toLowerCase().includes(query) ||
//                 order.paymentId?.toLowerCase().includes(query) ||
//                 order.userId?.name?.toLowerCase().includes(query) ||
//                 order.userId?.email?.toLowerCase().includes(query) ||
//                 order.order_status?.toLowerCase().includes(query)
//             );
//             setFilteredOrders(filtered);
//         }
//     }, [searchQuery, orders]);

//     const fetchOrders = async () => {
//         try {
//             setLoading(true);
//             // Replace this URL with your actual API endpoint
//             const response = await fetchDataFromApi('/api/order/order-list').then((response) => {
//                 const data = response.json();
//             })
//             if (data.error === false && data.data) {
//                 setOrders(data.data);
//                 setFilteredOrders(data.data);
//             } else {
//                 setError(data.message || 'Failed to load orders');
//             }
//         } catch (err) {
//             console.error('Error fetching orders:', err);
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }




//     const isShowOrderProduct = (index) => {
//         setIsOpenOrderProduct(isOpenOrderProduct === index ? null : index);
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     if (loading) {
//         return (
//             <div className="card my-3 shadow-md sm:rounded-lg bg-white">
//                 <div className="flex items-center justify-center py-20">
//                     <div className="text-center">
//                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//                         <p className="text-gray-600">Loading orders...</p>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="card my-3 shadow-md sm:rounded-lg bg-white">
//                 <div className="flex items-center justify-center py-20">
//                     <div className="text-center">
//                         <p className="text-red-600 mb-4">Error: {error}</p>
//                         <button
//                             onClick={fetchOrders}
//                             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                         >
//                             Retry
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="card my-3 shadow-md sm:rounded-lg bg-white">
//             <div className="flex items-center justify-between px-5 py-5">
//                 <div>
//                     <h2 className='text-[19px] font-[600]'>Recent Orders</h2>
//                     <p className="text-sm text-gray-600 mt-1">
//                         Total: <span className="font-semibold text-blue-600">{filteredOrders.length}</span> orders
//                     </p>
//                 </div>
//                 <div className="w-[40%]">
//                     <SearchBox value={searchQuery} onChange={setSearchQuery} />
//                 </div>
//             </div>

//             <div className="relative overflow-x-auto mt-5 pb-5">
//                 <table className="w-full text-sm text-left rtl:text-right text-gray-700">
//                     <thead className="text-xs text-gray-900 uppercase bg-gray-100">
//                         <tr>
//                             <th scope="col" className="px-6 py-3 whitespace-nowrap">&nbsp;</th>
//                             <th scope="col" className="px-6 py-3 whitespace-nowrap">Order ID</th>
//                             <th scope="col" className="px-6 py-3 whitespace-nowrap">Payment ID</th>
//                             <th scope="col" className="px-6 py-3 whitespace-nowrap">Name</th>
//                             <th scope="col" className="px-6 py-3 whitespace-nowrap">Phone Number</th>
//                             <th scope="col" className="px-6 py-3 whitespace-nowrap">Address</th>
//                             <th scope="col" className="px-6 py-3 whitespace-nowrap">Pincode</th>
//                             <th scope="col" className="px-6 py-3 whitespace-nowrap">Total Amount</th>
//                             <th scope="col" className="px-6 py-3 whitespace-nowrap">Email</th>
//                             <th scope="col" className="px-6 py-3 whitespace-nowrap">User ID</th>
//                             <th scope="col" className="px-6 py-3 whitespace-nowrap">Order Status</th>
//                             <th scope="col" className="px-6 py-3 whitespace-nowrap">Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredOrders.length === 0 ? (
//                             <tr>
//                                 <td colSpan="12" className="px-6 py-12 text-center text-gray-500">
//                                     No orders found
//                                 </td>
//                             </tr>
//                         ) : (
//                             filteredOrders.map((order, index) => (
//                                 <React.Fragment key={order._id}>
//                                     <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
//                                         <td className="px-6 py-4 font-[500]">
//                                             <button
//                                                 onClick={() => isShowOrderProduct(index)}
//                                                 className='w-[35px] bg-gray-100 rounded-full min-w-[35px] h-[35px] flex items-center justify-center hover:bg-gray-200 transition-colors'
//                                             >
//                                                 {isOpenOrderProduct === index ?
//                                                     <ChevronUp className='text-[16px] text-gray-700' /> :
//                                                     <ChevronDown className='text-[16px] text-gray-700' />
//                                                 }
//                                             </button>
//                                         </td>
//                                         <td className="px-6 py-4 font-[500]">
//                                             <span className='text-blue-600 font-[600] text-xs'>
//                                                 {order._id?.slice(-8) || 'N/A'}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 font-[500]">
//                                             <span className='text-blue-600 font-[600] text-xs'>
//                                                 {order.paymentId ? order.paymentId.slice(-8) : 'COD'}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 font-[500] whitespace-nowrap">
//                                             {order.userId?.name || 'N/A'}
//                                         </td>
//                                         <td className="px-6 py-4 font-[500] whitespace-nowrap">
//                                             {order.userId?.mobile || 'N/A'}
//                                         </td>
//                                         <td className="px-6 py-4 font-[500]">
//                                             <span className='block max-w-[300px] truncate'>
//                                                 {order.delivery_address ? (
//                                                     `${order.delivery_address.address_line1}, ${order.delivery_address.city}, ${order.delivery_address.state}`
//                                                 ) : 'N/A'}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 font-[500]">
//                                             {order.delivery_address?.pincode || 'N/A'}
//                                         </td>
//                                         <td className="px-6 py-4 font-[500] whitespace-nowrap">
//                                             <span className="font-semibold text-green-600">
//                                                 ${order.totalAmt?.toFixed(2) || '0.00'}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 font-[500]">
//                                             <span className="text-xs">{order.userId?.email || 'N/A'}</span>
//                                         </td>
//                                         <td className="px-6 py-4 font-[500]">
//                                             <span className='text-blue-600 font-[600] text-xs'>
//                                                 {order.userId?._id?.slice(-6) || 'N/A'}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 font-[500]">
//                                             <Badge status={order.order_status || 'pending'} />
//                                         </td>
//                                         <td className="px-6 py-4 font-[500] whitespace-nowrap">
//                                             {formatDate(order.createdAt)}
//                                         </td>
//                                     </tr>

//                                     {isOpenOrderProduct === index && (
//                                         <tr>
//                                             <td className="pl-20 bg-gray-50" colSpan="12">
//                                                 <div className="relative overflow-x-auto py-4">
//                                                     <table className="w-full text-sm text-left rtl:text-right text-gray-700">
//                                                         <thead className="text-xs text-gray-900 uppercase bg-gray-200">
//                                                             <tr>
//                                                                 <th scope="col" className="px-6 py-3 whitespace-nowrap">Product ID</th>
//                                                                 <th scope="col" className="px-6 py-3 whitespace-nowrap">Product Title</th>
//                                                                 <th scope="col" className="px-6 py-3 whitespace-nowrap">Image</th>
//                                                                 <th scope="col" className="px-6 py-3 whitespace-nowrap">Quantity</th>
//                                                                 <th scope="col" className="px-6 py-3 whitespace-nowrap">Price</th>
//                                                                 <th scope="col" className="px-6 py-3 whitespace-nowrap">Sub Total</th>
//                                                             </tr>
//                                                         </thead>
//                                                         <tbody>
//                                                             {order.products && order.products.length > 0 ? (
//                                                                 order.products.map((product, i) => (
//                                                                     <tr key={i} className="bg-white border-b border-gray-200">
//                                                                         <td className="px-6 py-4 font-[500]">
//                                                                             <span className='text-green-700 text-xs'>
//                                                                                 {product.productId?.slice(-8) || 'N/A'}
//                                                                             </span>
//                                                                         </td>
//                                                                         <td className="px-6 py-4 font-[500]">
//                                                                             <span className='text-blue-600 font-[600]'>
//                                                                                 {product.productTitle || 'N/A'}
//                                                                             </span>
//                                                                         </td>
//                                                                         <td className="px-6 py-4 font-[500]">
//                                                                             <img
//                                                                                 src={product.image || 'https://via.placeholder.com/40'}
//                                                                                 alt={product.productTitle}
//                                                                                 className='w-[40px] h-[40px] object-cover rounded-md'
//                                                                             />
//                                                                         </td>
//                                                                         <td className="px-6 py-4 font-[500]">
//                                                                             <span className="font-semibold">{product.quantity}</span>
//                                                                         </td>
//                                                                         <td className="px-6 py-4 font-[500] whitespace-nowrap">
//                                                                             ${product.price?.toFixed(2) || '0.00'}
//                                                                         </td>
//                                                                         <td className="px-6 py-4 font-[500]">
//                                                                             <span className="font-semibold text-green-600">
//                                                                                 ${((product.quantity || 0) * (product.price || 0)).toFixed(2)}
//                                                                             </span>
//                                                                         </td>
//                                                                     </tr>
//                                                                 ))
//                                                             ) : (
//                                                                 <tr>
//                                                                     <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                                                                         No products found
//                                                                     </td>
//                                                                 </tr>
//                                                             )}
//                                                         </tbody>
//                                                     </table>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </React.Fragment>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Orders;