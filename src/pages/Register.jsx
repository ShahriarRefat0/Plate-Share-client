import React, { use, useState } from "react";
import logo from "../../public/logo.png";
import { GoEye } from "react-icons/go";
import { FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../authProvider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, setUser, updateUser } = use(AuthContext);
  const navigate = useNavigate();
const [passwordError, setPasswordError] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const displayName = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const photoURL = form.photoURL.value.trim();

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least one uppercase, one lowercase letter, and be at least 6 characters."
      );
      return;
    }
    setPasswordError("");

    try {
      // 1️⃣ Create user
      const result = await createUser(email, password);

      // 2️⃣ Update profile
      await updateUser(displayName, photoURL);

      // 3️⃣ Save user to context
      setUser(result.user);

      // 4️⃣ Success alert
      Swal.fire({
        title: `Welcome, ${displayName}!`,
        text: "Your account has been created successfully.",
        icon: "success",
        confirmButtonColor: "#009368",
        confirmButtonText: "Go to Dashboard",
      });

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error.code, error.message);

      let message = "Something went wrong. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address.";
      } else if (error.code === "auth/weak-password") {
        message = "Password is too weak.";
      }

      Swal.fire({
        title: "Registration Failed!",
        text: message,
        icon: "error",
        confirmButtonColor: "#d33",
      });
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
        <h1 className="text-2xl font-semibold title mt-4">
          Create Account
        </h1>
        <p className="opacity-70 mb-6">
          Join Plate Share & Serve Humanity
        </p>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-4 text-left">

          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full rounded-full border-primary bg-base-200"
          />

          <input
            name="photoURL"
            type="text"
            placeholder="Photo URL"
            className="input input-bordered w-full rounded-full border-primary bg-base-200"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="input input-bordered w-full rounded-full border-primary bg-base-200"
          />

          <div className="relative">
            <input
              name="password"
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

            {passwordError && (
              <p className="text-error text-sm font-medium mt-2">
                {passwordError}
              </p>
            )}
          </div>

          <button className="btn btn-primary w-full rounded-full">
            Register
          </button>
        </form>

        {/* DIVIDER */}
        <div className="my-6 flex items-center gap-2 opacity-60">
          <div className="flex-1 h-px bg-base-content"></div>
          ✧
          <div className="flex-1 h-px bg-base-content"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <button className="btn btn-outline w-full rounded-full border-primary">
          Login with Google <FcGoogle />
        </button>

        {/* LOGIN LINK */}
        <p className="mt-6 text-sm opacity-70">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold title hover:underline"
          >
            Login here
          </Link>
        </p>

      </div>
    </div>

  );
};

export default Register;
