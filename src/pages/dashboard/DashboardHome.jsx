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
import {
  getDashboardSummary,
  getFoodActivity,
  getRequestStatus,
  getRecentRequests,
} from "../../api/dashboardApi";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  const [summary, setSummary] = useState({});
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [
          summaryRes,
          foodActivityRes,
          requestStatusRes,
          recentReqRes,
        ] = await Promise.all([
          getDashboardSummary(user.email),
          getFoodActivity(user.email),
          getRequestStatus(user.email),
          getRecentRequests(user.email),
        ]);

        setSummary(summaryRes);

        // format line chart
        setLineData(
          foodActivityRes
            .filter((item) => item._id) // remove null dates
            .map((item) => ({
              name: item._id.slice(5), // MM-DD
              foods: item.foods,
            }))
        );


        // format pie chart
        setPieData(
          requestStatusRes.map((item) => ({
            name: item._id,
            value: item.value,
          }))
        );

        setRecentRequests(recentReqRes);
      } catch (error) {
        console.error("Dashboard load failed", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user]);

  if (loading) {
    return <p className="text-center py-20">Loading dashboard...</p>;
  }

  const stats = [
    {
      title: "Total Foods",
      value: summary.totalFoods || 0,
      icon: <HiInbox />,
      trend: "Overall",
    },
    {
      title: "Active Foods",
      value: summary.activeFoods || 0,
      icon: <HiClipboardCheck />,
      trend: "Available",
    },
    {
      title: "Requests",
      value: summary.totalRequests || 0,
      icon: <HiChartBar />,
      trend: "Received",
    },
  ];

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
