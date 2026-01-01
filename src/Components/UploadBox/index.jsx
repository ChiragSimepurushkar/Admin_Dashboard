import React, { useState } from 'react';
import { FaRegImages } from 'react-icons/fa6';
import { uploadImages } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';

const UploadBox = (props) => {
  const [uploading, setUploading] = useState(false);

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      const files = Array.from(e.target.files);
      if (!files.length) return;

      const formData = new FormData();
      setUploading(true);

      // Use props.name for the field name, default to "images" if not provided
      const fieldName = props.name || "images";

      for (const file of files) {
        if (
          file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === "image/png" ||
          file.type === "image/webp"
        ) {
          // Use the fieldName variable instead of hardcoded "images"
          formData.append(fieldName, file);
        } else {
          setUploading(false);
          alert("Please select JPG, PNG or WEBP images only");
          return;
        }
      }

      const res = await uploadImages(apiEndPoint, formData);
      setUploading(false);

      if (res?.data?.images) {
        props.setPreviewsFun(res.data.images);
      }

    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
      alert("Failed to upload images. Please try again.");
    }
  };

  return (
    <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] md:h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
      {
        uploading === true ? (
          <>
            <CircularProgress /> 
            <h4 className='text-center mt-2'>Uploading...</h4>
          </>
        ) : (
          <>
            <FaRegImages className="text-[40px] opacity-35 pointer-events-none" />
            <h4 className="text-[14px] pointer-events-none">
              Image Upload
            </h4>

            <input
              type="file"
              accept="image/*"
              multiple={props?.multiple !== undefined ? props?.multiple : false}
              name={props?.name}
              onChange={(e) => onChangeFile(e, props.url)}
              className="absolute top-0 left-0 w-full h-full z-50 opacity-0 cursor-pointer"
            />
          </>
        )
      }
    </div>
  );
};

export default UploadBox;