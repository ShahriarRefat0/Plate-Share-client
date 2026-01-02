import React, { useContext, useState } from "react";
import logo from "../../public/logo.png";
import { GoEye } from "react-icons/go";
import { FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../authProvider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginWithGoogle, loginWithPass, loginWithFacebook, loginWithGithub } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation()
  //console.log(user)

  const handleSocialLogin = async (provider) => {
    setError("");
    try {
      if (provider === 'google') await loginWithGoogle();
      else if (provider === 'facebook') await loginWithFacebook();
      else if (provider === 'github') await loginWithGithub();

      Swal.fire({ title: "Login Successful", icon: "success", draggable: true });
      navigate(`${location.state ? location.state : '/'}`);
    } catch (e) {
      console.error(e);
      setError(e.message || 'Social login failed');
      Swal.fire({ icon: "error", title: "Oops...", text: e.message || "Something went wrong!" });
    }
  };

  const handleLoginWithPass = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    try {
      await loginWithPass(email, password);
      Swal.fire({ title: "Login Successful", icon: "success", draggable: true });
      navigate(`${location.state ? location.state : "/"}`);
    } catch (e) {
      console.error(e);
      setError(e.message || 'Login failed');
      Swal.fire({ icon: "error", title: "Login Failed", text: e.message || "Something went wrong!" });
    }
  };

  const autofillDemo = (type) => {
    if (type === 'user') {
      setEmail('user@plateshare.com');
      setPassword('123#Aa');
    } else if (type === 'admin') {
      setEmail('admin@plateshare.local');
      setPassword('AdminDemo123');
    }
  };

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center">
      <div className="w-full max-w-md card bg-base-100 shadow-xl rounded-3xl p-10 text-center">

        {/* LOGO */}
        <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center">
          <img className="w-10 h-10" src={logo} alt="Logo" />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl title text-primary mt-4">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email Address"
            className="input input-bordered w-full rounded-full border-primary bg-base-200"
          />

          <div className="relative">
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {error && <p className="text-sm text-error">{error}</p>}

          <div className="text-sm title text-right">
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>

          <button className="btn btn-primary w-full rounded-full">
            Login
          </button>

          <div className="flex gap-2">
            <button type="button" onClick={() => autofillDemo('user')} className="btn btn-outline rounded-full flex-1">Demo User</button>
            {/* <button type="button" onClick={() => autofillDemo('admin')} className="btn btn-outline rounded-full flex-1">Demo Admin</button> */}
          </div>
        </form>

        {/* DIVIDER */}
        <div className="my-6 flex items-center gap-2 opacity-60">
          <div className="flex-1 h-px bg-base-content"></div>
          ✧
          <div className="flex-1 h-px bg-base-content"></div>
        </div>

        {/* SOCIAL LOGIN */}
       
          <button onClick={() => handleSocialLogin('google')} className="btn btn-outline  rounded-full border-primary flex items-center justify-center gap-2">Login with Google <FcGoogle /></button>
       

        {/* REGISTER */}
        <p className="mt-6 text-sm opacity-70">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold title hover:underline"
          >
            Register here
          </Link>
        </p>

      </div>
    </div>

  );
};

export default Login;
