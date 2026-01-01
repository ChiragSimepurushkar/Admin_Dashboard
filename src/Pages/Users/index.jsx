import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchBox from '../../Components/SearchBox';
import { MyContext } from '../../App';
import { MdAttachEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { BsCalendarDate } from "react-icons/bs";
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteMultipleData, fetchDataFromApi } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import Badge from '../../Components/Badge';

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const columns = [
    { id: 'userImg', label: 'USER IMAGE', minWidth: 80 },
    { id: 'userName', label: 'USER NAME', minWidth: 100 },
    {
        id: 'userEmail',
        label: 'USER EMAIL',
        minWidth: 150,
    },
    {
        id: 'userPh',
        label: 'USER PHONE NO.',
        minWidth: 130,
    },
    {
        id: 'verifyEmail',
        label: 'Email Verified',
        minWidth: 130,
    },
    {
        id: 'createdDate',
        label: 'CREATED',
        minWidth: 130,
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

export const Users = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState([])
    const [sortedIds, setSortedIds] = useState([]);

    const context = useContext(MyContext);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getUsers();

    }, [])
    const getUsers = () => {
        setIsLoading(true);
        fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
            setTimeout(() => {
                setUserData(res?.users)
                setIsLoading(false)

            }, 500)
        })
    }

    const handleCheckboxChange = (e, id, index) => {

        const updatedItems = userData.map((item) =>
            item._id === id ? { ...item, checked: e.target.checked } : item
        );
        setUserData(updatedItems);

        // Update the sorted IDs state
        const selectedIds = updatedItems
            .filter((item) => item.checked)
            .map((item) => item._id)
            .sort((a, b) => a - b);
        setSortedIds(selectedIds);
    };
    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;

        // Update all items' checked status
        const updatedItems = userData.map((item) => ({
            ...item,
            checked: isChecked,
        }));

        setUserData(updatedItems);
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

    const deleteMultiple = async () => {
        if (sortedIds.length === 0) {
            context.openAlertBox('error', 'Please select users to delete.');
            return;
        }

        try {
            const res = await deleteMultipleData('/api/user/deleteMultiple', {
                data: { ids: sortedIds }
            });

            if (res?.success === true) {
                getUsers();
                setSortedIds([]);
                context.openAlertBox("success", res?.message || "Users deleted successfully");
            } else {
                context.openAlertBox("error", res?.message || "Failed to delete users");
            }
        } catch (error) {
            console.error("Delete error:", error);
            context.openAlertBox('error', 'Error deleting items.');
        }
    }

    return (
        <>
            <div className="card pt-5 my-3 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center w-full px-5 justify-between">
                    <div className="col w-[40%]">
                        <div className="flex items-center justify-between px-2 py-0 mt-3">
                            <h2 className='text-[19px] font-[600]'>Users List
                            </h2>
                        </div>
                    </div>
                    {
                        sortedIds?.length !== 0 && <Button variant="contained" className="btn-sm" size="small"
                            color="error"
                            onClick={deleteMultiple}>Delete</Button>
                    }
                    <div className="col w-[40%] ml-auto">
                        <SearchBox />
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
                                        checked={(userData?.length > 0 ? userData.every((item) => item.checked) : false)} />
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
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={8}>
                                        <div className="flex items-center justify-center w-full min-h-[400px]">
                                            <CircularProgress color="inherit" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                userData?.length > 0 ? (
                                    userData?.slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )?.reverse()
                                        ?.map((user, index) => (
                                            <>
                                                <TableRow key={index}>
                                                    <TableCell style={{ minWidth: columns.minWidth }}>
                                                        <Checkbox {...label} size="small"
                                                            checked={user?.checked === true ? true : false}
                                                            onChange={(e) => handleCheckboxChange(e, user?._id, index)}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ minWidth: columns.minWidth }}>
                                                        <div className="flex items-center gap-4 w-[70px]">
                                                            <div className=" group img w-[45px] h-[45px] rounded-md overflow-hidden">
                                                                <Link to="/product/35545">

                                                                    <img
                                                                        src={user?.avatar !== "" && user?.avatar !== undefined ? user?.avatar : '/user.png'}
                                                                        className="w-full group-hover:scale-105 transition-all"
                                                                    />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell style={{ minWidth: columns.minWidth }}>
                                                        {user?.name}
                                                    </TableCell>
                                                    <TableCell style={{ minWidth: columns.minWidth }}>
                                                        <span className='flex items-center gap-2'><MdAttachEmail />
                                                            {user?.email}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell style={{ minWidth: columns.minWidth }}>
                                                        <span className='flex items-center gap-2'>
                                                            {user?.mobile !== null ? <> <FaPhone />
                                                                +{user?.mobile}</> : "NA"}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell style={{ minWidth: columns.minWidth }}>
                                                        {user?.verify_email === true ?
                                                            <span
                                                                className={`inline-block py-1 px-4 rounded-full text-[11px] capitalize bg-green-500 text-white`} 
                                                            >
                                                               Verified
                                                            </span> :
                                                            <span
                                                                className={`inline-block py-1 px-4 rounded-full text-[11px] capitalize bg-[#ff5252] text-white
                                                                   
                                                            `}
                                                            >
                                                                Not Verified
                                                            </span>}

                                                    </TableCell>
                                                    <TableCell style={{ minWidth: columns.minWidth }}>
                                                        <span className='flex items-center gap-2'>
                                                            <BsCalendarDate />{user?.createdAt.split('T')[0]}</span>
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center">No users found.</TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[2, 10, 25, 100]}
                    component="div"
                    count={userData?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div >
        </>
    );
};

export default Users;