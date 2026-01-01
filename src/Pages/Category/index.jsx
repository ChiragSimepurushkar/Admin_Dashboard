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
import { deleteData, fetchDataFromApi } from '../../utils/api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const columns = [
    { id: 'image', label: 'IMAGE', minWidth: 150 },
    { id: 'catName', label: 'CATEGORY NAME', minWidth: 150 },
    { id: 'action', label: 'ACTION', minWidth: 100 },
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

export const Category = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [categoryFilterVal, setCategoryFilterVal] = React.useState('');
    const context = useContext(MyContext);
    useEffect(() => {
        fetchDataFromApi("/api/category").then((res) => {
            context?.setCatData(res?.data);
        });
    }, [context?.isOpenFullScreenPanel]);

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
    const deleteCat = (id) => {
        deleteData(`/api/category/${id}`).then((res) => {
            fetchDataFromApi("/api/category").then((res) => {
                context?.setCatData(res?.data)
            })
        });
    };

    return (
        <>
            <div className="flex items-center justify-between px-2 py-0 mt-1">
                <h2 className='text-[19px] font-[600]'>Category List
                    {/* <span className='font-[400] text-[14px]'>(Material UI Table)</span> */}
                </h2>
                <div className="col justify-end w-[40%] ml-auto flex items-center gap-3">
                    {/* <Button className="btn !bg-green-600 !text-white btn-sm">Export</Button> */}
                    <Button className="btn-blue btn-sm"
                        onClick={() => context.setIsOpenFullScreenPanel({
                            open: true,
                            model: 'Add New Category'
                        })}>Add New Category</Button>
                </div>
            </div>
            <div className="card pt-5 my-3 shadow-md sm:rounded-lg bg-white">
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow>
                                <TableCell width={25}>
                                    
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        width={column.minWidth}
                                        align={column.align}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                context?.catData?.length !== 0 && context?.catData?.map((item, index) => {
                                    return (
                                        <>
                                            <TableRow key={index}>
                                                <TableCell >
                                                    
                                                </TableCell>
                                                <TableCell width={100}>
                                                    <div className="flex items-center gap-4 w-[70px]">
                                                        <div className=" group img w-fullrounded-md overflow-hidden">
                                                            <Link to="/product/35545">
                                                                <LazyLoadImage
                                                                    alt={"image"}
                                                                    effect="blur"
                                                                    className="w-full group-hover:scale-105 transition-all"
                                                                    src={item.images[0]}
                                                                />
                                                            </Link>
                                                        </div>

                                                    </div>
                                                </TableCell>
                                                <TableCell width={100}>
                                                    {item?.name}
                                                </TableCell>
                                                <TableCell width={100}>
                                                    <div className="flex items-center gap-1">
                                                        <TooltipMUI title="Edit Product" placement="top">
                                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] 
                                                            !h-[35px] bg-[#f1f1f1] !border 
                                                            !border-[rgba(0,0,0,0.4)] !min-w-[35px]"
                                                                onClick={() => context.setIsOpenFullScreenPanel({
                                                                    open: true,
                                                                    model: 'Edit Category',
                                                                    id: item?._id
                                                                })}>
                                                                <MdModeEdit className="text-[rgba(0,0,0,1)] text-[20px]" />
                                                            </Button>
                                                        </TooltipMUI>
                                                        {/* <TooltipMUI title="View Product Details" placement="top">
                                                            <Button className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                                <FaEye className="text-[rgba(0,0,0,1)] text-[20px]" />
                                                            </Button>
                                                        </TooltipMUI> */}
                                                        <TooltipMUI title="Remove Product" placement="top">
                                                            <Button onClick={() => deleteCat(item?._id)} className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                                <FaTrashAlt className="text-[rgba(0,0,0,1)] text-[17px]" />
                                                            </Button>
                                                        </TooltipMUI>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    )
                                })
                            }
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

export default Category;