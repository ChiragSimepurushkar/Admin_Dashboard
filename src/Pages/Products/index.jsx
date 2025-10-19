import React, { useContext } from 'react';
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
            <div className="flex items-center justify-between px-2 py-0 mt-3">
                <h2 className='text-[19px] font-[600]'>Products
                    <span className='font-[400] text-[14px]'>(Material UI Table)</span>
                </h2>
                <div className="col justify-end w-[25%] ml-auto flex items-center gap-3">
                    <Button className="btn !bg-green-600 !text-white btn-sm">Export</Button>
                    <Button className="btn-blue btn-sm"
                    onClick={()=>context.setIsOpenFullScreenPanel({
                        open:true,
                        model:'Add Product'
                    })}>Add Products</Button>
                </div>
            </div>
            <div className="card pt-5 my-3 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center w-full px-5 justify-between">
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
                    <div className="col w-[20%] ml-auto">
                        <SearchBox />
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
        </>
    );
};

export default Products;