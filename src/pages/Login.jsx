import React, { use, useState } from "react";
import logo from "../../public/logo.png";
import { GoEye } from "react-icons/go";
import { FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../authProvider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user, loginWithGoogle, createUser } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation()
  //console.log(user)

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    console.log("google login");
    loginWithGoogle()
      .then((res) => {
        //console.log(res);
        Swal.fire({
          title: "Login Successful",
          icon: "success",
          draggable: true,
        });
        navigate(`${ location.state ? location.state : '/'}`);
      })
      .catch((e) => {
        //console.log(e.message);
         Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      } );
  };

  const handleLoginWithPass = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    //console.log(email, password);
    createUser(email, password)
      .then((res) => {
        //        console.log("login by pass", res);
        Swal.fire({
          title: "Login Successful",
          icon: "success",
          draggable: true,
        });
        navigate(`${location.state ? location.state : '/'}`);
      })
      .catch((e) => {
        // console.log(e);
         Swal.fire({
           icon: "error",
           title: "Oops...",
           text: "Something went wrong!",
         });
      });
  };

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-10 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-green-100 flex items-center justify-center">
          <img className="w-10 h-10" src={logo} alt="Logo" />
        </div>

        <h1 className="text-2xl font-semibold text-green-700 mt-4">LogIn</h1>
        <p className="text-green-500 mb-6">Welcome To Back Plate Share</p>

        <form onSubmit={handleLoginWithPass} className="space-y-4 text-left">
          <input
            type="email"
            name="email"
            required
            placeholder="Email Address"
            className="input w-full rounded-full border border-green-300 p-3 bg-green-50"
          />

          <div className="relative">
            <input
              name="password"
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input w-full rounded-full border border-green-300 p-3 bg-green-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 text-sm"
            >
              {showPassword ? <FiEyeOff /> : <GoEye />}
            </button>
          </div>

          <div className="text-sm text-green-700">
            <a href="#" className="hover:underline">
              Forget Password ?
            </a>
          </div>

          <button className="btn w-full rounded-full bg-green-500 text-white border-0 hover:bg-green-600">
            Login
          </button>
        </form>

        <div className="my-6 flex items-center gap-2 text-green-400">
          <div className="flex-1 h-px bg-green-200"></div>✧
          <div className="flex-1 h-px bg-green-200"></div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGoogleLogin}
            className="btn w-full rounded-full border border-green-300 bg-green-50 text-green-600"
          >
            Login with Google <FcGoogle />
          </button>
        </div>

        <p className="mt-6 text-green-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-green-700 hover:underline cursor-pointer"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
