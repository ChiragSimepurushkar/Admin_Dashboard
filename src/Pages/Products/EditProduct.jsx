import React, { useContext, useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import UploadBox from '../../Components/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from 'react-icons/io';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { deleteImages, editData, fetchDataFromApi } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const EditProduct = () => {
    const context = useContext(MyContext);
    const history = useNavigate();
    if (context.isLoadingCategories) {
        return (
            <section className="p-5 flex items-center justify-center h-screen">
                <CircularProgress />
                <p className="ml-3">Loading categories...</p>
            </section>
        );
    }

    const [formFields, setFormFields] = useState({
        name: "",
        description: "",
        images: [],
        brand: "",
        price: "",
        oldPrice: "",
        category: "",
        catName: "",
        catId: "",
        subCatId: "",
        subCat: "",
        thirdsubCat: "",
        thirdsubCatId: "",
        countInStock: "",
        rating: "",
        isFeatured: false,
        discount: "",
        productRam: [],
        size: [],
        productWeight: [],
        bannerTitlename: '',
        bannerimages: []
    });
    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productFeatured, setProductFeatured] = useState('');
    const [productThirdLavelCat, setProductThirdLavelCat] = useState('');
    const [productRams, setProductRams] = useState([]);
    const [productWeight, setProductWeight] = useState([]);
    const [productSize, setProductSize] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [productRamsData, setProductRamsData] = useState([]);
    const [productWeightData, setProductWeightData] = useState([]);
    const [productSizeData, setProductSizeData] = useState([]);
    const [bannerPreviews, setBannerPreviews] = useState([]);
    const [checkedSwitch, setCheckedSwitch] = useState(false);
    useEffect(() => {
        fetchDataFromApi("/api/product/productRAMS").then((res) => {
            if (res?.error === false) {
                setProductRamsData(res?.data);
            }
        })
        fetchDataFromApi("/api/product/productWeight").then((res) => {
            if (res?.error === false) {
                setProductWeightData(res?.data);
            }
        })
        fetchDataFromApi("/api/product/productSize").then((res) => {
            if (res?.error === false) {
                setProductSizeData(res?.data);
            }
        })
        fetchDataFromApi(`/api/product/${context?.isOpenFullScreenPanel?.id}`).then((res) => {
            setFormFields({
                name: res?.product?.name,
                description: res?.product?.description,
                images: res?.product?.images,
                brand: res?.product?.brand,
                price: res?.product?.price,
                oldPrice: res?.product?.oldPrice,
                category: res?.product?.category,
                catName: res?.product?.catName,
                catID: res?.product?.catID,
                subCatId: res?.product?.subCatId,
                subCat: res?.product?.subCat,
                thirdsubCat: res?.product?.thirdsubCat,
                thirdsubCatId: res?.product?.thirdsubCatId,
                countInStock: res?.product?.countInStock,
                rating: res?.product?.rating,
                isFeatured: res?.product?.isFeatured,
                discount: res?.product?.discount,
                productRam: res?.product?.productRam,
                size: res?.product?.size,
                productWeight: res?.product?.productWeight,
                bannerimages: res?.product?.bannerimages,
                bannerTitlename: res?.product?.bannerTitlename,
                isDisplayOnHomeBanner: res?.product?.isDisplayOnHomeBanner,

            })
            setProductCat(res?.product?.catId);
            setProductSubCat(res?.product?.subCatId);
            setProductThirdLavelCat(res?.product?.thirdsubCatId);
            setProductFeatured(res?.product?.isFeatured)
            setProductRams(res?.product?.productRam)
            setProductSize(res?.product?.size)
            setProductWeight(res?.product?.productWeight)
            setPreviews(res?.product?.images)
            setBannerPreviews(res?.product?.bannerimages)
            setCheckedSwitch(res?.product?.isDisplayOnHomeBanner)
        });
    }, []);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value,
            };
        });
    }
    const selectCatByName = (catName) => {
        formFields.catName = catName;
    };

    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        formFields.catId = event.target.value
        formFields.category = event.target.value
    };

    const handleChangeProductSubCat = (event) => {
        setProductSubCat(event.target.value)
        formFields.subCatId = event.target.value

    };
    const selectSubCatByName = (name) => {
        formFields.subCat = name;
    };
    const handleChangeProductThirdLavelCat = (event) => {
        setProductThirdLavelCat(event.target.value)
        formFields.thirdsubCatId = event.target.value

    };
    const selectSubCatByThirdLavel = (name) => {
        formFields.thirdsubCat = name;
    };

    const handleChangeProductFeatured = (event) => {
        setProductFeatured(event.target.value);
        formFields.isFeatured = event.target.value
    };

    const handleChangeProductRams = (event) => {
        const {
            target: { value },
        } = event;
        setProductRams(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );

        formFields.productRam = value;
    };

    const handleChangeProductWeight = (event) => {
        const {
            target: { value },
        } = event;
        setProductWeight(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
        formFields.productWeight = value;
    };

    const handleChangeProductSize = (event) => {
        const {
            target: { value },
        } = event;
        setProductSize(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
        formFields.size = value;
    };
    const onChangeRating = (e) => {
        setFormFields((formFields) => (
            {
                ...formFields,
                rating: e.target.value
            }
        ))
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formFields?.name === "") {
            context.openAlertBox("error", "Please enter the product name.");
            return false;
        }

        if (formFields?.description === "") {
            context.openAlertBox("error", "Please enter the product description.");
            return false;
        }
        if (formFields?.catId === "") {
            context.openAlertBox("error", "Please select the main product category.");
            return false;

        }
        if (formFields?.category === "") {
            context.openAlertBox("error", "Please select the main product category.");
            return false;

        }

        if (formFields?.price === "" || formFields?.price <= 0) {
            // Also checking if price is a valid positive number
            context.openAlertBox("error", "Please enter a valid product price.");
            return false;
        }
        if (formFields?.oldPrice === "" || formFields?.oldPrice <= 0) {
            // Also checking if price is a valid positive number
            context.openAlertBox("error", "Please enter a valid Old product price.");
            return false;
        }
        if (formFields?.countInStock === "" || formFields?.countInStock < 0) {
            context.openAlertBox("error", "Please enter the count in stock (must be 0 or greater).");
            return false;
        }
        if (formFields?.brand === "") {
            context.openAlertBox("error", "Please enter the product brand.");
            return false;
        }

        if (formFields?.discount === "" || formFields?.discount < 0 || formFields?.discount > 100) {
            context.openAlertBox("error", "Please enter a valid discount percentage (0 to 100).");
            return false;
        }
        if (formFields?.rating === "" || formFields?.rating < 0 || formFields?.rating > 5) {
            context.openAlertBox("error", "Please enter a valid rating (0 to 5).");
            return false;
        }

        if (previews?.length === 0) {
            context.openAlertBox("error", "Please upload at least one product image.");
            return false;
        }

        console.log(formFields)
        setIsLoading(true);

        editData(`/api/product/updateProduct/${context?.isOpenFullScreenPanel?.id}`, formFields).then((res) => {
            console.log(res)
            if (res?.error === false) {
                context.openAlertBox("success", res?.message);
                setTimeout(() => {
                    setIsLoading(false);
                    context.setIsOpenFullScreenPanel({
                        open: false,
                    })
                    history("/products");
                }, 1000)
            } else {
                setIsLoading(false);
                context.openAlertBox("error", res?.message);
            }
        })
    }

    // const setPreviewsFun = (previewsArr) => {
    //     setPreviews(prev => [...prev, ...previewsArr]);
    //     formFields.images = [...formFields.images, ...previewsArr];
    // }
    // const removeImg = (image, index) => {
    //     var imageArr = [];
    //     imageArr = previews;
    //     deleteImages(`/api/category/deleteImage?img=${image}`).then((res) => {
    //         imageArr.splice(index, 1);
    //         setPreviews([]);
    //         setTimeout(() => {
    //             setPreviews(imageArr);
    //             formFields.images = imageArr
    //         }, 100)
    //     }).catch((error) => {
    //         console.error("Error:", error);

    //     });
    // }
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

    const setBannerImagesFunc = (previewsArr) => {
        setBannerPreviews(prev => {
            const updated = [...prev, ...previewsArr];

            setFormFields(prevFields => ({
                ...prevFields,
                bannerimages: updated
            }));

            return updated;
        });
    };

    const handleChangeSwitch = (event) => {
        setCheckedSwitch(event.target.checked)
        formFields.isDisplayOnHomeBanner = event.target.checked
    }


    const removeProductImg = (image, index) => {
        const updated = previews.filter((_, i) => i !== index);

        setPreviews(updated);
        setFormFields(prev => ({
            ...prev,
            images: updated
        }));

        deleteImages(`/api/product/deleteImage?img=${image}`);
    };
    const removeBannerImg = (image, index) => {
        const updated = [...bannerPreviews];
        updated.splice(index, 1);

        setBannerPreviews(updated);
        setFormFields(prev => ({
            ...prev,
            bannerimages: updated
        }));
        deleteImages(`/api/product/deleteImage?img=${image}`);

    };
    return (
        <section className="p-5">
            <form className="form md:p-8 md:py-3 py-1" onSubmit={handleSubmit}>
                <div className="scroll max-h-[72vh] pr-4 overflow-y-scroll">
                    <div className="grid grid-cols-1 mb-3">
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Name</h3>
                            <input
                                type="text"
                                name="name"
                                value={formFields.name}
                                onChange={onChangeInput}
                                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mb-3">
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Description</h3>
                            <textarea
                                name="description"
                                value={formFields.description}
                                onChange={onChangeInput}
                                type="text"
                                className="w-full h-[140px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mb-3 gap-4">
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Category</h3>
                            {
                                context?.catData?.length !== 0 &&
                                <Select
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
                                                    key={index}
                                                    onClick={() => selectCatByName(cat?.name)}>{cat?.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            }
                        </div>
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Sub Category</h3>
                            {
                                context?.catData?.length !== 0 &&
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
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
                                                            key={index}
                                                            onClick={() => selectSubCatByName(subCat?.name)}>
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
                            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Third Level Category</h3>
                            {
                                context?.catData?.length !== 0 &&
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
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
                                                                    onClick={() => selectSubCatByThirdLavel(thirdLavelCat?.name)}
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
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Price</h3>
                            <input
                                type="number"
                                name="price"
                                value={formFields.price}
                                onChange={onChangeInput}
                                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                            />
                        </div>
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Old Price</h3>
                            <input
                                name="oldPrice"
                                value={formFields.oldPrice}
                                onChange={onChangeInput}
                                type="number"
                                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                            />
                        </div>
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1 text-black">Is Featured?</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size="small"
                                className='w-full'
                                value={productFeatured}
                                label="Category"
                                onChange={handleChangeProductFeatured}
                            >
                                <MenuItem value={false}>False</MenuItem>
                                <MenuItem value={true}>True</MenuItem>
                            </Select>
                        </div>

                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Stock</h3>
                            <input
                                name="countInStock"
                                value={formFields.countInStock}
                                onChange={onChangeInput}
                                type="number"
                                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                            />
                        </div>
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Brand</h3>
                            <input
                                name="brand"
                                value={formFields.brand}
                                onChange={onChangeInput}
                                type="text"
                                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                            />
                        </div>
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Discount</h3>
                            <input
                                name="discount"
                                value={formFields.discount}
                                onChange={onChangeInput}
                                type="number"
                                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                            />
                        </div>
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1 text-black">Product RAM</h3>
                            {
                                productRamsData?.length !== 0 &&
                                <Select
                                    multiple
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    size="small"
                                    className='w-full'
                                    value={productRams}
                                    label="ram"
                                    onChange={handleChangeProductRams}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        productRamsData?.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item?.name}>{item?.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            }
                        </div>
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Weight</h3>
                            {
                                productWeightData?.length !== 0 &&
                                <Select
                                    multiple
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    size="small"
                                    className='w-full'
                                    value={productWeight}
                                    label="Weight"
                                    onChange={handleChangeProductWeight}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        productWeightData?.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item?.name}>{item?.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            }
                        </div>
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Size</h3>
                            {
                                productSizeData?.length !== 0 &&
                                <Select
                                    multiple
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    size="small"
                                    className='w-full'
                                    value={productSize}
                                    label="size"
                                    onChange={handleChangeProductSize}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        productSizeData?.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item?.name}>{item?.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            }
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1 mb-3 gap-4">

                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1 text-black">Product Rating</h3>
                            <Rating name="rating" value={formFields.rating}
                                onChange={onChangeRating} />
                        </div>
                    </div>
                    <div className="col w-full p-5 px-0">
                        <h3 className="font-[700] text-[18px] mb-3">Media & Images</h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {
                                previews?.length !== 0 && previews?.map((image, index) => {
                                    return (
                                        <div className="uploadBoxWrapper relative" key={index}>
                                            <span className="absolute w-[20px] h-[20px] 
                                        rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex 
                                        items-center justify-center z-50 cursor-pointer"
                                                onClick={() => {
                                                    removeProductImg(image, index)
                                                }}>
                                                <IoMdClose className="text-white text-[17px]" />
                                            </span>
                                            <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                                                <img src={image} className="w-100" />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <UploadBox multiple={true} name="images"
                                url="/api/product/uploadImages"
                                setPreviewsFun={setPreviewsFun} />
                        </div>
                    </div>

                    <div className="col w-full p-5 px-0">

                        <div className="shadow-mg bg-white p-4 w-full">
                            <div className="flex items-center gap-8">
                                <h3 className="font-[700] text-[18px] mb-3">Banner Images</h3>
                                <Switch {...label} onChange={handleChangeSwitch} checked={checkedSwitch} />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                {
                                    bannerPreviews?.length !== 0 && bannerPreviews?.map((image, index) => {
                                        return (
                                            <div className="uploadBoxWrapper relative" key={index}>
                                                <span className="absolute w-[20px] h-[20px] 
                                                            rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex 
                                                            items-center justify-center z-50 cursor-pointer"
                                                    onClick={() => {
                                                        removeBannerImg(image, index)
                                                    }}>
                                                    <IoMdClose className="text-white text-[17px]" />
                                                </span>
                                                <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                                                    <img src={image} className="w-100" />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <UploadBox multiple={true} name="bannerimages"
                                    url="/api/product/uploadBannerImages"
                                    setPreviewsFun={setBannerImagesFunc} />
                            </div>

                            <h3 className="font-[700] text-[18px] mt-3 mb-3">Banner Title</h3>
                            <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                                name="bannerTitlename"
                                value={formFields.bannerTitlename} onChange={onChangeInput} />
                        </div>
                    </div>

                </div>
                <hr className='text-[rgba(0,0,0,0.1)]' />
                <br />
                <Button type="submit" className="btn-blue btn-lg w-full flex gap-4">
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
        </section>
    )
}

export default EditProduct;