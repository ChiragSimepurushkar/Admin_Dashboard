import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { MyContext } from '../../App';
import { FaAngleDown } from 'react-icons/fa';
import EditSubCategoryBox from './EditSubCategoryBox';


export const SubCategory = () => {
    const [isOpen, setIsOpen] = useState(0);
    const context = useContext(MyContext);

    const expend = (index) => {
        if (isOpen === index) {
            setIsOpen(!isOpen);
        } else {
            setIsOpen(index);
        }
    }

    return (
        <>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-2 py-3 mt-0 gap-2">
                <h2 className='text-[18px] md:text-[19px] font-[600] whitespace-nowrap'>
                    Sub Category List
                </h2>
                <div className="flex items-center gap-3">
                    <Button
                        className="btn-blue btn-sm"
                        onClick={() => context.setIsOpenFullScreenPanel({
                            open: true,
                            model: 'Add New Sub Category'
                        })}
                    >
                        Add New Sub Category
                    </Button>
                </div>
            </div>

            <div className="card my-4 pt-5 pb-5 px-5 shadow-md sm:rounded-lg bg-white">
                {context?.catData?.length !== 0 && (
                    <ul className="w-full">
                        {context?.catData?.map((firstLavelCat, index) => {
                            return (
                                <li className="w-full mb-1" key={index}>
                                    <div className='flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4'>
                                        <span className='font-[500] flex items-center gap-4 text-[14px]'>
                                            {firstLavelCat?.name}
                                        </span>
                                        <Button
                                            onClick={() => expend(index)}
                                            className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto">
                                            <FaAngleDown />
                                        </Button>
                                    </div>
                                    {
                                        isOpen === index && firstLavelCat?.children?.length !== 0 && (
                                            <ul className='w-full'>
                                                {firstLavelCat?.children?.map(((subCat, index_) => {
                                                    return (
                                                        <li className='w-full py-1' key={index_}>
                                                            <EditSubCategoryBox
                                                                name={subCat?.name}
                                                                id={subCat?._id}
                                                                index={index_}
                                                                level={0}
                                                                selectedCat={subCat?.parentId}
                                                                catData={context?.catData}
                                                                selectedCatName={subCat?.parentCatName}
                                                            />
                                                            {subCat?.children?.length !== 0 && (
                                                                <ul className="pl-4">
                                                                    {subCat?.children?.map((thirdLevel, index_) => {
                                                                        return (
                                                                            <li
                                                                                key={index_}
                                                                                className="w-full hover:bg-[#f1f1f1]"
                                                                            >
                                                                                <EditSubCategoryBox
                                                                                    name={thirdLevel?.name}
                                                                                    catData={firstLavelCat?.children}
                                                                                    index={index_}
                                                                                    level={1}
                                                                                    selectedCat={thirdLevel?.parentId}
                                                                                    selectedCatName={thirdLevel?.parentCatName}
                                                                                    id={thirdLevel?._id}
                                                                                />
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            )}
                                                        </li>
                                                    )
                                                }))}
                                            </ul>
                                        )
                                    }
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </>
    );
};

export default SubCategory;