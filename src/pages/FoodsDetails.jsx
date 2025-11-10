import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const FoodsDetails = () => {
  const { id } = useParams()
  const [foodDetails, setFoodDetails] = useState()
  // console.log(id)


  useEffect(() => {
    fetch(`http://localhost:3000/foods`)
      .then(res => res.json())
      .then(data => {
        const food = data.find((food) => food._id == id)
        setFoodDetails(food)
      });
  }, [])

// console.log(foodDetails);
  return (
    <div className="card bg-red-400">
      <div>
        <img src="" alt="" />
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default FoodsDetails;