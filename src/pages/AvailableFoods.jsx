import React, { useEffect, useState } from "react";
import FoodCard from "../Components/FoodCard";
import LoadingSpinner from "../Components/LoadingSpinner";
import axios from "axios";

const AvailableFoods = () => {
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [totalFoods, SetTotalFoods] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const limit = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState(' ');
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");


  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/foods?limit=${limit}&skip=${currentPage * limit}&status=available&sort=${sort}&order=${order}&search=${debouncedSearch}`
        )
        setFoods(data.foods);
        SetTotalFoods(data.total);
        setTotalPage(Math.ceil(data.total / limit));
      } catch (error) {
        console.error("error to load", error)
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [currentPage, sort, order, debouncedSearch]);




  const handleSelect = (e) => {
    const value = e.target.value;

    if (!value) return;

    const [field, direction] = value.split("-");
    setSort(field);
    setOrder(direction);
    setCurrentPage(0);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(0); // Reset to first page when searching
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(0);
    }, 700); // 400ms debounce

    return () => clearTimeout(timer);
  }, [search]);

  if (loading) return <LoadingSpinner />;




  return (
    <div className="w-11/12 mx-auto my-10">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-primary font-semibold">
          Available <span className="title">Foods</span>
        </h1>
      </div>

      {/* Filters Section */}
      <div className="w-full flex flex-col gap-5 lg:flex-row items-start lg:items-end justify-between mt-10">
        {/* Food Count */}
        <h2 className="text-lg underline font-bold">
          ({totalFoods}) Foods Found
        </h2>

        {/* Search */}
        <form className="w-full sm:w-[350px]">
          <label className="input flex items-center gap-2 w-full input-custo focus-within:border-primary focus-within:ring-2 focus-within:ring-primary rounded-lg">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>

            <input
              type="search"
              value={search}
              onChange={handleSearch}
              className="grow outline-none bg-transparent"
              placeholder="Search Foods"
            />
          </label>
        </form>

        {/* Sort Dropdown */}
        <select
          onChange={handleSelect}
          className="select select-bordered  border-[#009368] w-full sm:w-auto"
        >
          <option value="">Sort by Date</option>
          <option value="expire_date-desc">Date : New → Old</option>
          <option value="expire_date-asc">Date : Old → New</option>
        </select>
      </div>

      {/* Foods Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
        {foods.length === 0 ? (
          <div className="col-span-full text-center py-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold opacity-60">
              No Food Found
            </h2>
            <button className="btn btn-primary">Show All Foods</button>
          </div>
        ) : (
          foods.map((food) => <FoodCard key={food._id} food={food} />)
        )}
      </div>

      <div className="flex justify-center flex-wrap gap-3 py-10">
        {/* Prev Button */}
        {currentPage > 0 && (
          <button
            className="btn"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
        )}

        {/* Page Numbers */}
        {[...Array(totalPage).keys()].map((i) => (
          <button
            key={i}
            className={`btn ${i === currentPage ? "btn-primary" : ""}`}
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </button>
        ))}

        {/* Next Button */}
        {currentPage < totalPage - 1 && (
          <button
            className="btn"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default AvailableFoods;
