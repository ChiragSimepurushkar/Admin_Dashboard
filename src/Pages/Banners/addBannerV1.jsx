import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../App';
import UploadBox from '../../Components/UploadBox';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Button from '@mui/material/Button';
import { IoMdClose } from 'react-icons/io';
import { deleteImages, postData } from '../../utils/api';

export const AddBannerV1 = () => {
    const [productCat, setProductCat] = useState('');
    const [previews, setPreviews] = useState([]);
    const [alignInfo, setAlignInfo] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productThirdLavelCat, setProductThirdLavelCat] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const history = useNavigate();

    const [formFields, setFormFields] = useState({
        catId: '',
        bannerTitlename: '',
        thirdsubCatId: '',
        subCatId: '',
        price: '',
        images: [],
        alignInfo: ''
    });


    const context = useContext(MyContext)

    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        setFormFields(prev => ({
            ...prev,
            catId: event.target.value
        }));
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value,
            };
        });
    }
    const setPreviewsFun = (previewsArr) => {
        setPreviews(prev => {
            const updated = [...prev, ...previewsArr];

            setFormFields(prevFields => ({
                ...prevFields,
                images: updated
            }));

            return updated;
        });
    };
    const removeBannerImg = (image, index) => {
        const updated = [...previews];
        updated.splice(index, 1);

        setPreviews(updated);
        setFormFields(prev => ({
            ...prev,
            images: updated
        }));
        deleteImages(`/api/bannerV1/deleteImage?img=${image}`);

    };

    const handleChangeProductSubCat = (event) => {
        setProductSubCat(event.target.value);
        setFormFields(prev => ({
            ...prev,
            subCatId: event.target.value
        }));
    };


    const handleChangeProductThirdLavelCat = (event) => {
        setProductThirdLavelCat(event.target.value);
        setFormFields(prev => ({
            ...prev,
            thirdsubCatId: event.target.value
        }));
    };
    const handleChangeAlginInfo = (event) => {
        setAlignInfo(event.target.value)
        formFields.alignInfo = event.target.value
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (formFields.bannerTitlename === "") {
            context.openAlertBox("error", "Please enter Banner title name");
            setIsLoading(false);
            return false;
        }
        if (formFields.catId === "") {
            context.openAlertBox("error", "Please select Category");
            setIsLoading(false);
            return false;
        }
        //     if (formFields.subCatId === "") {
        //     context.openAlertBox("error", "Please select Sub Category");
        //     setIsLoading(false);
        //     return false;
        // }
        //     if (formFields.thirdsubCatId === "") {
        //     context.openAlertBox("error", "Please select Third level Category");
        //     setIsLoading(false);
        //     return false;
        // }
        //   if (formFields.price === "") {
        //     context.openAlertBox("error", "Please enter price ");
        //     setIsLoading(false);
        //     return false;
        // }

        if (previews?.length === 0) {
            context.openAlertBox("error", "Please select Banner image");
            setIsLoading(false);
            return false;
        }
        postData("/api/bannerV1/add", formFields)
            .then((res) => {
                // console.log(res);
                setTimeout(() => {
                    setIsLoading(false);
                    context.setIsOpenFullScreenPanel({
                        open: false,

                    })
                    context?.getCat();
                    window.location.href = "/bannerV1/list";
                }, 1500)
            });
    };


    return (
        <section className='p-2 md:p-5 bg-gray-50'>
        <form className='form py-3 p-4 md:p-8 bg-white shadow-sm rounded-md' onSubmit={handleSubmit}>
            <div className="scroll max-h-[70vh] md:max-h-[72vh] overflow-y-auto pr-2 md:pr-4 pt-4">
                
                {/* Responsive Input Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 mb-3 gap-4 md:gap-5">
                    <div className="col">
                        <h3 className="text-[14px] md:text-[16px] font-[500] mb-1 text-black">Banner Title</h3>
                        <input
                            type="text"
                            className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-blue-400 rounded-sm p-3 text-sm"
                            name="bannerTitlename"
                            value={formFields.bannerTitlename}
                            onChange={onChangeInput}
                        />
                    </div>
                    
                    <div className="col">
                        <h3 className="text-[14px] md:text-[16px] font-[500] mb-1 text-black">Category</h3>
                        {context?.catData?.length !== 0 && (
                            <Select
                                size="small"
                                className='w-full'
                                value={productCat}
                                onChange={handleChangeProductCat}
                            >
                                {context?.catData?.map((cat, index) => (
                                    <MenuItem key={index} value={cat?._id}>{cat?.name}</MenuItem>
                                ))}
                            </Select>
                        )}
                    </div>

                    <div className="col">
                        <h3 className="text-[14px] md:text-[16px] font-[500] mb-1 text-black">Product Sub Category</h3>
                        <Select
                            size="small"
                            className='w-full'
                            value={productSubCat}
                            onChange={handleChangeProductSubCat}
                        >
                            {context?.catData?.map((cat) => (
                                cat?.children?.map((subCat, index) => (
                                    <MenuItem value={subCat?._id} key={index}>{subCat?.name}</MenuItem>
                                ))
                            ))}
                        </Select>
                    </div>

                    <div className="col">
                        <h3 className="text-[14px] md:text-[16px] font-[500] mb-1 text-black">Product Third Level Category</h3>
                        <Select
                            size="small"
                            className='w-full'
                            value={productThirdLavelCat}
                            onChange={handleChangeProductThirdLavelCat}
                        >
                            {context?.catData?.map((cat) => (
                                cat?.children?.map((subCat) => (
                                    subCat?.children?.map((thirdLavelCat, index) => (
                                        <MenuItem key={index} value={thirdLavelCat?._id}>{thirdLavelCat?.name}</MenuItem>
                                    ))
                                ))
                            ))}
                        </Select>
                    </div>

                    <div className="col">
                        <h3 className="text-[14px] md:text-[16px] font-[500] mb-1 text-black">Product Price</h3>
                        <input
                            type="number"
                            name="price"
                            value={formFields.price}
                            onChange={onChangeInput}
                            className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-blue-400 rounded-sm p-3 text-sm"
                        />
                    </div>

                    <div className="col">
                        <h3 className="text-[14px] md:text-[16px] font-[500] mb-1 text-black">Alignment of Information</h3>
                        <Select
                            size="small"
                            className='w-full'
                            value={alignInfo}
                            onChange={handleChangeAlginInfo}
                        >
                            <MenuItem value={'left'}>Left</MenuItem>
                            <MenuItem value={'right'}>Right</MenuItem>
                        </Select>
                    </div>
                </div>

                <br />
                <h3 className="text-[16px] font-[500] mb-3 text-black border-b pb-2">Image Upload</h3>
                
                {/* Adaptive Image Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {previews?.length !== 0 && previews?.map((image, index) => (
                        <div className="uploadBoxWrapper relative" key={index}>
                            <span className="absolute w-[22px] h-[22px] rounded-full bg-red-700 -top-2 -right-2 flex items-center justify-center z-50 cursor-pointer shadow-md"
                                onClick={() => removeBannerImg(image, index)}>
                                <IoMdClose className="text-white text-[17px]" />
                            </span>
                            <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-gray-300 h-[120px] md:h-[150px] w-full bg-gray-100 flex items-center justify-center relative">
                                <img src={image} className="w-full h-full object-cover" alt="preview" />
                            </div>
                        </div>
                    ))}
                    <UploadBox multiple={true} name="images"
                        url="/api/bannerV1/uploadImages"
                        setPreviewsFun={setPreviewsFun} />
                </div>
            </div>

            {/* Responsive Submit Button */}
            <div className="mt-8 w-full sm:w-[280px]">
                <Button type="submit" className="btn-blue btn-lg w-full flex items-center justify-center gap-4 py-3">
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : (
                        <>
                            <FaCloudUploadAlt className="text-[25px] text-white" />
                            <span className="whitespace-nowrap">Publish and View</span>
                        </>
                    )}
                </Button>
            </div>
        </form>
    </section>
    )
}