import React, { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { AuthContext } from "../authProvider/AuthProvider";
import { IoLogOut, IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdFastfood, MdManageAccounts } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";

const DashboardLayout = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false); // profile dropdown
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile sidebar

  const handleLogout = async () => {
    try {
      await logOutUser();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard Home",
      icon: <MdDashboard />,
    },
    {
      to: "/dashboard/profile",
      label: "Profile",
      icon: <FaUserCircle />,
    },
    {
      to: "/dashboard/add-food",
      label: "Add Food",
      icon: <MdFastfood />,
    },
    {
      to: "/dashboard/manage-my-foods",
      label: "Manage My Foods",
      icon: <MdManageAccounts />,
    },
    {
      to: "/dashboard/my-food-requests",
      label: "My Food Requests",
      icon: <FaClipboardList />,
    },
  ];


  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* HEADER */}
      <header className="dash-nav sticky top-0 z-50">
        <div className="w-11/12 mx-auto flex items-center justify-between h-16">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden btn btn-ghost btn-sm"
            >
              <IoMenu className="text-2xl" />
            </button>

            <h2 className="text-xl font-bold">Dashboard</h2>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-base-200 transition"
            >
              <FaUserCircle className="text-2xl" />
              <span className="hidden sm:block font-medium">
                {user?.displayName || "Guest"}
              </span>
            </button>

            {/* PROFILE DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-base-100 shadow-lg border">
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-base-200 rounded-t-xl"
                >
                  Home
                </NavLink>

                <NavLink
                  to="/dashboard/profile"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-base-200"
                >
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-error hover:bg-error/10 rounded-b-xl"
                >
                  <IoLogOut /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-6">
        {/* SIDEBAR */}
        <aside
          className={`
            fixed lg:static top-0 left-0 z-50
            h-full w-64 lg:w-auto
            dash-side
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
            lg:col-span-1
            position sticky
          `}
        >
          <div className="p-4 font-semibold lg:hidden">
            Menu
          </div>

          <nav className="space-y-2 p-4 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/dashboard"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "hover:bg-base-200"
                  }`
                }
              >
                <span className="text-xl text-current">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="lg:col-span-5 lg:ml-0 ml-0">
          <div className="min-h-screen">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
