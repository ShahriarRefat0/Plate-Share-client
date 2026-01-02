import React, { useContext, useState } from "react";
import { AuthContext } from "../../authProvider/AuthProvider";
import { FaUserAstronaut } from "react-icons/fa";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, updateUser, setUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUser(name, photoURL);
      setUser({ ...user, displayName: name, photoURL });

      Swal.fire({
        title: "Profile Updated",
        text: "Your information has been refreshed.",
        icon: "success",
        confirmButtonColor: "#22c55e",
      });
    } catch (err) {
      Swal.fire({
        title: "Update Failed",
        text: err.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 md:p-10">
      <h2 className="text-3xl font-bold mb-8 tracking-tight">
        Profile Settings
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* PROFILE IDENTITY CARD */}
        <div className="xl:col-span-1 relative rounded-2xl p-6 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 border border-base-300 shadow-md">
          <div className="absolute inset-0 backdrop-blur-xl rounded-2xl" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary blur-md opacity-40" />
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="relative w-24 h-24 rounded-full object-cover border-4 border-base-100"
                />
              ) : (
                <FaUserAstronaut className="relative text-7xl opacity-60" />
              )}
            </div>

            <h3 className="text-xl font-semibold">
              {user?.displayName || "Unnamed User"}
            </h3>
            <p className="text-sm opacity-70">{user?.email}</p>

            <div className="mt-4 px-4 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
              Active Account
            </div>

            <div className="mt-6 w-full text-sm space-y-2">
              <div className="flex justify-between">
                <span className="opacity-70">Provider</span>
                <span className="font-medium capitalize">
                  {user?.providerData?.[0]?.providerId || "password"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">User ID</span>
                <span className="font-mono text-xs">
                  {user?.uid?.slice(0, 8)}...
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* UPDATE FORM CARD */}
        <div className="xl:col-span-2 rounded-2xl p-6 bg-base-100/70 backdrop-blur-xl border border-base-300 shadow-md">
          <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="text-sm font-medium opacity-80">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full bg-base-200/70 focus:ring-2 focus:ring-primary rounded-xl"
              />
            </div>

            <div>
              <label className="text-sm font-medium opacity-80">
                Profile Photo URL
              </label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="input w-full bg-base-200/70 focus:ring-2 focus:ring-primary rounded-xl"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="
                  btn btn-primary w-full rounded-xl
                  shadow-lg shadow-primary/20
                  hover:scale-[1.01] transition
                "
              >
                {loading ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
