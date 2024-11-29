// // import React from 'react';
// // import { useForm } from 'react-hook-form';
// // import Sidebar from "../sidebar";

// // const AddMenu = () => {
// //     const {
// //         register,
// //         handleSubmit,
// //         formState: { errors }
// //     } = useForm();

// //     const onSubmit = (data) => {
// //         console.log(data);
// //     };

// //     return (
// //         <>
// //             <Sidebar />
// //             <div className="addmenu-form-container">
// //                 <h1 className="addmenu-form-title">Add New Dish to Menu</h1>

// //                 <form onSubmit={handleSubmit(onSubmit)} className="form-container">
// //                     <div className="file-upload-container">
// //                         <div className="upload-box">
// //                             <div className="upload-header">
// //                                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                                     <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
// //                                         stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
// //                                 </svg>
// //                                 <p>Browse File to upload!</p>
// //                             </div>
// //                             <label htmlFor="file" className="upload-footer">
// //                                 <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
// //                                     <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
// //                                     <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
// //                                 </svg>
// //                                 <p>No file selected</p>
// //                                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                                     <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
// //                                         stroke="#000000" strokeWidth="2"></path>
// //                                     <path d="M19.5 5H4.5" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path>
// //                                     <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" strokeWidth="2"></path>
// //                                 </svg>
// //                             </label>
// //                             <input id="file" type="file" {...register('file', { required: 'This field is required' })} />
// //                             {errors.file && <span className="error-msg">{errors.file.message}</span>}
// //                         </div>
// //                     </div>

// //                     <div className="addmenu-text-containers">
// //                         {/* Dish Category */}
// //                         <div className='dishCategory'>
// //                             <label htmlFor="dishCategory">Dish Category *</label>
// //                             <select
// //                                 id="dishCategory"
// //                                 {...register('dishCategory', { required: 'This field is required' })}
// //                             >
// //                                 <option value=""></option>
// //                                 <option value="Starters">Starters</option>
// //                                 <option value="Main Course">Main Course</option>
// //                                 <option value="Beverages">Beverages</option>
// //                                 <option value="Desserts">Desserts</option>
// //                             </select>
// //                             {errors.dishCategory && <span className="error-msg">{errors.dishCategory.message}</span>}
// //                         </div>

// //                         {/* Name of Dish */}
// //                         <div className="dishName">
// //                             <label htmlFor="dishName">Name of Dish *</label>
// //                             <input
// //                                 type="text"
// //                                 id="dishName"
// //                                 {...register('dishName', { required: 'This field is required' })}
// //                                 placeholder="Enter the dish name"
// //                             />
// //                             {errors.dishName && <span className="error-msg">{errors.dishName.message}</span>}
// //                         </div>


// //                         {/* Price and Discount Price */}
// //                         <div>
// //                             <label htmlFor="price">Price (INR) *</label>
// //                             <input
// //                                 type="number"
// //                                 id="price"
// //                                 {...register('price', { required: 'This field is required' })}
// //                                 placeholder="₹"
// //                             />
// //                             {errors.price && <span className="error-msg">{errors.price.message}</span>}
// //                         </div>

// //                         <div>
// //                             <label htmlFor="discountPrice">Discount Price (If Applicable)</label>
// //                             <input
// //                                 type="number"
// //                                 id="discountPrice"
// //                                 {...register('discountPrice')}
// //                                 placeholder="₹"
// //                             />
// //                         </div>

// //                         {/* Short Description */}
// //                         <div className='shortDescription'>
// //                             <label htmlFor="shortDescription">Short Description *</label>
// //                             <textarea
// //                                 id="shortDescription"
// //                                 {...register('shortDescription', { required: 'This field is required' })}
// //                                 placeholder="Enter the description"
// //                             />
// //                             {errors.shortDescription && <span className="error-msg">{errors.shortDescription.message}</span>}
// //                         </div>

