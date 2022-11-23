import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../contexts/AuthProvider";


const Login = () => {
    const { loginUser, setUser } = useContext(AuthContext)
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()


    const onSubmit = (data) => {
        handleLogin(data.email, data.password)
        console.log(data);
    }

    const handleLogin = (email, password) => {
        loginUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user)
                swal("Great!", "Logged in successfully", "success");
                navigate("/")
                console.log(user);
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="bg-black lg:py-10">
            <div className="lg:w-1/2 bg-gray-800 mx-auto text-center lg:px-20 py-10 rounded-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input className="p-2 w-2/3" type="email" {...register("email")} />
                    </div>
                    <div>
                        <input className="p-2 w-2/3" type="password" {...register("password")} />
                    </div>
                    <div className="w-2/3 mx-auto mt-3">
                        <input className="bg-blue-800 w-full px-5 py-2 rounded text-white cursor-pointer" type="submit" value="Login" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login