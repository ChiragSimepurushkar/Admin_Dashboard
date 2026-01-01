import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import TooltipMUI from '@mui/material/Tooltip';
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MyContext } from "../../App";
import { deleteData, editData, fetchDataFromApi, postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const AddRAMS = () => {
    const [name, setName] = useState();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editId, setEditId] = useState('');
    const context = useContext(MyContext);

    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
        fetchDataFromApi("/api/product/productRAMS").then((res) => {
            if (res?.error === false) {
                setData(res?.data)
            }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === "") {
            context.openAlertBox("error", "Please enter product RAM");
            return;
        }

        setIsLoading(true);

        if (editId === "") {
            postData('/api/product/productRAMS/create', { name: name })
                .then((res) => {
                    if (res?.error === false) {
                        context.openAlertBox("success", res?.message);
                        getData();
                        setName("");
                    } else {
                        context.openAlertBox("error", res?.message);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        else {
            editData(`/api/product/productRAMS/${editId}`,
                { name: name })
                .then((res) => {
                    if (res?.error === false) {
                        context.openAlertBox("success", res?.message);
                        getData();
                        setName("");
                    } else {
                        context.openAlertBox("error", res?.message);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                    setEditId("");
                });
        }
    };

    const deleteItems = (id) => {
        deleteData(`/api/product/productRAMS/${id}`).then((res) => {
            getData();
            context.openAlertBox("success", "Items deleted");
        })
    }
    const editItem = (id) => {
        fetchDataFromApi(`/api/product/productRAMS/${id}`).then((res) => {
            setName(res?.data?.name)
            setEditId(res?.data?._id);
        })
    }

    return (
        <>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-2 py-3 mt-0 gap-2">
                <h2 className="text-[18px] md:text-[19px] font-[600] whitespace-nowrap">
                    Add Product RAMS
                </h2>
            </div>
            <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-full md:w-[65%] px-2">
                <form className='form py-3 p-4 md:p-6' onSubmit={handleSubmit}>
                    <div className='col mb-4'>
                        <h3 className='text-[14px] md:text-[16px] font-[500] mb-1 text-black uppercase tracking-wider'>PRODUCT RAM</h3>
                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name="name" />
                    </div>

                    <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
                        {
                            isLoading === true ? <CircularProgress color="inherit" />
                                :
                                <>
                                    <FaCloudUploadAlt className="text-[25px] text-white" />
                                    Publish and View
                                </>
                        }
                    </Button>
                </form>
            </div>
            {
                data?.length !== 0 &&
                <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-full md:w-[65%] overflow-hidden">
                    <div className="relative overflow-x-auto px-2 md:px-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                            <thead className="text-xs text-gray-900 uppercase bg-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap" width='70%'>
                                        PRODUCT RAM
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap" width='30%'>
                                        ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((item, index) => {
                                        return (
                                            <tr key={index} className="odd:bg-white even:bg-gray-100 border-b border-gray-200">
                                                <td className="px-6 py-2">
                                                    <span className="font-[600]">{item?.name}</span>
                                                </td>
                                                <td className="px-6 py-2"><div className="flex items-center gap-1 md:gap-2">
                                                    <TooltipMUI title="Edit Product" placement="top">
                                                        <Button
                                                            onClick={() => editItem(item?._id)}
                                                            className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                            <MdModeEdit className="text-[rgba(0,0,0,1)] text-[20px]" />
                                                        </Button>
                                                    </TooltipMUI>
                                                    <TooltipMUI title="Remove Product" placement="top">
                                                        <Button
                                                            onClick={() => deleteItems(item?._id)}
                                                            className="!rounded-full hover:!bg-[#ccc] !w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !min-w-[35px]">
                                                            <FaTrashAlt className="text-[rgba(0,0,0,1)] text-[17px]" />
                                                        </Button>
                                                    </TooltipMUI>
                                                </div>
                                                </td>
                                            </tr>
                                        )

                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }

        </>
    )
}

export default AddRAMS;