import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";


 const Register = () => {
     const { createUser } = useContext(AuthContext)
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()


    const onSubmit = (data) => {
        handleRegister(data.email, data.password)
        console.log(data);
    }

    const handleRegister = (email, password) => {
        createUser(email, password)
        .then((result) => {
            const user = result.user;
            swal("Good", "Registered successfully", "success");
            navigate("/login")
            console.log(user);
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className="bg-black lg:py-10">
            <div className="lg:w-1/2 bg-gray-800 mx-auto text-center lg:px-20 py-10 rounded-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input className="p-2 w-2/3" {...register("name")} placeholder="Name" />
                    </div>
                    <div className="mb-3">
                        <input className="p-2 w-2/3" type="email" {...register("email")} />
                    </div>
                    <div className="mb-3">
                        <select className="p-2 w-2/3" {...register("role")}>
                            <option value="user">User</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>
                    <div>
                        <input className="p-2 w-2/3"  type="password" {...register("password")} />
                    </div>
                    <div className="w-2/3 mx-auto mt-3">
                        <input className="bg-blue-800 w-full px-5 py-2 rounded text-white cursor-pointer" type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register