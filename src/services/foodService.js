import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL; // e.g. ${import.meta.env.VITE_API_URL}

export const getDashboardSummary = async (email) => {
  const { data } = await axios.get(
    `${API_BASE}/dashboard/summary?email=${email}`
  );
  return data;
};

export const getFoodActivity = async (email) => {
  const { data } = await axios.get(
    `${API_BASE}/dashboard/food-activity?email=${email}`
  );
  return data;
};

export const getRequestStatus = async (email) => {
  const { data } = await axios.get(
    `${API_BASE}/dashboard/request-status?email=${email}`
  );
  return data;
};

export const getRecentRequests = async (email) => {
  const { data } = await axios.get(
    `${API_BASE}/dashboard/recent-requests?email=${email}`
  );
  return data;
};
