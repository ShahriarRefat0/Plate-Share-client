import React from 'react';
import { ClipLoader } from "react-spinners";


const LoadingSpinner = () => {
  return (
    <div className='min-h-screen flex items-center justify-center min-w-screen mx-auto'>
      <ClipLoader color="#00df1b" size={50} />
    </div>
  );
};

export default LoadingSpinner;