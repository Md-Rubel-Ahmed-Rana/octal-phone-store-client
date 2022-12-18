import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";


const Register = () => {
    const { createUser, loginWithGoogle, setUser, updateUser } = useContext(AuthContext)
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const handleToken = useToken()


    const handleRegister = (data) => {
        createUser(data.email, data.password)
            .then(() => {
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    role: data.role
                }
                fetch("https://octal-phone-server.vercel.app/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(userInfo)
                })
                    .then((res) => res.json())
                    .then((result) => console.log(result))
                    .catch((err) => swal("Opps!", `${err.message}`, "error"))
                    setUser(userInfo);
                    handleToken(data.email)
                    navigate("/");
                    window.location.reload()

                // update user
                updateUser(data.name)
                    .then(() => { })
                    .catch((err) => swal("Oops", `${err}`, "error"))
                
                swal("Good", "Registered successfully", "success");
               
            })
            .catch((err) => swal("Oops", `${err.message}`, "error"))
    }

    const handleLoginWithGoogle = () => {
        loginWithGoogle()
            .then((result) => {
                const user = result.user;
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    role: "buyer"
                }
                fetch("https://octal-phone-server.vercel.app/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(userInfo)
                })
                    .then((res) => res.json())
                    .then((result) => console.log(result))
                    .catch((err) => swal("Opps!", `${err.message}`, "error"))
                swal("Great!", "Logged in successfully", "success");
            })
            .catch((err) => swal("Opps!", `${err.message}` , "error"))
    }

    return (
        <div className="bg-black lg:py-10">
            <div className="lg:w-1/2 bg-gray-800 mx-auto text-center lg:px-20 py-10 rounded-md">
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className="mb-3">
                        <input className="p-2 lg:w-2/3 w-full rounded" {...register("name", {required: true})} placeholder="Enter name" />
                    </div>
                    <div className="mb-3">
                        <input className="p-2 lg:w-2/3 w-full rounded" type="email" {...register("email", { required: true })} placeholder="Enter email" />
                    </div>
                    <div className="mb-3">
                        <select className="p-2 lg:w-2/3 w-full rounded" {...register("role", {required: true})}>
                            <option value="buyer">buyer</option>
                            <option value="seller">seller</option>
                        </select>
                    </div>
                    <div>
                        <input className="p-2 lg:w-2/3 w-full rounded" type="password" {...register("password", { required: true })} placeholder="Enter password" />
                    </div>
                    <div className="lg:w-2/3 w-full mx-auto mt-3">
                        <input className="bg-blue-800 w-full px-5 py-2 rounded text-white cursor-pointer" type="submit" value="Register" />
                    </div>
                </form>
                <button onClick={handleLoginWithGoogle} className="text-white mt-4 cursor-pointer bg-gray-600 py-2 border rounded-xl lg:w-2/3 w-full mx-auto px-10">Login with Google</button>
            </div>
        </div>
    );
}

export default Register