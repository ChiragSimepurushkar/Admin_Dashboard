import React, { useContext, useState } from 'react'
import UploadBox from '../../Components/UploadBox';
import { IoMdClose } from 'react-icons/io';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { deleteImages, editData, fetchDataFromApi, postData } from '../../utils/api';
import { MyContext } from '../../App';
import Editor from 'react-simple-wysiwyg';
import { useEffect } from 'react';
const EditBlog = () => {
    const context = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(false);

    const [formFields, setFormFields] = useState({
        title: "",
        description: "",
        images: [],
    });
    useEffect(() => {
        const id = context?.isOpenFullScreenPanel?.id;

        fetchDataFromApi(`/api/blog/${id}`).then((res) => {
            formFields.title = res?.blog?.title
            formFields.description = res?.blog?.description
            setPreviews(res?.blog?.images)
            formFields.images = res?.blog?.images
            setHtml(res?.blog?.description)
        });
    }, [context?.isOpenFullScreenPanel]);

    const [html, setHtml] = useState('');
    const [previews, setPreviews] = useState([]);
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value,
            };
        });
    }
    const onChangeDescription = (e) => {
        setHtml(e.target.value);
        formFields.description = e.target.value;
    };
    const setPreviewsFun = (previewsArr) => {
        setPreviews(prev => [...prev, ...previewsArr]);
        formFields.images = [...formFields.images, ...previewsArr];
    }
    const removeImg = (image, index) => {
        var imageArr = [];
        imageArr = previews;
        deleteImages(`/api/blog/deleteImage?img=${image}`).then((res) => {
            imageArr.splice(index, 1);
            setPreviews([]);
            setTimeout(() => {
                setPreviews(imageArr);
                formFields.images = imageArr
            }, 100)
        }).catch((error) => {
            console.error("Error:", error);

        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (formFields.title === "") {
            context.openAlertBox("error", "Please enter title");
            setIsLoading(false);
            return false;
        }
        if (formFields.description === "") {
            context.openAlertBox("error", "Please enter description");
            setIsLoading(false);
            return false;
        }

        if (previews?.length === 0) {
            context.openAlertBox("error", "Please select Blog image");
            setIsLoading(false);
            return false;
        }
        editData(`/api/blog/${context?.isOpenFullScreenPanel?.id}`, formFields)
            .then((res) => {
                // console.log(res);
                setTimeout(() => {
                    setIsLoading(false);
                    context.setIsOpenFullScreenPanel({
                        open: false,

                    })
                    context?.getCat();
                    window.location.href = "/blog/list";
                }, 1500)
            });
    };
    return (
        <section className="p-2 md:p-5 bg-gray-50">
            <form className="form py-3 p-4 md:p-8 bg-white shadow-sm rounded-md" onSubmit={handleSubmit}>
                <div className="scroll max-h-[70vh] md:max-h-[72vh] overflow-y-auto pr-2 md:pr-4 pt-4">

                    {/* Systematic Title Input */}
                    <div className="flex flex-col mb-4">
                        <h3 className="text-[14px] md:text-[16px] font-[500] mb-1 text-black">Title</h3>
                        <input
                            type="text"
                            className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-blue-400 rounded-sm p-3 text-sm"
                            name="title"
                            value={formFields.title}
                            onChange={onChangeInput}
                        />
                    </div>

                    {/* Systematic Description Editor */}
                    <div className="flex flex-col mb-6">
                        <h3 className="text-[14px] md:text-[16px] font-[500] mb-1 text-black">Description</h3>
                        <div className="border border-gray-200 rounded-sm overflow-hidden">
                            <Editor
                                containerProps={{ style: { resize: 'vertical', minHeight: '250px' } }}
                                value={html}
                                onChange={onChangeDescription}
                            />
                        </div>
                    </div>

                    <h3 className="text-[15px] md:text-[16px] font-[500] mb-3 text-black border-b pb-2">Blog Images</h3>

                    {/* Adaptive Image Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {previews?.map((image, index) => (
                            <div className="uploadBoxWrapper relative" key={index}>
                                <span
                                    className="absolute w-[22px] h-[22px] rounded-full bg-red-700 -top-2 -right-2 flex items-center justify-center z-50 cursor-pointer shadow-md transition-transform hover:scale-110"
                                    onClick={() => removeImg(image, index)}
                                >
                                    <IoMdClose className="text-white text-[17px]" />
                                </span>
                                <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-gray-300 h-[100px] sm:h-[120px] md:h-[150px] w-full bg-gray-100 flex items-center justify-center relative">
                                    <img src={image} className="w-full h-full object-cover" alt="preview" />
                                </div>
                            </div>
                        ))}
                        <UploadBox
                            multiple={true}
                            name="blogImages"
                            url="/api/blog/uploadImages"
                            setPreviewsFun={setPreviewsFun}
                        />
                    </div>
                </div>

                <div className="mt-8 w-full sm:w-[250px]">
                    <Button type="submit" className="btn-blue btn-lg w-full flex items-center justify-center gap-4 py-3">
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : (
                            <>
                                <FaCloudUploadAlt className="text-[25px] text-white" />
                                <span className="whitespace-nowrap uppercase tracking-wider">Update Blog</span>
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </section>
    );
}

export default EditBlog;