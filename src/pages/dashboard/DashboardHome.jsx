import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  HiInbox,
  HiClipboardCheck,
  HiChartBar,
  HiTrendingUp,
} from "react-icons/hi";

import { AuthContext } from "../../authProvider/AuthProvider";
import LoadingSpinner from "../../Components/LoadingSpinner";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];
const API = import.meta.env.VITE_API_URL;

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [
          summaryRes,
          activityRes,
          statusRes,
          recentRes,
        ] = await Promise.all([
          fetch(`${API}/dashboard/summary?email=${user.email}`),
          fetch(`${API}/dashboard/food-activity?email=${user.email}`),
          fetch(`${API}/dashboard/request-status?email=${user.email}`),
          fetch(`${API}/dashboard/recent-requests?email=${user.email}`),
        ]);

        const summary = await summaryRes.json();
        const activity = await activityRes.json();
        const status = await statusRes.json();
        const recent = await recentRes.json();

        /* KPI CARDS */
        setStats([
          {
            title: "Total Foods",
            value: summary.totalFoods,
            icon: <HiInbox />,
            trend: "All time",
          },
          {
            title: "Active Foods",
            value: summary.activeFoods,
            icon: <HiClipboardCheck />,
            trend: "Available now",
          },
          {
            title: "Total Requests",
            value: summary.totalRequests,
            icon: <HiChartBar />,
            trend: "Received",
          },
        ]);

        /* LINE CHART */
        setLineData(
          activity.map((item) => ({
            name: item._id,
            foods: item.foods,
          }))
        );

        /* PIE CHART */
        setPieData(
          status.map((item) => ({
            name: item._id,
            value: item.value,
          }))
        );

        /* TABLE */
        setRecentRequests(recent);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user?.email]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-5 md:p-10 space-y-10">
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold">Dashboard Overview</h2>
        <p className="opacity-70">Your food sharing reports</p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="relative rounded-2xl bg-base-100 border p-5 shadow-sm"
          >
            <div className="absolute right-4 top-4 text-4xl opacity-10">
              {stat.icon}
            </div>
            <p className="text-sm opacity-70">{stat.title}</p>
            <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
            <div className="mt-3 flex items-center gap-2 text-sm text-success">
              <HiTrendingUp />
              <span>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LINE */}
        <div className="xl:col-span-2 rounded-2xl bg-base-100 border p-6">
          <h3 className="font-semibold mb-4">Food Added (Last 7 Days)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="foods"
                  stroke="#22c55e"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE */}
        <div className="rounded-2xl bg-base-100 border p-6">
          <h3 className="font-semibold mb-4">Request Status</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RECENT REQUESTS */}
      <div className="rounded-2xl bg-base-100 border p-6">
        <h3 className="font-semibold mb-4">Recent Food Requests</h3>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Food</th>
                <th>Requester</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((req) => (
                <tr key={req._id}>
                  <td>{req.req_foodName}</td>
                  <td>{req.req_name}</td>
                  <td>
                    <span
                      className={`badge ${req.req_status === "Accepted"
                          ? "badge-success"
                          : "badge-warning"
                        }`}
                    >
                      {req.req_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
