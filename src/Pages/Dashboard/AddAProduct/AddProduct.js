import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../../../contexts/AuthProvider';

const AddProduct = () => {
    const { register, handleSubmit } = useForm();
    const {user} = useContext(AuthContext);
    const navigate = useNavigate()

    const onSubmit = (data) => {
        const imageHostKey = process.env.REACT_APP_imgbbKey
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image)

        fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
            method: "POST",
            body: formData
        })
        .then((res) => res.json())
        .then((imgData) => {
            if(imgData.success){
                let categoryId = "";
                if (data.name.toLowerCase().includes("samsung")) {
                    categoryId = "1"
                } else if (data.name.toLowerCase().includes("oppo")) {
                    categoryId = "2"
                } else if (data.name.toLowerCase().includes("iphone")) {
                    categoryId = "3"
                } else if (data.name.toLowerCase().includes("huawei")) {
                    categoryId = "4"
                }else{
                    return swal("Sorry", "Your brand is not allowed. Try with Apple Samsung Oppo and Huawei", "warning");
                }

                const name = data.name
                const img = imgData.data.url
                const location = data.location
                const originalPrice = data.originalPrice
                const resalePrice = data.resalePrice
                const usedTime = data.usedTime
                const postedTime = data.postedTime
                const sellerName = data.sellerName
                const sellerEmail = data.sellerEmail
                const condition = data.condition


                const product = { name, category_id: categoryId, img, location, originalPrice, resalePrice, usedTime, postedTime, seller: sellerName, sellerEmail, isVerified: false, condition }

                fetch("http://localhost:5000/products", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(product)
                })
                    .then((res) => res.json())
                    .then(() => {
                        swal("Great!", "Product added successfully", "success");
                        navigate("/dashboard/myproducts")
                    })
                    .catch((err) => console.log(err))
            }
        })
    }
    return (
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="grid lg:grid-cols-2 gap-2">
                    <div>
                        <input placeholder='Product Name (Samsung 10)' className="p-2 w-full border" type="text" {...register("name")} />
                    </div>
                    <div>
                        <input className="p-2 w-full  border" type="file" {...register("image")} />
                    </div>
                    <div>
                        <input placeholder='Location' className="p-2 w-full border" type="text" {...register("location")} />
                    </div>
                    <div>
                        <input placeholder='Original Price' className="p-2 w-full border" type="text" {...register("originalPrice")} />
                    </div>
                    <div>
                        <input placeholder='Resale Price' className="p-2 w-full border" type="text" {...register("resalePrice")} />
                    </div>
                    <div>
                        <input placeholder='Used Time' className="p-2 w-full border" type="text" {...register("usedTime")} />
                    </div>
                    <div>
                        <input placeholder='Today Date (dd-mm-yyyy)' className="p-2 w-full border" type="text" {...register("postedTime")} />
                    </div>
                    <div>
                        <input defaultValue={user?.displayName} placeholder='Seller Name' className="p-2 w-full border" type="text" {...register("sellerName")} />
                    </div>
                    <div>
                        <input defaultValue={user?.email} placeholder='Seller Email' className="p-2 w-full border" type="text" {...register("sellerEmail")} readOnly />
                    </div>
                    <div>
                        <input placeholder='Condition {excelent or good or fair}' className="p-2 w-full border" type="text" {...register("condition")} />
                    </div>
                </div>
                <div className="w-full mx-auto mt-3 lg:mb-5 mb-20 block text-center">
                    <input className="bg-blue-800 w-full px-5 py-2 rounded text-white cursor-pointer" type="submit" value="Add Product" />
                </div>
            </form>
    );
};

export default AddProduct;