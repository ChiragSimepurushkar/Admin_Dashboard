import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { MdModeEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import Progress from '../../Components/Progess';
import TooltipMUI from '@mui/material/Tooltip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchBox from '../../Components/SearchBox';
import { MyContext } from '../../App';
import { deleteData, deleteMultipleData, fetchDataFromApi } from '../../utils/api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import CircularProgress from '@mui/material/CircularProgress';
import Rating from '@mui/material/Rating';
function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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

export const Products = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [productThirdLavelCat, setProductThirdLavelCat] = useState('');
    const [productData, setProductData] = useState([]);
    const [sortedIds, setSortedIds] = useState([]);
    const context = useContext(MyContext);
    const [totalPosts, setTotalPosts] = useState(0);

    const [pageOrder, setPageOrder] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const getProducts = async () => {
        setIsLoading(true);
        // Use the current page + 1 (MUI uses 0-based index, backend usually 1-based)
        // Pass rowsPerPage as the limit
        fetchDataFromApi(`/api/product/getAllProducts?page=${page + 1}&perPage=${rowsPerPage}`)
            .then((res) => {
                if (res?.success === true) {
                    const updatedProducts = res.products.map(product => ({
                        ...product,
                        checked: false
                    }));
                    setProductData(updatedProducts);
                    setTotalPosts(res.totalPosts || 0); // Important for MUI Pagination
                }
                setIsLoading(false);
            });
    };


    // Re-fetch whenever page or rowsPerPage changes
    useEffect(() => {
        getProducts();
    }, [page, rowsPerPage, context?.isOpenFullScreenPanel]);



    useEffect(() => {
        if (searchQuery !== "") {
            // Filter productData based on product-specific attributes
            const filteredProducts = productData.filter((product) =>
                product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product?.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product?.catName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product?.subCat?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setProductData(filteredProducts);
        } else {
            // If search is cleared, fetch the original data again
            getProducts();
        }
    }, [searchQuery]);

    // useEffect(() => {
    //     getProducts()
    // }, [context?.isOpenFullScreenPanel]);
    // Handler to toggle all checkboxes
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

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <>
            <div className="flex items-center justify-between px-2 py-0 mt-3">
                <h2 className='text-[19px] font-[600]'>Products
                </h2>
                <div className="col justify-end w-[25%] ml-auto flex items-center gap-3">
                    {
                        sortedIds?.length !== 0 && <Button variant="contained" className="btn-sm" size="small"
                            color="error"
                            onClick={deleteMultipleProduct}>Delete</Button>
                    }
                    {/* <Button className="btn !bg-green-600 !text-white btn-sm">Export</Button> */}
                    <Button className="btn-blue btn-sm"
                        onClick={() => context.setIsOpenFullScreenPanel({
                            open: true,
                            model: 'Add Product'
                        })}>Add Products</Button>
                </div>
            </div>
            <div className="card pt-5 my-3 shadow-md sm:rounded-lg bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 w-full px-5 justify-between gap-4">
                    <div className="col">
                        <h4 className='font-[600] text-[13px] mb-2'>Category</h4>
                        {
                            context?.catData?.length !== 0 &&
                            <Select
                                style={{ zoom: "80%" }}
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
                                            <MenuItem value={cat?._id}
                                            >{cat?.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        }
                    </div>
                    <div className="col">
                        <h4 className='font-[600] text-[13px] mb-2'>Sub Category</h4>
                        {
                            context?.catData?.length !== 0 &&
                            <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                style={{ zoom: "80%" }}
                                size="small"
                                className='w-full'
                                value={productSubCat}
                                label="Sub Category"
                                onChange={handleChangeProductSubCat}
                            >
                                {
                                    context?.catData?.map((cat, index) => {
                                        return (
                                            cat?.children?.length !== 0 && cat?.children?.map((subCat, index_) => {
                                                return (
                                                    <MenuItem value={subCat?._id}
                                                    >
                                                        {subCat?.name}
                                                    </MenuItem>
                                                )
                                            })
                                        )
                                    })
                                }
                            </Select>
                        }
                    </div>
                    <div className="col">
                        <h4 className='font-[600] text-[13px] mb-2'>Third Level Category</h4>
                        {
                            context?.catData?.length !== 0 &&
                            <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                style={{ zoom: "80%" }}
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
                                                            <MenuItem
                                                                value={thirdLavelCat?._id} key={index}>
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
                    <div className="col w-full ml-auto flex items-center">
                        <div style={{ alignSelf: 'end' }} className="w-full ">
                            <SearchBox
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                setPageOrder={setPageOrder}
                            />
                        </div>
                    </div>
                </div>
                <br></br>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow>
                                <TableCell>
                                    <Checkbox {...label} size="small"
                                        onChange={handleSelectAll}
                                        checked={(productData?.length > 0 ? productData.every((item) => item.checked) : false)} />
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
                            {
                                isLoading === false ?
                                    productData?.length !== 0 &&
                                    <>
                                        {
                                            productData?.length !== 0 &&
                                            productData?.map((product, index) => {
                                                return (
                                                    <TableRow key={product._id}>
                                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                                            <Checkbox {...label} size="small"
                                                                checked={product?.checked === true ? true : false}
                                                                onChange={(e) => handleCheckboxChange(e, product?._id, index)}
                                                            />
                                                        </TableCell>
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
                {
                    totalPosts > 0 && (
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50, 100]}
                            component="div"
                            count={totalPosts}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    )
                }
            </div>
        </>
    );
};

export default Products;