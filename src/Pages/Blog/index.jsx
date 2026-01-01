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
const columns = [
    { id: 'image', label: 'IMAGE', minWidth: 250 },
    { id: 'title', label: 'TITLE', minWidth: 200 },
    { id: 'description', label: 'DESCRIPTION', minWidth: 300 },
    { id: 'action', label: 'ACTION', minWidth: 100 },
];

export const BlogList = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [blogData, setBlogData] = useState([]);
    const context = useContext(MyContext);
    const [sortedIds, setSortedIds] = useState([]);

    const getData = () => {
        fetchDataFromApi("/api/blog").then((res) => {
            console.log(res?.blogs)
            setTimeout(() => {
                setBlogData(res?.blogs)
            }, 500)
        });

    }
    useEffect(() => {
        getData();
    }, [context?.isOpenFullScreenPanel])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteSlides = (id) => {
        deleteData(`/api/blog/${id}`).then((res) => {
            if (res?.error === false) {
                context.openAlertBox("success", res?.message);
                getData()
            } else {
                context.openAlertBox("error", res?.message);
            }
        });
    };
    return (
        <>
            <div className="flex items-center justify-between px-2 py-0 mt-3">
                <h2 className='text-[19px] font-[600]'>Blog Lists
                    {/* <span className='font-[400] text-[14px]'>(Material UI Table)</span> */}
                </h2>
                <div className="col justify-end w-[25%] ml-auto flex items-center gap-3">

                    <Button className="btn-blue btn-sm"
                        onClick={() => context.setIsOpenFullScreenPanel({
                            open: true,
                            model: 'Add Blog'
                        })}>Add Blog</Button>
                </div>
            </div>
            <div className="card pt-5 my-3 shadow-md sm:rounded-lg bg-white">
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow>
                                <TableCell width={60}>

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
                                blogData?.length !== 0 && blogData?.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell >

                                            </TableCell>
                                            <TableCell width={300}>
                                                <div className="flex items-center gap-4 w-[300px]">
                                                    <div className=" group img w-fullrounded-md overflow-hidden">
                                                        <img
                                                            src={item.images[0]}
                                                            className="w-full group-hover:scale-105 transition-all"
                                                        />
                                                    </div>

                                                </div>
                                            </TableCell>
                                            <TableCell width={200}>
                                                <span className='text-[15px] font-[500] w-[200px] inline-block sm:w-[150px] lg:w-[300px]'>{item?.title}</span>
                                            </TableCell>
                                            <TableCell width={300}>
                                                <div className='w-[200px] sm:w-[150px] lg:w-[300px]' dangerouslySetInnerHTML={{ __html: item?.description?.substr(0, 150) + '...' }} />
                                            </TableCell>
                                            <TableCell width={100}>
                                                <div className="flex items-center gap-1">
                                                    <TooltipMUI title="Edit Product" placement="top">
                                                        <Button onClick={() => context.setIsOpenFullScreenPanel({
                                                            open: true,
                                                            model: 'Edit Blog',
                                                            id: item?._id
                                                        })} className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                            <MdModeEdit className="text-[rgba(0,0,0,1)] text-[20px]"
                                                            />
                                                        </Button>
                                                    </TooltipMUI>
                                                    <TooltipMUI title="Remove Product" placement="top">
                                                        <Button
                                                            onClick={() => deleteSlides(item?._id)}
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

                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    blogData?.totalPages > 1 && (
                        <TablePagination
                            rowsPerPageOptions={[1, 10, 25, 100]}
                            component="div"
                            count={blogData?.length}
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

export default BlogList;