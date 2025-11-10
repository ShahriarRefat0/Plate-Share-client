import React from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi2';

const AddFood = () => {
  return (
    <div className="my-15">
      <div className="text-center">
        <div className="text-primary text-xl flex gap-3 items-center justify-center mb-7">
          <span>
            <HiOutlineArrowLeft />
          </span>{" "}
          <p>Back To Home</p>
        </div>
        <h3 className="ext-3xl md:text-5xl font-bold text-center  mb-4 font-primary">
          Add <span className="text-primary">Food</span>
        </h3>
      </div>
      <div>
        <form>
          <div>
            <p>Donator Info:</p>
            di
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;