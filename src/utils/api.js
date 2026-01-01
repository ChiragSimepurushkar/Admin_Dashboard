// import axios from "axios";
// const apiUrl = import.meta.env.VITE_API_URL;
// export const postData = async (url, formData) => {
//     try {
//         const response = await axios.post(
//             apiUrl + url,
//             formData,
//             {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem("accesstoken")}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );
//         return response.data;

//     } catch (error) {
//         console.error("Error posting data:", error);

//         // IMPORTANT: Return the error response data from backend
//         if (error.response && error.response.data) {
//             return error.response.data;  // This contains { error: true, message: "Invalid OTP" }
//         }

//         return {
//             error: true,
//             success: false,
//             message: error.message || "Network error occurred"
//         };
//     }
// }

// export const fetchDataFromApi = async (url) => {
//     try {
//         const token = localStorage.getItem("accesstoken");

//         const response = await axios.get(`${apiUrl}${url}`, {
//             headers: {
//                 ...(token && { Authorization: `Bearer ${token}` }),
//                 'Content-Type': 'application/json',
//             },
//         });

//         return response.data;

//     } catch (error) {
//         console.error("Fetch API error:", error);

//         return error.response?.data || {
//             error: true,
//             success: false,
//             message: error.message || "Network error occurred",
//         };
//     }
// };


// export const uploadImage = async (url, updatedData) => {
//     try {
//         const params = {
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
//                 'Content-Type': 'multipart/form-data',
//             },
//         };
//         var response;
//         // Making the PUT request using Axios
//         await axios.put(apiUrl + url, updatedData, params).then((data) => {
//             response = data;
//         })
//         return response;

//     } catch (error) {
//         console.error("Error editing profile image:", error);

//         // Standardized error response handling (as seen in your other utilities)
//         if (error.response && error.response.data) {
//             return error.response.data;
//         }

//         return {
//             message: error.message || "Network error occurred",
//             error: true,
//             success: false
//         };
//     }
// };

// export const uploadImages = async (url, formData) => {
//     try {
//         const params = {
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
//                 'Content-Type': 'multipart/form-data',
//             },
//         };
//         var response;
//         // Making the PUT request using Axios
//         await axios.post(apiUrl + url, formData, params).then((data) => {
//             response = data;
//         })
//         return response;

//     } catch (error) {
//         console.error("Error editing category image:", error);

//         // Standardized error response handling (as seen in your other utilities)
//         if (error.response && error.response.data) {
//             return error.response.data;
//         }

//         return {
//             message: error.message || "Network error occurred",
//             error: true,
//             success: false
//         };
//     }
// };

// export const editData = async (url, updatedData) => {
//     try {
//         const response = await axios.put(
//             apiUrl + url,
//             updatedData,
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );

//         return response.data;

//     } catch (error) {
//         console.error("Error editing data:", error);

//         return error.response?.data || {
//             error: true,
//             success: false,
//             message: error.message || "Network error occurred",
//         };
//     }
// };


// export const deleteImages = async (url, image) => {
//     try {
//         const response = await axios.delete(apiUrl + url, {
//             params: { img: image },
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error deleting image:", error);
//         return error.response?.data || {
//             error: true,
//             success: false,
//             message: error.message,
//         };
//     }
// };

// export const deleteData = async (url) => {
//     const params = {
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
//             'Content-Type': 'application/json',
//         },
//     };
//     const { res } = await axios.delete(
//         apiUrl + url,
//         params
//     );
//     return res;
// };

import axiosInstance from './axiosInterceptor';

export const postData = async (url, formData) => {
    try {
        const response = await axiosInstance.post(
            url,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accesstoken")}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;

    } catch (error) {
        console.error("Error posting data:", error);

        // IMPORTANT: Return the error response data from backend
        if (error.response && error.response.data) {
            return error.response.data;
        }

        return {
            error: true,
            success: false,
            message: error.message || "Network error occurred"
        };
    }
}

export const fetchDataFromApi = async (url) => {
    try {
        const token = localStorage.getItem("accesstoken");

        const response = await axiosInstance.get(url, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
                'Content-Type': 'application/json',
            },
        });

        return response.data;

    } catch (error) {
        console.error("Fetch API error:", error);

        return error.response?.data || {
            error: true,
            success: false,
            message: error.message || "Network error occurred",
        };
    }
};

export const uploadImage = async (url, updatedData) => {
    try {
        const params = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                'Content-Type': 'multipart/form-data',
            },
        };
        var response;
        await axiosInstance.put(url, updatedData, params).then((data) => {
            response = data;
        })
        return response;

    } catch (error) {
        console.error("Error editing profile image:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        }

        return {
            message: error.message || "Network error occurred",
            error: true,
            success: false
        };
    }
};

export const uploadImages = async (url, formData) => {
    try {
        const params = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                'Content-Type': 'multipart/form-data',
            },
        };
        var response;
        await axiosInstance.post(url, formData, params).then((data) => {
            response = data;
        })
        return response;

    } catch (error) {
        console.error("Error editing category image:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        }

        return {
            message: error.message || "Network error occurred",
            error: true,
            success: false
        };
    }
};

export const editData = async (url, updatedData) => {
    try {
        const response = await axiosInstance.put(
            url,
            updatedData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error("Error editing data:", error);

        return error.response?.data || {
            error: true,
            success: false,
            message: error.message || "Network error occurred",
        };
    }
};

export const deleteImages = async (url, image) => {
    try {
        const response = await axiosInstance.delete(url, {
            params: { img: image },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting image:", error);
        
        return error.response?.data || {
            error: true,
            success: false,
            message: error.message,
        };
    }
};

export const deleteData = async (url) => {
    try {
        const params = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                'Content-Type': 'application/json',
            },
        };
        const response = await axiosInstance.delete(url, params);
        return response.data;
    } catch (error) {
        console.error("Error deleting data:", error);
        
        return error.response?.data || {
            error: true,
            success: false,
            message: error.message || "Network error occurred",
        };
    }
};

export const deleteMultipleData = async (url, payload) => {
    try {
        const response = await axiosInstance.delete(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                'Content-Type': 'application/json',
            },
            data: payload.data // Important: axios DELETE requires data in this format
        });
        
        return response.data;
        
    } catch (error) {
        console.error("Error deleting multiple items:", error);
        
        return error.response?.data || {
            error: true,
            success: false,
            message: error.message || "Network error occurred",
        };
    }
};
