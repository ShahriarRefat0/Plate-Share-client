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
  const {  loginWithGoogle, loginWithPass } = use(AuthContext);
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
    loginWithPass(email, password)
      .then((res) => {
        //        console.log("login by pass", res);
        Swal.fire({
          title: "Login Successful",
          icon: "success",
          draggable: true,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center">
      <div className="w-full max-w-md card bg-base-100 shadow-xl rounded-3xl p-10 text-center">

        {/* LOGO */}
        <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center">
          <img className="w-10 h-10" src={logo} alt="Logo" />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-primary mt-4">
          Login
        </h1>
        <p className="opacity-70 mb-6">
          Welcome back to Plate Share
        </p>

        {/* FORM */}
        <form onSubmit={handleLoginWithPass} className="space-y-4 text-left">

          <input
            type="email"
            name="email"
            required
            placeholder="Email Address"
            className="input input-bordered w-full rounded-full border-primary bg-base-200"
          />

          <div className="relative">
            <input
              name="password"
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full rounded-full border-primary bg-base-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
            >
              {showPassword ? <FiEyeOff /> : <GoEye />}
            </button>
          </div>

          <div className="text-sm text-primary text-right">
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>

          <button className="btn btn-primary w-full rounded-full">
            Login
          </button>
        </form>

        {/* DIVIDER */}
        <div className="my-6 flex items-center gap-2 opacity-60">
          <div className="flex-1 h-px bg-base-content"></div>
          ✧
          <div className="flex-1 h-px bg-base-content"></div>
        </div>

        {/* SOCIAL LOGIN */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full rounded-full border-primary"
        >
          Login with Google <FcGoogle />
        </button>

        {/* REGISTER */}
        <p className="mt-6 text-sm opacity-70">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary hover:underline"
          >
            Register here
          </Link>
        </p>

      </div>
    </div>

  );
};

export default Login;