// //                         {/* Customizations */}
// //                         <div className='customizations'>
// //                             <label htmlFor="customizations">Customizations</label>
// //                             <input
// //                                 type="text"
// //                                 id="customizations"
// //                                 {...register('customizations')}
// //                                 placeholder="e.g. extra cheese"
// //                             />
// //                         </div>

// //                         {/* Buttons */}
// //                         <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
// //                             <button type="button" className="delete-dish">
// //                                 Delete
// //                             </button>
// //                             <button type="submit" className="add-dish">
// //                                 Add Dish
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </form>
// //             </div>
// //         </>
// //     );
// // };

// // export default AddMenu;


// import React from 'react';
// import { useForm } from 'react-hook-form';
// import Sidebar from "../sidebar";
// import axios from 'axios';

// const AddMenu = () => {
//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors }
//     } = useForm();

//     const handleAddDish = async (data) => {
//         try {
//             const { dish_image, dish_name, dish_description, dish_cost } = data;
    
//             // Get the token from localStorage
//             const token = localStorage.getItem('token');
//             console.log('Token being sent:', token);
//             console.log(data);
    
//             // Check if token exists
//             if (!token) {
//                 alert('You are not logged in. Please log in first.');
//                 window.location.href = '/login';
//                 return; 
//             }
    
//             // Update category_id
//             const category_id = parseInt(data.category_id, 10);
//             console.log('Updated Category ID:', category_id, 'Type:', typeof category_id);
    
//             // Update the data object with the new category_id
//             const updatedData = {
//                 ...data,  // Spread existing data
//                 category_id,  // Overwrite category_id with the updated value
//             };
    
//             console.log('Updated Data:', updatedData);
//             console.log(dish_image)
    
//             // Send the updated data in the request
//             const res = await axios.post('http://localhost:3000/api/add-dish', updatedData, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//             });
    
//             if (res.status === 201) {
//                 alert('Dish added successfully!');
//             }
//         } catch (err) {
//             console.error('Error adding dish:', err);
//             alert('Error adding dish: ' + (err.response?.data?.message || 'Something went wrong'));
//         }
//     };
    

    

//     return (
//         <>
//             <Sidebar />
//             <div className="addmenu-form-container">
//                 <h1 className="addmenu-form-title">Add New Dish to Menu</h1>
//                 <form onSubmit={handleSubmit(handleAddDish)} className="form-container">
//                     {/* File Upload */}
//                     <div className="file-upload-container">
//                         <div className="upload-box">
//                             <div className="upload-header">
//                                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
//                                         stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                 </svg>
//                                 <p>Browse File to upload!</p>
//                             </div>
//                             <label htmlFor="file" className="upload-footer">
//                                 <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
//                                     <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
//                                 </svg>
//                                 <p>No file selected</p>
//                                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
//                                         stroke="#000000" strokeWidth="2"></path>
//                                     <path d="M19.5 5H4.5" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path>
//                                     <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" strokeWidth="2"></path>
//                                 </svg>
//                             </label>
//                             <input id="file" type="file" {...register('dish_image')} />
//                             {errors.file && <span className="error-msg">{errors.file.message}</span>}
//                         </div>
//                     </div>

