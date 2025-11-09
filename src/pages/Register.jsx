import React, { use, useState } from "react";
import logo from "../../public/logo.png";
import { GoEye } from "react-icons/go";
import { FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../authProvider/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, setUser, user, updateUser } = use(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;
    console.log(displayName, email, password, photoURL);

    //const newUser = {name, email, password, photoURL}

    createUser(email, password)
      .then((res) => {
        updateUser(displayName, photoURL)
        .then(() => {
          const user = res.user;
          setUser(user);
          toast.success("Register Successfully");
          navigate("/");
        })
          .catch(() => {
            toast.error("Oops! Something went wrong");
          });
      })
      .catch((e) => {
        console.log(e)
         toast.error("Oops! Something went wrong")
      });
  };

  return (
    <div>
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-10 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-green-100 flex items-center justify-center">
            <img className="w-10 h-10" src={logo} alt="Logo" />
          </div>

          <h1 className="text-2xl font-semibold text-green-700 mt-4">
            Create Account
          </h1>
          <p className="text-green-500 mb-6">
            Join Plate Share & Serve Humanity
          </p>

          <form onSubmit={handleRegister} className="space-y-4 text-left">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="input w-full rounded-full border border-green-300 p-3 bg-green-50"
            />

            <input
              name="photoURL"
              type="text"
              placeholder="Photo URL"
              className="input w-full rounded-full border border-green-300 p-3 bg-green-50"
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="input w-full rounded-full border border-green-300 p-3 bg-green-50"
            />

            <div className="relative">
              <input
                name="password"
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

            {/* <input
              type="password"
              placeholder="Confirm Password"
              className="input w-full rounded-full border border-green-300 p-3 bg-green-50"
            /> */}

            <button className="btn w-full rounded-full bg-green-500 text-white border-0 hover:bg-green-600">
              Register
            </button>
          </form>

          <div className="my-6 flex items-center gap-2 text-green-400">
            <div className="flex-1 h-px bg-green-200"></div>✧
            <div className="flex-1 h-px bg-green-200"></div>
          </div>

          <div className="flex gap-3">
            <button className="btn w-full rounded-full border border-green-300 bg-green-50 text-green-600">
              Login with Google <FcGoogle />
            </button>
          </div>

          <p className="mt-6 text-green-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-green-700 hover:underline cursor-pointer"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
