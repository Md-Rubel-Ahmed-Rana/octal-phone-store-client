import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";


const Login = () => {
    const { loginUser, setUser, loginWithGoogle } = useContext(AuthContext)
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const handleToken = useToken()

    const onSubmit = (data) => {
        loginUser(data.email, data.password)
            .then((result) => {
                const user = result.user;
                setUser(user)

                // generate a secret token;
                handleToken(user.email)
                swal("Great!", "Logged in successfully", "success");
                navigate(from, { replace: true })
            })
            .catch((err) => console.log(err))
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
                    .then(() => {
                        handleToken(user.email)
                        swal("Great!", "Logged in successfully", "success")
                        navigate(from, { replace: true })
                    })
                    .catch((err) => console.log(err))

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
                <button onClick={handleLoginWithGoogle} className="text-white mt-4 cursor-pointer bg-gray-600 py-2 border rounded-xl w-2/3 mx-auto px-10">Login with Google</button>
            </div>
        </div>
    );
}

export default Login