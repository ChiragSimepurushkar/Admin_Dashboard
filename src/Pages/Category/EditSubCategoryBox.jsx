import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from 'react-icons/fa';
import { MyContext } from '../../App';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { deleteData, editData } from '../../utils/api';

const EditSubCategoryBox = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [selectVal, setSelectVal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        name: "",
        parentCatName: null,
        parentId: null,
    });
    const context = useContext(MyContext);

    const handleChange = (event) => {
        setSelectVal(event.target.value);
        formFields.parentId = event.target.value
    };
    useEffect(() => {
        formFields.name = props?.name;
        formFields.parentCatName = props?.selectedCatName;
        formFields.parentId = props?.selectedCat;
        setSelectVal(props?.selectedCat);
    }, []);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        const catId = selectVal
        setSelectVal(catId)
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value,
            };
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (formFields.name === "") {
            context.alertBox("error", "Please enter category name");
            return false
        }
        editData(`/api/category/${props?.id}`, formFields).then((res) => {
            setTimeout(() => {
                context.openAlertBox('success', res?.message);
                context?.getCat();
                setIsLoading(false);
            }, 1000);
        });
    };
    const deleteCat = (id) => {
        deleteData(`/api/category/${id}`).then((res) => {
            context?.getCat();
        });
    };
    // inside EditSubCategoryBox.js
    return (
        <>
            <form className="w-full flex items-center justify-between gap-3 p-0 px-2 md:px-4"
                onSubmit={handleSubmit}>

                {editMode === true && (
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-2 gap-3 md:gap-4 w-full">

                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-[70%]">
                            <div className="w-full sm:w-[40%]">
                                <Select
                                    style={{ zoom: '75%' }}
                                    className="!w-full"
                                    size="small"
                                    value={selectVal}
                                    onChange={handleChange}
                                    displayEmpty
                                >
                                    {props.catData?.map((item, index) => (
                                        <MenuItem value={item?._id} key={index} onClick={() => { formFields.parentCatName = item?.name; }}>
                                            {item?.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <input
                                type="text"
                                className="w-[60%] h-[31px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm"
                                name="name"
                                value={formFields?.name}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="flex items-center gap-2 ml-auto md:ml-0">
                            <Button size="small" type="submit" variant="contained">
                                {isLoading ? <CircularProgress size={20} color="inherit" /> : "Edit"}
                            </Button>
                            <Button size="small" variant="outlined" onClick={() => setEditMode(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                {editMode === false && (
                    <>
                        {/* The name stays left, the div below pushes to the right */}
                        <span className="font-[500] text-[14px]">{props?.name}</span>

                        {/* ml-auto is key here to push this specific div to the absolute right */}
                        <div className="flex items-center ml-auto gap-2">
                            <Button
                                onClick={() => setEditMode(true)}
                                className='!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black'>
                                <MdModeEdit />
                            </Button>
                            <Button
                                onClick={() => deleteCat(props?.id)}
                                className='!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black'>
                                <FaRegTrashAlt />
                            </Button>
                        </div>
                    </>
                )}
            </form>
        </>
    );
}

export default EditSubCategoryBox;