//                     {/* Dish Details */}
//                     <div className="addmenu-text-containers">
//                         <div>
//                             <label htmlFor="dishName">Name of Dish *</label>
//                             <input
//                                 type="text"
//                                 id="dish_name"
//                                 {...register('dish_name', { required: 'This field is required' })}
//                                 placeholder="Enter the dish name"
//                             />
//                             {errors.dishName && <span className="error-msg">{errors.dishName.message}</span>}
//                         </div>
//                         <div>
//                             <label htmlFor="shortDescription">Short Description *</label>
//                             <textarea
//                                 id="dish_description"
//                                 {...register('dish_description', { required: 'This field is required' })}
//                                 placeholder="Enter the description"
//                             />
//                             {errors.shortDescription && <span className="error-msg">{errors.shortDescription.message}</span>}
//                         </div>
//                         <div>
//                             <label htmlFor="price">Price (INR) *</label>
//                             <input
//                                 type="number"
//                                 id="dish_cost"
//                                 {...register('dish_cost', { required: 'This field is required' })}
//                                 placeholder="₹"
//                             />
//                             {errors.price && <span className="error-msg">{errors.price.message}</span>}
//                         </div>
//                         <div>
//                             <label htmlFor="dishCategory">Dish Category *</label>
//                             <select id="category_id" {...register('category_id', { required: 'This field is required' })}>
//                                 <option value=""></option>
//                                 <option value="2">Starters</option>
//                                 <option value="3">Main Course</option>
//                                 <option value="4">Beverages</option>
//                                 <option value="5">Desserts</option>
//                             </select>
//                             {errors.dishCategory && <span className="error-msg">{errors.dishCategory.message}</span>}
//                         </div>



//                         {/* <div>
//                             <label htmlFor="discountPrice">Discount Price (If Applicable)</label>
//                             <input
//                                 type="number"
//                                 id="discountPrice"
//                                 {...register('discountPrice')}
//                                 placeholder="₹"
//                             />
//                         </div> */}


//                         {/* <div>
//                             <label htmlFor="customizations">Customizations</label>
//                             <input
//                                 type="text"
//                                 id="customizations"
//                                 {...register('customizations')}
//                                 placeholder="e.g., extra cheese"
//                             />
//                         </div> */}

//                         {/* Buttons */}
//                         <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
//                             <button type="button" className="delete-dish">
//                                 Delete
//                             </button>
//                             <button type="submit" className="add-dish">
//                                 Add Dish
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default AddMenu;


import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../sidebar";

const AddMenu = () => {
  const [dishName, setDishName] = useState("");
  const [dishDescription, setDishDescription] = useState("");
  const [dishCost, setDishCost] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);

  // Hardcoded JWT Token
//   const jwtToken =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN0YXVyYW50SWQiOjE3LCJlbWFpbCI6InJAZy5pbiIsImlhdCI6MTczMjY0MjA2OSwiZXhwIjoxNzMyNjQ1NjY5fQ.ex_6m55H2BG6Qcbs0VjdGuajYgdA1qMesNo6BdMUQp8";

  // Upload a new dish
  const handleAddDish = async () => {
    const token = localStorage.getItem('token');
    if (!dishName || !dishCost) {
      alert("Dish name and cost are required!");
      return;
    }

    const formData = new FormData();
    formData.append("dish_name", dishName);
    formData.append("dish_description", dishDescription);
    formData.append("dish_cost", dishCost);
    formData.append("category_id", categoryId);
    if (image) {
      formData.append("image", image);
    }
    console.log(formData)

    try {
      const response = await axios.post(
        "http://localhost:3000/api/add-dish",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Dish added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error adding dish:",
        error.response?.data || error.message
      );
      alert("Failed to add the dish.");
    }
  };

  return (
    <>
    <Sidebar />
    <div className="addmenu-form-container">
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Dish Management</h1>

      {/* Upload Section */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Add New Dish</h2>
        <label>
          Dish Name:
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            required
            />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={dishDescription}
            onChange={(e) => setDishDescription(e.target.value)}
            />
        </label>
        <br />
        <label>
          Cost:
          <input
            type="number"
            value={dishCost}
            onChange={(e) => setDishCost(e.target.value)}
            required
            />
        </label>
        <br />
        <label>
          Category ID:
          <input
            type="text"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            />
        </label>
        <br />
        <label>
          Dish Image:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          
        </label>
        <br />
        <button onClick={handleAddDish} style={{ padding: "5px 10px" }}>
          Add Dish
        </button>
      </div>
    </div>
    </div>
            </>
  );
};


export default AddMenu